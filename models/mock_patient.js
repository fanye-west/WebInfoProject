value1 = {
    is_recorded: true,
    is_required: false,
    value: 0.001,
    comment: "Didnt run today",
    when: "1/1/2022"
}

value4 = {
    is_recorded: true,
    is_required: true,
    value: 10000,
    comment: "Didnt run today",
    when: "1/1/2022"
}

value2 = {
    is_recorded: true,
    is_required: false,
    value: 65,
    comment: "Didnt run today",
    when: "1/1/2022"
}

value3 = {
    is_recorded: false,
    is_required: false,
    value: 0,
    comment: "",
    when: "1/1/2022"
}

data = {
    glucose: value1,
    weight: value2,
    insulin: value3,
    exercise: value4,
    date: "1/1/2022"
}


module.exports = {
    first_name: "Joe",
    last_name: "Blogs",
    user_name: "Jblogs",
    password: "fekjfwqiowqjiowqjwqiowq",
    email: "Jblogs@gmail.com",
    dob: "01/01/1998",
    bio: "Just a simple made up user, trying their best",
    data: [data, data, data, data, data, data],
    messages: ["Keep up the good work!"],
    badge: "Gold",
    rank: "1",
    notes: ["noteSchema"],
    glucose_bounds: [0, 10],
    weight_bounds: [50, 60],
    insulin_bounds: [0.001, 0.004],
    exercise_bounds: [5000, 25000]

}