const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const Signup = require('./models/signup.js')

const PORT = process.env.PORT || 4000;
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))

app.get('/', function(req, res) {
    res.render('login');
});

app.post('/', async function(req, res) {
    const { username, email, password, admin, student } = req.body;
    console.log(req.body);

    try {
        res.status(201).json(await Signup.create({ username, email, password, admin, student }));
        console.log("Sent");
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

});

mongoose.connect(process.env.dbURI, { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(PORT, console.log(`Server running on  ${PORT}`));
    })
    .catch(err => console.log(err));
