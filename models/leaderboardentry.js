const mongoose = require('mongoose')

const leaderboardentrySchema = new mongoose.Schema({
    patient_id: String,
    engagement_rate: Number,
    username: String,
})

const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardentrySchema)

module.exports = LeaderboardEntry