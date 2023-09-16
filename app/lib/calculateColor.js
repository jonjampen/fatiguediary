let colors = ["#A60003", "#F74849", "#F86548", "#F88247", "#F9A147", "#F8BE46", "#DDBE49", "#BCB74D", "#9AAF50", "#77A753", "#69A455"];


export function calculateColor(value) {
    let color = "transparent";

    if (!value) return;

    color = colors[Math.floor(value)];

    return color;
}