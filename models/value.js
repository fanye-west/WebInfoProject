const mongoose = require('mongoose')

const valueSchema = new mongoose.Schema({
    is_recorded: Boolean,
    value: Number,
    comment: String,
    when: { type: Date, default: Date.now }
})

const Value = mongoose.model('Value', valueSchema)

module.exports = Value