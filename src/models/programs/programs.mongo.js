const mongoose = require('mongoose');

const programsSchema = new mongoose.Schema({
    programID: {
        type: Number,
    },
    name: {
        type: String,
        required: true
    },
    exercises: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('Program', programsSchema);