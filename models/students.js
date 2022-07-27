const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    email: String
}, 
{
    timestamps: true
})

module.exports = mongoose.model("Student", studentSchema);
