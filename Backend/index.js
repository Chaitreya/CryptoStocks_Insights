require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const register = require('./routes/register');
const PORT = process.env.PORT || 3000

const app = express();

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

connectDB();

app.use('/api/v1',register); 


app.get('/', (req, res) => {
    res.send('Hello World!')
})


mongoose.connection.once('open', ()=> {
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=>{
        console.log(`Listening at ${PORT}`)
    })
})
