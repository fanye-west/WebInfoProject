const Patient = require('../models/patient');
const Value = require('../models/value');
const Data = require('../models/data');
require('../models')

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


mock_patient = {
    first_name: "Joe",
    last_name: "Blogs",
    user_name: "Jblogs",
    password: "fekjfwqiowqjiowqjwqiowq",
    email: "Jblogs@gmail.com",
    dob: "01/01/1998",
    bio: "Just a simple made up user, trying their best",
    data: [],
    messages: ["Keep up the good work!"],
    badge: "Gold",
    rank: "1",
    notes: [],
    glucose_bounds: [0, 10],
    weight_bounds: [50, 60],
    insulin_bounds: [0.001, 0.004],
    exercise_bounds: [5000, 25000],
    glucose_required: true,
    weight_required: false,
    insulin_required: true,
    exercise_required: false
}

// newPatient = new Patient(mock_patient)
// console.log(newPatient)
// newPatient.save()

var id = "62668042f2c4e1d37f21d7b2"
var i;
for (i = 0; i < 10; i++) {
    glucose = new Value({
        is_recorded: true,
        value: getRandomInt(10),
        comment: "my glucose comment: " + i,
    })
    weight = new Value({
        is_recorded: true,
        value: getRandomInt(10) + 60,
        comment: "my weight comment: " + i,
    })
    insulin = new Value({
        is_recorded: true,
        value: getRandomInt(3),
        comment: "my insulin comment: " + i,
    })
    exercise = new Value({
        is_recorded: true,
        value: getRandomInt(10000) + 5000,
        comment: "my exercise comment: " + i,
    })
    newdata = new Data({
            glucose: glucose,
            weight: weight,
            insulin: insulin,
            exercise: exercise
        })
        // console.log(data);
    let res = Patient.updateOne({ _id: id }, {
        $push: { data: newdata }
    }).exec();
}