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
    writeText();
}
function changeLangDe() {
    lang = de;
    writeText();
}

function writeText() {
    for (const key in lang){
        const value = lang[key];
        document.getElementById(key).innerHTML = value;
    };
}