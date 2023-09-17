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
const articleData = require('./routes/getArticleData.route');
const PORT = process.env.PORT || 3000

const app = express();

app.use(cors());
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


app.get('/', (req, res) => {
    res.send('Hello World!')
})


mongoose.connection.once('open', ()=> {
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=>{
        console.log(`Listening at ${PORT}`)
    })
})
