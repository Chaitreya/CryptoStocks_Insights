from transformers import PegasusForConditionalGeneration

# # # Model name or path
model_name = "human-centered-summarization/financial-summarization-pegasus"

# Load the model
model = PegasusForConditionalGeneration.from_pretrained(model_name)

# Save the model to a local directory
model.save_pretrained("Model\Summarization Model")

# Do not need to run this
# from transformers import pipeline

# # Load the sentiment analysis pipeline with the model
# sentiment = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

# # Save the model to a local directory
# sentiment.save_pretrained("Model\Sentiment Model")

from transformers import pipeline

# Load the sentiment analysis pipeline with the model
sentiment = pipeline("sentiment-analysis", model="mrm8488/distilroberta-finetuned-financial-news-sentiment-analysis")

# Save the model to a local directory
sentiment.save_pretrained("Model\Financial Sentiment Model")
