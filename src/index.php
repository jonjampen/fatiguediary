<?php
$pages = [
    //user
    "login", "register", "users", "reset-password", "logout", "onboarding", "onboarding01", "onboarding02", "onboarding03", "onboarding04",
    //app
    "dashboard", "add-new", "entries", "settings",
    //information
    "app",
    "contact",
    "how",
    "install",
    // controllers
    "mail", "ajax", "exportData"
];

//db.php with $servername, $username, $password (gitignore)
include("app/database/db.php");
include("app/database/connection.php");

if (empty($_SESSION['settings']['language'])) {    
    if (empty($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
        $browserLang = "en";
    }
    else {
        $browserLang = $_SERVER['HTTP_ACCEPT_LANGUAGE'];
    }
    
    $_SESSION['settings']['language'] = substr($browserLang, 0, 2);
}
updateLanguage();

//Setting default page
$page = "app";

if(!isset($_SESSION['id']) && !isset($_POST['login']) && !isset($_POST['register']) && !isset($_POST['reset-password'])) {
    include("app/controllers/users.php");
    if (checkCookie()) {
        $page = "dashboard";
    }
}
else {
    $page = "dashboard";
}

//Getting page from url
if(isset($_GET["page"])) {
    $page = $_GET["page"];
}


//Display Content

if ($page == "users") {
    include("app/controllers/validation.php");
    include("app/controllers/users.php");
}

if ($page == "app") {
    include("views/app.php");
}
if ($page == "contact") {
    include("views/contact_temp.php");
}
if ($page == "mail") {
    include("app/controllers/mail.php");
}

//only if not logged in
if(!isset($_SESSION['id'])) {
    if ($page == "register") {
        include("views/register.php");
    }
    elseif ($page == "login") {
        include("views/login.php");
    }
    elseif ($page == "reset-password") {
        include("views/reset-password.php");
    }
    if ($page == "dashboard" || $page == "profile" || $page == "entries" || $page == "add-new" || $page == "tricks" || $page == "logout") {
        header("location: index.php?page=login");
    }
    if ($page == "how") {
        include("views/how-it-works.php");
    }
    if ($page == "install") {
        include("views/install.php");
    }
}
//only if logged in
else {
    if ($page == "register" || $page == "login") {
        header("location: index.php?page=dashboard");
    }
    if ($page == "dashboard") {
        include("app/controllers/get-energy.php");
        include("app/controllers/calculate-activities.php");
        include("views/dashboard.php");
    }
    if ($page == "logout") {
        include("app/controllers/users.php");
        include("app/controllers/logout.php");
    }
    if ($page == "add-new") {
        include("app/controllers/get-energy.php");
        include("app/controllers/display-activities.php");
        include("app/controllers/energy.php");
        include("views/addnew.php");
    }
    if ($page == "entries") {
        include("app/controllers/get-energy.php");
        include("app/controllers/display-activities.php");
        include("app/controllers/daily-avg.php");
        include("views/all-entries.php");
    }
    if ($page == "settings") {
        include("app/controllers/set-settings.php");
        include("views/settings.php");
    }
    if ($page == "how") {
        include("views/how-it-works.php");
    }
    if ($page == "install") {
        include("views/install.php");
    }
    if ($page == "ajax") {
        $chart = $_GET['chart'];
        include("app/controllers/get-energy.php");
        include("app/controllers/display-activities.php");
        include("app/controllers/daily-avg.php");
        include("app/controllers/calculate-charts.php");
        include("views/charts/chart" . $chart . ".php");
    }
    if ($page == "onboarding") {
        include("views/onboarding/language.php");
    }
    if ($page == "onboarding01") {
        include("views/onboarding/theme.php");
    }
    if ($page == "onboarding02") {
        include("views/onboarding/awake-time.php");
    }
    if ($page == "onboarding03") {
        include("views/onboarding/newsletter.php");
    }
    if ($page == "onboarding04") {
        include("views/onboarding/tutorial.php");
    }
    if ($page == "set-settings") {
        include("app/controllers/set-settings.php");
    }
    if ($page == "exportData") {
        include("app/controllers/get-energy.php");
        include("app/controllers/display-activities.php");
        include("app/controllers/daily-avg.php");
        include("app/controllers/exportData.php");
    }
}

if (!in_array($page, $pages)) {
    include("views/not-found.php");
}

function print_head($page_head, $public) {
    $head = array(
        '<!DOCTYPE html>',
        '<html lang="' . $_SESSION['settings']['language'] . '">',
        '<head>',
        '<meta charset="UTF-8">',
        '<meta http-equiv="X-UA-Compatible" content="IE=edge">',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
        '<meta property="og:image" content="assets/img/logo.svg" />',

        '<meta name="description" content="A web app that supports you with your chronic fatigue (ME/CFS, long COVID, ...) by tracking your energy level after each activity.">',
        '<meta name="keywords" content="fatigue, Chronic Fatigue Syndrome, chronic fatigue, me/cfs, CFS, ME, long COVID, post covid, post covid-19, covid long hauler, pacing, activity tracking, energy management, app, diary, log, energy, level, energy level">',
        '<meta name="author" content="Jon Jampen">',
        '<link rel="canonical" href="https://www.fatiguediary.ch' . $_SERVER['REQUEST_URI'] . '">', // main page

        '<link rel="stylesheet" href="assets/fonts/materialicons.css">',
        '<link rel="stylesheet" href="assets/css/general.php">',
        '<link rel="icon" type="image/x-icon" href="assets/img/logo.svg">',
        '<link rel="stylesheet" type="text/css" href="assets/css/toastify.min.css">',

        '<link rel="manifest" href="manifest.json">',
        '<script src="assets/js/app.js"></script>'
    );
    if (isset($_SERVER['SERVER_NAME']) && $_SERVER['SERVER_NAME'] == 'dev.fatiguediary.ch') {
        $head[] = '<meta name="robots" content="noindex,nofollow">';
    }

    foreach ($head as $head_line) {
        echo($head_line."\n");
    }
    foreach ($page_head as $head_line) {
        echo($head_line."\n");
    }
    if ($public) {
        echo('<link rel="stylesheet" href="assets/css/public.css">' . "\n");
    } else {
        echo('<link rel="stylesheet" href="assets/css/app.css">' . "\n");
    }
    echo('</head>'."\n");
    
}
function print_body($onload = "") {
    global $text;
    if ($onload != "") {
        $onload = ' onload="' . $onload . '"';
    }
    echo('<body'. $onload . '>' . "\n");
    include("views/includes/topNavbar.php");
    include("views/includes/bottomNavbar.php");
}
function print_public_body() {
    global $text;
    echo('<body>' . "\n");
    updateLanguage();
    include("views/includes/publicNavbar.php");
}
function print_body_top_nav_only() {
    global $text;
    echo('<body>' . "\n");
    include("views/includes/topNavbar.php");
}

function includeToastify() {
    echo('<script type="text/javascript" src="assets/js/toastify.js"></script>');
    include("views/includes/messages.php");
}

function updateLanguage() {
    global $text;
    include("assets/languages/" . $_SESSION['settings']['language'] . ".php");
}