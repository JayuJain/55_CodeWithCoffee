const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    admin: Boolean,
    student: Boolean
})

module.exports = mongoose.model("Signup", signupSchema);
