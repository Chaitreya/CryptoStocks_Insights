from flask import Flask,request
from flask_ngrok import run_with_ngrok
import json
from transformers import PegasusTokenizer, PegasusForConditionalGeneration
from bs4 import BeautifulSoup
import requests
import re
from transformers import pipeline
import torch

app = Flask(__name__)
run_with_ngrok(app)

@app.route('/run',methods=['POST'])
def runcode():

    stocks = request.get_json();
    monitored_tickers = []
    for ticker in stocks.values():
        monitored_tickers.append(ticker)

    if torch.cuda.is_available():
        device = "cuda"
        print("GPU is available. Using GPU!")
    else:
        device = "cpu"
        print("GPU is not available. Using CPU!")

    # 2. Setup Model
    model_name = "human-centered-summarization/financial-summarization-pegasus"
    model_path = "Model"
    tokenizer = PegasusTokenizer.from_pretrained(model_name)
    model = PegasusForConditionalGeneration.from_pretrained(model_path).to(device)
    
    # 3. Setup Pipeline
    # monitored_tickers = ["SQ","COIN","HIVE","MARA","MSTR","NVDA","RIOT","AAPL","AMZN","TSLA"]

    # 4.1. Search for Stock News using Google and Yahoo Finance
    print('Searching for stock news for', monitored_tickers)
    def search_for_stock_news_links(ticker):
        search_url = 'https://www.google.com/search?q=yahoo+finance+{}&tbm=nws'.format(ticker)
        r = requests.get(search_url)
        soup = BeautifulSoup(r.text, 'html.parser')
        atags = soup.find_all('a')
        hrefs = [link['href'] for link in atags]
        return hrefs

    raw_urls = {ticker:search_for_stock_news_links(ticker) for ticker in monitored_tickers}

    # 4.2. Strip out unwanted URLs
    print('Cleaning URLs.')
    exclude_list = ['maps', 'policies', 'preferences', 'accounts', 'support']
    def strip_unwanted_urls(urls, exclude_list):
        val = []
        for url in urls:
            if 'https://' in url and not any(exc in url for exc in exclude_list):
                res = re.findall(r'(https?://\S+)', url)[0].split('&')[0]
                val.append(res)
        return list(set(val))

    cleaned_urls = {ticker:strip_unwanted_urls(raw_urls[ticker] , exclude_list) for ticker in monitored_tickers} 

    # 4.3. Search and Scrape Cleaned URLs
    print('Scraping news links.')
    def scrape_and_process(URLs):
        ARTICLES = []
        for url in URLs:
            r = requests.get(url)
            soup = BeautifulSoup(r.text, 'html.parser')
            results = soup.find_all('p')
            text = [res.text for res in results]
            words = ' '.join(text).split(' ')[:350]
            ARTICLE = ' '.join(words)
            ARTICLES.append(ARTICLE)
        return ARTICLES
    articles = {ticker:scrape_and_process(cleaned_urls[ticker]) for ticker in monitored_tickers} 


    # 4.4. Summarise all Articles
    print('Summarizing articles.')
    def summarize(articles):
        summaries = []
        for article in articles:
            input_ids = tokenizer.encode(article, return_tensors="pt" ,max_length=512, truncation=True).to(device)
            output = model.generate(input_ids, max_length=55, num_beams=5, early_stopping=True)
            summary = tokenizer.decode(output[0], skip_special_tokens=True)
            summaries.append(summary)
        return summaries

    summaries = {ticker:summarize(articles[ticker]) for ticker in monitored_tickers}

    # 5. Adding Sentiment Analysis
    print('Calculating sentiment.')
    sentiment = pipeline("sentiment-analysis",model="distilbert-base-uncased-finetuned-sst-2-english")
    scores = {ticker:sentiment(summaries[ticker]) for ticker in monitored_tickers}

    # # 6. Exporting Results
    print('Exporting results')

    def create_output_dict(summaries, scores, urls):
        output = {}
        count = 1  # Initialize the numeric key
        for ticker in monitored_tickers:
            for counter in range(len(summaries[ticker])):
                output_this = {
                    'Ticker': ticker,
                    'Summary': summaries[ticker][counter],
                    'Sentiment': scores[ticker][counter]['label'],
                    'Sentiment Score': scores[ticker][counter]['score'],
                    'URL': urls[ticker][counter]
                }
                output[count] = output_this  # Use numeric key
                count += 1  # Increment the numeric key
        return output

    final_output = create_output_dict(summaries, scores, cleaned_urls)

    # Convert the dictionary to a JSON-formatted string
    json_output = json.dumps(final_output, indent=4)  # indent for pretty formatting

    # Print or save the JSON data
    return json_output



if __name__ == '__main__':
    app.run()



