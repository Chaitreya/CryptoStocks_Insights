
# CryptoStocks Insights: Automated Stocks/Cryptocurrency Article Summarization and Sentiment Analysis Tool

In the rapidly evolving landscape of financial markets, the "CryptoStocks Insights" project emerges as a comprehensive solution, strategically combining cutting-edge technologies to offer a nuanced understanding of stocks and cryptocurrencies. Developed with the help of MERN (MongoDB, Express.js, React, Node.js) web application, integration of models for article summarization and sentiment analysis, deployment of a Flask API to seamlessly handle requests to these models, and the incorporation of web scraping for real-time data retrieval.

## Setup

### Backend
Change directory to Backend
```
cd Backend
```
Install dependencies
```
npm install
```
Create .env file and add following 
- DATABASE_URI 
- ACCESS_TOKEN_SECRET 
- REFRESH_TOKEN_SECRET

Steps to generate new access and refresh token secret in terminal ( use different secrets for them) 
```
node
require('crypto').randomBytes(64).toString('hex')
```
Example:
```
ACCESS_TOKEN_SECRET=8745379a2431c8a18d5957b34fe7d8a0b347ca1d358760cf27216e02b85edf0fc344551d5e590d709483c05c8ba82afe0b825f41d122f06c93ea24f6a6350c18
```
Run server
```
npm start
```

### FlaskApp
Change directory to FlaskApp
```
cd FlaskApp
```

Create a virtual environment
```
python -m venv myEnv
```
Activate environment in powershell
```
.\myEnv\Scripts\activate
```
Install dependencies
```
pip install -r requirements.txt
```
Save models
```
python ModelSave.py
```
Run app
```
python app.py
```

### Frontend
Change directory to Frontend
```
cd Frontend
```
Install dependencies
```
npm install
```
Run vite server
```
npm run dev
```
___
#### Home page

**![](https://lh7-us.googleusercontent.com/ZrueDCTTWg8AAdQG1RHTDhPD9pAacOJJkVhl8qNaTcw7Pupzl8E2gtHHfp61U50mTtKElAvz-Iy9hr9FISLCt_ykfRmApNPf2CFUsrTWdiIGyKzp4i6BGLkC5rIY1-xItS0gmE1w6UE6)**

#### About page
**![](https://lh7-us.googleusercontent.com/Ab9YDFaG4jG0N9NS37G2jd_PzDVBYqrDMMKdbbY3roXPwzaWj3KDDBxbRM22YNSmAvAG849-qIJ36M7ZVTj_8iBRzUkqjcDmHH0aXnG9ixxDaU_o9cNyBXBU10kVXtlvqtAzsqOpK5Mv)**

#### Register page
![registerPage](https://github.com/Chaitreya/CryptoStocks_Insights/assets/85600410/adf6b34b-3b9b-4b1f-b9bf-dda6bb346f16)

Supports form validation and does not let you reuse username or email id

#### Login page
**![](https://lh7-us.googleusercontent.com/BYiNI1aF4EdNEZU43ScpemR69PK3kAk4uYeWmgUp1Wcci19cNMircjFbcRbzUq87PV8-8IaRtcefZtW76ORgzsa3vO-o3f538dSRmVIqJzpodrJWtw7JIooFvKOGWdf4lj9R9Eynkohz)**

#### User page
![image](https://github.com/Chaitreya/CryptoStocks_Insights/assets/85600410/4ea6a754-28a1-4bf5-b5ae-678b1d1c0a63)

Terminal view
![terminalView](https://github.com/Chaitreya/CryptoStocks_Insights/assets/85600410/86557173-ade9-4be1-a7c1-00e0b96687f2)

Ouput
![finalOutput](https://github.com/Chaitreya/CryptoStocks_Insights/assets/85600410/858a8963-bc10-429d-8110-3c07bd42225c)

User history is stored in mongoDB and can be deleted
