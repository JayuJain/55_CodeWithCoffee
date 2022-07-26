// const bodyParser = require('body-parser');
// const express = require('express');


// const mongoose = require('mongoose');
// // mongoose.connect('mongodb://localhost:27017/fruitsDB', { useNewUrlParser: true });

// const mongoAtlasUri =
//     "mongodb+srv://Test1:Test1@cluster0.ua0e3.mongodb.net/?retryWrites=true&w=majority";

// try {
//     // Connect to the MongoDB cluster
//     mongoose.connect(
//         mongoAtlasUri,
//         { useNewUrlParser: true, useUnifiedTopology: true },
//         () => console.log(" Mongoose is connected"),
//     );
// } catch (e) {
//     console.log("could not connect");
// }

// const dbConnection = mongoose.connection;
// dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
// dbConnection.once("open", () => console.log("Connected to DB!"));

const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs")

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
