//get value color
function calculateEmoji(value, icon) {
    if (value <= 1) {
        icon.innerHTML = "&#128564";
    }
    else if (value > 1 && value <= 2.5) {
        icon.innerHTML = "&#128560";
    }
    else if (value > 2.5 && value <= 4) {
        icon.innerHTML = "&#128552";
    }
    else if (value > 4 && value <= 5) {
        icon.innerHTML = "&#128528";
    }
    else if (value > 5 && value <= 6.5) {
        icon.innerHTML = "&#128527";
    }
    else if (value > 6.5 && value <= 7.5) {
        icon.innerHTML = "&#128522";
    }
    else if (value > 7.5 && value <= 8.5) {
        icon.innerHTML = "&#128512";
    }
    else if (value > 8.5 && value <= 10) {
        icon.innerHTML = "&#128514";
    }
}




//get value icon
function calculateColor(value, text) {
    if (value >= 9) {
        text.style.color = '#74f230';
    }
    else if (value >= 8) {
        text.style.color = '#a8f230';
    }
    else if (value >= 7) {
        text.style.color = '#dbf230';
    }
    else if (value >= 6) {
        text.style.color = '#f2ec30';
    }
    else if (value >= 5) {
        text.style.color = '#f2d830';
    }
    else if (value >= 4) {
        text.style.color = '#f29b30';
    }
    else if (value >= 3) {
        text.style.color = '#f28130';
    }
    else if (value >= 2) {
        text.style.color = '#f25730';
    }
    else if (value >= 1) {
        text.style.color = '#f24730';
    }
    else if (value > 0) {
        text.style.color = '#f24730';
    }
    else if (value == 0) {
        text.style.color = '#f23030';
    }
}