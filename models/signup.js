const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    admin: {
        type: Boolean,
        default: false
    },
    student: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Signup", signupSchema);
