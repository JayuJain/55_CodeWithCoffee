const mongoose = require('mongoose');

const createTest = new mongoose.Schema({
    //  subject:String,
    question: String,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    correctopt: {
        type: String,
        required: true
    },
},
    { timestamp: true }
);

module.exports = mongoose.model("Questions", createTest);