const Patient = require('../models/patient');
const Clinician = require('../models/clinician');
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
    glucose_bounds: [0, 7.1],
    weight_bounds: [58, 65],
    insulin_bounds: [1, 3],
    exercise_bounds: [9000, 25000],
    glucose_required: true,
    weight_required: false,
    insulin_required: true,
    exercise_required: false
}

newPatient = new Patient(mock_patient)
console.log(newPatient._id)

// newPatient.save()
console.log("newPatient created")

mock_clinician = {
    first_name: "Jane",
    last_name: "Doe",
    user_name: "JDoe87",
    password: "gduwygdwuywdgqyuqdwgdwquywdgqyu",
    email: "JDoe@hotmail.com",
    dob: "7/2/1987",
    bio: "Just a simple made up doctor, trying their best",
    patients: ["6269533c9517b0335cd37f70"]
}

newClinician = new Clinician(mock_clinician)
    // newClinician.save()
console.log("newClinician created")




var id = "6269533c9517b0335cd37f70"
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

console.log("Data added created")