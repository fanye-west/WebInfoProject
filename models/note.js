const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    text: String,
    date: { type: Date, default: Date.now }
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note