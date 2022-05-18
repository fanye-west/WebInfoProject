function checkPatientDataEntry() {
    let valid_submission = false;
    //Check current state of the form - has at least one submission that was not pre-filled been filled in?
    let ids_to_check = ['blood_glucose_value', 'weight_value', 'insulin_dose_value', 'daily_steps_value']
    let i;
    let id;
    let n;
    let error_field = document.getElementById("patient_error_message")
    error_field.innerText = " "
    for (i = 0; i < ids_to_check.length; i++) {
        id = ids_to_check[i];
        //Check that the data is preset
        if (!document.getElementById(id).value.trim().length == 0 && !document.getElementById(id).readOnly) {
            //Check that the data is valid
            n = Number(document.getElementById(id).value);
            if (!isNaN(n)) {
                valid_submission = true
                error_field.innerText = " "
            } else {
                valid_submission = false
                error_field.innerText = "Please enter numbers only for data records";
                break
            }
        }
    }
    //Update visual appearance and functionality of the form
    let button = document.getElementById("patient_submit_data_button");
    if (valid_submission) {
        button.style.backgroundColor = "#0062A8";
        button.disabled = false;
    } else {
        button.style.backgroundColor = "#808080";
        button.disabled = true;
        if (error_field.innerText == "") {
            //Default message
            error_field.innerText = "No new data added"
        }

    }
}


function checkClinicianNoteEntry() {
    let valid_submission = false;
    //Check current state of the form    
    if (!document.getElementById('add_note').value.trim().length == 0) {
        valid_submission = true
    }
    //Update visual appearance and functionality of the form
    let button = document.getElementById("submit_new_note_button");
    if (valid_submission) {
        button.style.backgroundColor = "#0062A8";
        button.disabled = false;
    } else {
        button.style.backgroundColor = "#808080";
        button.disabled = true;
    }
}

function checkClinicianMessageEntry() {
    let valid_submission = false;
    //Check current state of the form    
    if (!document.getElementById('support_message').value.trim().length == 0) {
        valid_submission = true
    }
    //Update visual appearance and functionality of the form
    let button = document.getElementById("support_message_button");
    if (valid_submission) {
        button.style.backgroundColor = "#0062A8";
        button.disabled = false;
    } else {
        button.style.backgroundColor = "#808080";
        button.disabled = true;
    }
}

function checkClinicianNewPatientEntry() {
    let valid_submission = true;
    //Check current state of the form - has at least one submission that was not pre-filled been filled in?
    let ids_to_check = ['first_name', 'last_name', 'email', 'username', 'password', 'new_patient_bio']
    let i;
    let id;
    for (i = 0; i < ids_to_check.length; i++) {
        id = ids_to_check[i];
        //Check that the data is preset
        if (document.getElementById(id).value.trim().length == 0) {
            valid_submission = false
        }
    }
    //Check dob
    if (!document.getElementById("dob").value) {
        valid_submission = false
    }
    //Update visual appearance and functionality of the form
    let button = document.getElementById("new_patient_data_button");
    if (valid_submission) {
        button.style.backgroundColor = "#0062A8";
        button.disabled = false;
    } else {
        button.style.backgroundColor = "#808080";
        button.disabled = true;
    }
}