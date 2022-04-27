//Functions for site navigation 

function hamburgerExpander() {
    console.log("EXPANDING");
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

function patientLoginRedirect() {
    window.location.href = '/user/patient/loginRedirect';
}