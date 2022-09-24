colors = ["#F74649", "#F87048", "#F89A47", "#F9C446", "#C9B94B", "#99AF50", "#69A455"];
transparencies = ["rgba(247, 70, 73, 0.1)", "rgba(248, 112, 72, 0.1)", "rgba(248, 154, 71, 0.1)", "rgba(249, 196, 70, 0.1)", "rgba(201, 185, 75, 0.1)", "rgba(153, 175, 80, 0.1)", "rgba(105, 164, 85, 0.1)"];
emojis = ["&#128564", "&#128560", "&#128552", "&#128528", "&#128512", "&#128522", "&#128514"];

//get value icon
function calculateEmoji(value, icon) {
    emoji = emojis[Math.floor(value/3*2)];
    icon.innerHTML = emoji;
}

//get value color
function calculateColor(value, text) {
    color = colors[Math.floor(value/3*2)];
    text.style.color = color;
}


function calculateBorderColor(value, border) {
        color = colors[value];
        transparency = transparencies[value];
        
        border.style.borderColor = color;
        border.style.backgroundColor = transparency;
}
