colors = ["#F74649", "#E88E82", "#F3722C", "#F8A949", "#F9C446", "#A4BE6D", "#69A455"];
emojis = ["&#128564", "&#128560", "&#128552", "&#128528", "&#128512", "&#128522", "&#128514"];

//get value color
function calculateEmoji(value, icon) {
    emoji = emojis[Math.floor(value/3*2)];
    icon.innerHTML = emoji;
}

//get value icon
function calculateColor(value, text) {
    color = colors[Math.floor(value/3*2)];
    text.style.color = color;
}
function calculateBorderColor(value, border) {
    if (value) {
        colorPos = Math.floor(value/3*2);
        color = colors[colorPos];
        border.style.borderColor = color;
        console.log(value);
    }
}
