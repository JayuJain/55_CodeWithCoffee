const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const Signup = require('./models/signup.js')
// const Question = require('./models/questions.js')
const CreateTest = require('./models/createtest.js')
const Student = require('./models/students.js')
const Test = require('./models/tests.js')

const PORT = process.env.PORT || 4000;
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/', function (req, res) {
    res.render('login');
});

app.post('/', async function (req, res) {
    const { username, email, password, admin, student } = req.body;

    const newUser = new Signup({ username, email, password, admin, student })

    try {
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

    const newStudent = new Student({ username, email, })

    try {
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }

});

app.get('/student', function (req, res) {
    const search = async (query) => {
        const result = await Student.find()
        return result;
    }
    res.render("studentDash", { data: search })
})

app.get('/question', function (req, res) {
    res.render('test_questions')
})

app.get('/test', function (req, res) {
    const search = async (query) => {
        const result = await Student.find()
        console.log(result);
        return result;
    }
    // const search = [
    //     {
    //         "subject": "dkfsjflkjal",
    //         "module": "dfkljaklfh f ajf"
    //     },
    //     {
    //         "subject": "dkfsjflkjal",
    //         "module": "dfkljaklfh f ajf"
    //     },
    //     {
    //         "subject": "dkfsjflkjal",
    //         "module": "dfkljaklfh f ajf"
    //     },
    //     {
    //         "subject": "dkfsjflkjal",
    //         "module": "dfkljaklfh f ajf"
    //     }
    // ]
    res.render('testtracker', { data: search })
})
// app.get('/newTest', function (req, res) {
//     res.render('test_questions')
// })

app.get('/createtest', (req, res) => {
    res.render('createtest')
});

app.post('/createtest', async (req, res) => {
    const { question, option1, option2, option3, option4, correctopt } = req.body;
    console.log(req.body);
    try {
        const newQuestions = await CreateTest.create({ question, option1, option2, option3, option4, correctopt })
        res.status(201).json(newQuestions);
        console.log("Sent");
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
})
// app.post('/newTest', async function (req, res) {
//     const { subject, question, option1, option2, option3, option4, answer } = req.body;

//     const newQuestion = new Question({ subject, question, option1, option2, option3, option4, answer })

//     try {
//         await newQuestion.save();

//         res.status(201).json(newUser);
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
// })
app.get('/admin', async function (req, res) {
    const search = async (query) => {
        const result = await Student.find()
        return result;
    }
    // const search = [
    //     {
    //         "name": "Archit",
    //         "marks": 100
    //     },
    //     {
    //         "name": "Archit",
    //         "marks": 100
    //     },
    //     {
    //         "name": "Archit",
    //         "marks": 100
    //     },
    //     {
    //         "name": "Archit",
    //         "marks": 100
    //     }
    // ]
    res.render("adminDash", { data: search })
})


mongoose.connect(process.env.dbURI, { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(PORT, console.log(`Server running on  ${PORT}`));
    })
    .catch(err => console.log(err));

