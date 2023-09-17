const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleDataSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    Ticker: {
        type: String,
        required: true
    },
    Summary: {
        type: String,
        required: true
    },
    Sentiment: {
        type: String,
        required: true
    },
    Sentiment_Score: {
        type: String,
        required: true
    },
    URL: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Article Data',articleDataSchema);

