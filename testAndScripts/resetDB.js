const Patient = require('../models/patient');
const Clinician = require('../models/clinician');
const Value = require('../models/value');
const Data = require('../models/data');
const LeaderboardEntry = require('../models/leaderboardentry.js');
require('../models')

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

patient_IDs = [
    '6275ca17e6f40fa90c6882b4',
    '6275ca17e6f40fa90c68845a',
    '6275ca17e6f40fa90c688387',
    '6275ca17e6f40fa90c68852d',
    '6275ca17e6f40fa90c688600',
    '6275ca17e6f40fa90c6887a6',
    '6275ca17e6f40fa90c688879',
    '6275ca17e6f40fa90c68894c',
    '6275ca17e6f40fa90c688a1f',
    '6275ca17e6f40fa90c6886d3',
    '6275ca17e6f40fa90c688af2'
]

patient_first_names = ["Pat", "Matt", "Jess", "Anna", "Anh", "Aditya", "Dash", "Evie", "Fane", "Grant", "Tanay"]
patient_last_names = ["Holmes", "Brown", "Smith", "McPherson", "Nguyen", "Ajit", "Park", "Hadlow", "Ye", "Holtes", "Khandelwal"]


var p, i, id;
var date
var N = 15;
var data;

for (p = 0; p < patient_IDs.length; p++) {
    id = patient_IDs[p]
    data = []
    for (i = 0; i < N; i++) {
        date = new Date();
        date.setDate(date.getDate() - (N - i))
        glucose = new Value({
            is_recorded: true,
            value: getRandomInt(10),
            comment: patient_first_names[p] + "'s glucose comment #" + i,
            when: date,
        })
        weight = new Value({
            is_recorded: true,
            value: getRandomInt(10) + 60,
            comment: patient_first_names[p] + "'s weight comment #" + i,
            when: date,
        })
        insulin = new Value({
            is_recorded: true,
            value: getRandomInt(3),
            comment: patient_first_names[p] + "'s insulin comment #" + i,
            when: date,
        })
        exercise = new Value({
            is_recorded: true,
            value: getRandomInt(10000) + 5000,
            comment: patient_first_names[p] + "'s exercise comment #" + i,
            when: date,
        })
        newdata = new Data({
            glucose: glucose,
            weight: weight,
            insulin: insulin,
            exercise: exercise,
            num_required: 2,
            num_required_provided: 2,
            date: date,
        })
        data.push(newdata)
    }
    console.log(data)
    Patient.updateOne({ _id: id }, { data: data }).exec();
    LeaderboardEntry.updateOne({ patient_id: id }, {
        patient_id: id,
        engagement_rate: 100,
        username: patient_first_names[p][0] + patient_last_names[p],
    }, { upsert: true }).exec();
}

console.log("Patient data reset:", patient_IDs)


// var id = "626a6639ce600ec9408c8abe"
// var date
// var N = 15
// var data = []
// for (i = 0; i < N; i++) {
//     date = new Date();
//     date.setDate(date.getDate() - (N - i))
//     glucose = new Value({
//         is_recorded: true,
//         value: getRandomInt(10),
//         comment: "my glucose comment: " + i,
//         when: date,
//     })
//     weight = new Value({
//         is_recorded: true,
//         value: getRandomInt(10) + 60,
//         comment: "my weight comment: " + i,
//         when: date,
//     })
//     insulin = new Value({
//         is_recorded: true,
//         value: getRandomInt(3),
//         comment: "my insulin comment: " + i,
//         when: date,
//     })
//     exercise = new Value({
//         is_recorded: true,
//         value: getRandomInt(10000) + 5000,
//         comment: "my exercise comment: " + i,
//         when: date,
//     })
//     newdata = new Data({
//         glucose: glucose,
//         weight: weight,
//         insulin: insulin,
//         exercise: exercise,
//         date: date,
//     })
//     data.push(newdata)
// }

// console.log(data)
// Patient.updateOne({ _id: id }, { data: data }).exec();