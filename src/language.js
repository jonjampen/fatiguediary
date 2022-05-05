var en = {
    "nav-app": "App",
    "nav-contact": "Contact",
    "nav-about": "About",
    "nav-login": "Log In",
    "nav-signup": "Sign Up",

    "title": "An app that helps you to manage your fatigue",
    "title-desc": "If you are suffering from ME/CFS, long COVID, or another type of fatigue, this web-app will support you in your everyday life. It is developed by a fatigue sufferer.",
    "use-for-free": "Use for free",
    "feature1-title": "Energy Diary",
    "feature1-desc": "Enter your energylevel after every activity.",
    "feature2-title": "Analysis",
    "feature2-desc": "Get an analysis of your data and see how your day is going. Also get to know your body better by seeing which activities are helping to get energy and which make your fatigue worse.",
    "feature3-title": "Tips",
    "feature3-desc": "Read tips from a fatigue sufferer and learn how to manage life with fatigue. (Feature coming soon)",

    "section5-title": "Developed by a fatigue sufferer",
    "section5-desc": "I am suffering from fatigue myself and I want to show you what is helping me. You can find out more about me and my fatigue <a href='about.php'>here</a>.<br>This app is my matura-project.",
}

var de = {
    "nav-app": "App",
    "nav-contact": "Kontakt",
    "nav-about": "Über",
    "nav-login": "Anmelden",
    "nav-signup": "Registrieren",

    "title": "Eine App, die dir hilft, deine Fatigue zu managen",
    "title-desc": "Wenn du an ME/CFS, Long Covid oder einer anderen Art von Fatigue leidest, kann dich diese Web-App in deinem Alltag unterstützen. Die Web-App wurde von einem Fatigue-Patienten entwickelt.",
    "use-for-free": "Gratis benutzen",
    "feature1-title": "Energie Tagebuch",
    "feature1-desc": "Gib dein Energielevel nach jeder Aktivität ein.",
    "feature2-title": "Auswertung",
    "feature2-desc": "Erhalte eine Auswertung deiner eingetragenen Aktivitäten und sehe, wie dein Tag verläuft. Lerne zudem deinen Körper besser kennen, indem du siehst, welche Aktivitäten helfen, Energie zu sammeln, und welche deine Fatigue verschlechtern.",
    "feature3-title": "Tipps",
    "feature3-desc": "Lese Tipps von einem Fatigue-Patienten und lerne, wie du mit deiner Fatigue umgehen kannst. (Feature kommt bald)",

    "section5-title": "Entwickelt von einem Fatigue-Patienten",
    "section5-desc": "Aufgrund meiner Long COVID erkrankung leide ich selbst an Fatigue. Nun will ich dir zeigen, was mir hilft. Finde <a href='about.php'>hier</a> mehr über mich heraus. <br> Diese App ist meine Maturaarbeit.",
}
lang=en;
writeText();

//detect language
var en_btn = document.getElementById("en");
en_btn.addEventListener("click", changeLangEn);
var de_btn = document.getElementById("de");
de_btn.addEventListener("click", changeLangDe);
var en_btn_mobile = document.getElementById("en_mobile");
en_btn_mobile.addEventListener("click", changeLangEn);
var de_btn_mobile = document.getElementById("de_mobile");
de_btn_mobile.addEventListener("click", changeLangDe);


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