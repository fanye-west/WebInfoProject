const mongoose = require('mongoose')
const valueSchema = require('value')

const dataSchema = new mongoose.Schema({
    glucose: valueSchema,
    weight: valueSchema,
    insulin: valueSchema,
    exercise: valueSchema,
    date: { type: Date, default: Date.now }
})

const Data = mongoose.model('Data', dataSchema)

module.exports = Data