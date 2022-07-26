const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = process.env.PORT || 4000;
// Add your own mongoose connection string in .env file
mongoose.connect(process.env.dbURI, { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(PORT, console.log(`Server running on  ${PORT}`));
    })
    .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));

// app.use('/', (req, res) => {
//     res.send("Connection successfull")
// });

// //404
// app.use((req, res) => {
//     res.send('<h1>Cannot Find Page</h1>');
// })

app.get("/", (req, res) => {
    res.render("login")
})


app.listen(3000, function () {
    console.log("Server started on port 3000");
});
