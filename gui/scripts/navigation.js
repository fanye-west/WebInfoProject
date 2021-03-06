//Functions for site navigation 

function hamburgerExpander() {
    document.getElementById("navigation_hamburger_clicked_modal").style.display = "inline";
}

function hamburgerHider() {
    document.getElementById("navigation_hamburger_clicked_modal").style.display = "none";
}

function patientRedirectHomeNoAction() {
    window.location.href = '/user/patient';
}

function patientRedirectToRecord() {
    window.location.href = '/user/patient/record';
}

function patientChangePasswordRedirect() {
    window.location.href = '/user/patient/password';
}

function patientLoginRedirect() {
    window.location.href = '/user/patient/loginRedirect';
}

function clinicianLoginRedirect() {
    window.location.href = '/user/clinician/loginRedirect';
}

function patientLogoutRedirect() {
    window.location.href = '/user/patient/logoutRedirect';
}

function clinicianLogoutRedirect() {
    window.location.href = '/user/clinician/logoutRedirect';
}

function clinicianRedirectHome() {
    window.location.href = '/user/clinician';
}

function clinicianPatientDashRedirect(patientID) {
    window.location.href = '/user/clinician/patientdetails?id=' + patientID;
}

function clinicianChangePasswordRedirect() {
    window.location.href = '/user/clinician/password';
}

function toggleClincianCommentsView(name) {
    let searchquery = ""
    if (!name == "") {
        if (name.split(' ').length > 1) {
            name = name.split(' ')[0] + "+" + name.split(' ')[1]
        }
        searchquery = "?name=" + name
    }
    if (window.location.pathname == '/user/clinician') {
        window.location.href = '/user/clinician/comments' + searchquery;
    } else {
        window.location.href = '/user/clinician' + searchquery;
    }
}

function clearClinicianDashSearch() {
    if (window.location.pathname == '/user/clinician') {
        window.location.href = '/user/clinician/comments' + searchquery;
    } else {
        window.location.href = '/user/clinician' + searchquery;
    }
}

function hideLeaderboardModal() {
    let modal = document.getElementById("patient_leaderboard_modal");
    modal.style.display = "none";
}

function showLeaderboardModal() {
    document.getElementById("navigation_hamburger_clicked_modal").style.display = "none";
    //Toggle state of leaderboard modal
    let modal = document.getElementById("patient_leaderboard_modal");
    if (modal.style.display == "inline") {
        modal.style.display = "none"
    } else {
        modal.style.display = "inline"
    }
}