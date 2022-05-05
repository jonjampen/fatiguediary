// default language
lang = en;
writeText();

// Language change
document.getElementById("en").addEventListener("click", changeLangEn);
document.getElementById("de").addEventListener("click", changeLangDe);
document.getElementById("en_mobile").addEventListener("click", changeLangEn);
document.getElementById("de_mobile").addEventListener("click", changeLangDe);


function changeLangEn() {
    lang = en;
    changeActive();
    writeText();
}
function changeLangDe() {
    lang = de;
    changeActive();
    writeText();
}
function changeActive() {
    document.getElementById("en").classList.toggle("active");
    document.getElementById("de").classList.toggle("active");
    document.getElementById("en_mobile").classList.toggle("active");
    document.getElementById("de_mobile").classList.toggle("active");
}

function writeText() {
    for (const key in lang){
        const value = lang[key];
        document.getElementById(key).innerHTML = value;
    };
}