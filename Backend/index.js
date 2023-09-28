require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const register = require('./routes/register.route');
const login = require('./routes/login.route');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser')
const refreshToken = require('./routes/refreshToken.route');
const logout = require('./routes/logout.route');
const articleData = require('./routes/handleArticleData.route');
const getAllArticleData = require('./routes/getAllArticleData.route');
const PORT = process.env.PORT || 3000

const app = express();

const corsOptions = {
    origin: 'http://localhost:3002', // Replace with your frontend origin
    credentials: true, // Enable credentials,
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token']
  };

app.use(cors(corsOptions));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/api/v1',register); 
app.use('/api/v1',login); 
app.use('/api/v1',refreshToken);
app.use('/api/v1',logout);

app.use(verifyJWT);
app.use('/api/v1',articleData);
app.use('/api/v1',getAllArticleData);

mongoose.connection.once('open', ()=> {
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=>{
        console.log(`Listening at ${PORT}`)
    })
})
