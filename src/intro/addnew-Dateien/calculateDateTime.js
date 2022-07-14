let dateUpdate = true;
let timeUpdate = true;

function stopUpdatingDate() {
    dateUpdate = false;
}
function stopUpdatingTime() {
    timeUpdate = false;
}
function calculateDateTime() {
    //calculate todays date and time
    var today = new Date();
    //consider timezone offset
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    var date = today.toISOString().substring(0,10);
    var time = today.toISOString().substring(11,16);
    //set values in input
    if (dateUpdate == true) {
        document.getElementById("currentDate").value = date;
    }
    if (timeUpdate == true) {
        document.getElementById("currentTime").value = time;
    }
}