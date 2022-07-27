const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    subject: String,
    module: String,
});

module.exports = mongoose.model("Test", testSchema);