const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const Signup = require('./models/signup.js')
const CreateTest = require('./models/createtest.js')

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
       const newUser= await Signup.create({ username, email, password, admin, student })
        res.status(201).json(newUser);
        console.log("Sent");
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

});
1
app.get('/createtest',(req,res)=>{
    res.render('createtest')
});
app.patch('/createtest', async (req,res)=>{
    const {question,option1,option2,option3,option4,correctopt}=req.body;
    console.log(req.body);
    try {
       const newQuestions = await CreateTest.create({ question, option1, option2, option3, option4,correctopt })
        res.status(201).json(newQuestions);
        console.log("Sent");
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

})

mongoose.connect(process.env.dbURI, { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(PORT, console.log(`Server running on  ${PORT}`));
    })
    .catch(err => console.log(err));
