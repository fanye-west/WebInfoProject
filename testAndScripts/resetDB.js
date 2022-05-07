const Patient = require('../models/patient');
const Clinician = require('../models/clinician');
const Value = require('../models/value');
const Data = require('../models/data');
require('../models')

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

patient_IDs = [
    '6275c7fd96e6b2e4e97a27ae',
    '6275c7fd96e6b2e4e97a2881',
    '6275c7fd96e6b2e4e97a2954',
    '6275c7fd96e6b2e4e97a2a27',
    '6275c7fd96e6b2e4e97a2afa',
    '6275c7fe96e6b2e4e97a2bcd',
    '6275c7fe96e6b2e4e97a2ca0',
    '6275c7fe96e6b2e4e97a2d73',
    '6275c7fe96e6b2e4e97a2e46',
    '6275c7fe96e6b2e4e97a2f19',
    '6275c7fe96e6b2e4e97a2fec'
]

patient_first_names = ["Pat", "Matt", "Jess", "Anna", "Anh", "Aditya", "Dash", "Evie", "Fane", "Grant", "Tanay"]


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
            date: date,
        })
        data.push(newdata)
    }
    Patient.updateOne({ _id: id }, { data: data }).exec();
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