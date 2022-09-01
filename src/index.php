<?php
$pages = [
    //user
    "login", "register", "users", "reset-password", "logout", "onboarding", "onboarding01", "onboarding02", "onboarding03", "onboarding04",
    //app
    "dashboard", "add-new", "entries", "settings",
    //information
    "app",
    "contact",
    // controllers
    "mail", "ajax"
];

//db.php with $servername, $username, $password (gitignore)
include("app/database/db.php");
include("app/database/connection.php");

if (empty($_SESSION['settings']['language'])) {
    $_SESSION['settings']['language'] = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
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
    include("app.php");
}
if ($page == "contact") {
    include("contact_temp.php");
}
if ($page == "mail") {
    include("app/controllers/mail.php");
}

//only if not logged in
if(!isset($_SESSION['id'])) {
    if ($page == "register") {
        include("register.php");
    }
    elseif ($page == "login") {
        include("login.php");
    }
    elseif ($page == "reset-password") {
        include("reset-password.php");
    }
    if ($page == "dashboard" || $page == "profile" || $page == "entries" || $page == "add-new" || $page == "tricks" || $page == "logout") {
        header("location: index.php?page=login");
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
        include("dashboard.php");
    }
    if ($page == "logout") {
        include("app/controllers/users.php");
        include("app/controllers/logout.php");
    }
    if ($page == "add-new") {
        include("app/controllers/get-energy.php");
        include("app/controllers/display-activities.php");
        include("app/controllers/energy.php");
        include("addnew.php");
    }
    if ($page == "entries") {
        include("app/controllers/get-energy.php");
        include("app/controllers/display-activities.php");
        include("all-entries.php");
    }
    if ($page == "settings") {
        include("app/controllers/set-settings.php");
        include("settings.php");
    }
    if ($page == "ajax") {
        $chart = $_GET['chart'];
        include("app/controllers/get-energy.php");
        include("app/controllers/display-activities.php");
        include("app/controllers/calculate-charts.php");
        include("chart" . $chart . ".php");
    }
    if ($page == "onboarding") {
        include("onboarding/language.php");
    }
    if ($page == "onboarding01") {
        include("onboarding/theme.php");
    }
    if ($page == "onboarding02") {
        include("onboarding/awake-time.php");
    }
    if ($page == "onboarding03") {
        include("onboarding/newsletter.php");
    }
    if ($page == "onboarding04") {
        include("onboarding/tutorial.php");
    }
    if ($page == "set-settings") {
        include("app/controllers/set-settings.php");
    }
}

if (!in_array($page, $pages)) {
    include("not-found.php");
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

        '<meta name="description" content="A web app that supports you with your chronic fatigue (ME/CFS, long COVID, ...).">',
        '<meta name="keywords" content="fatigue, Chronic Fatigue Syndrome, chronic fatigue, me/cfs, CFS, ME, long COVID, post covid, post covid-19, covid long hauler, pacing, activity tracking, energy management, diary, log">',
        '<meta name="author" content="Jon Jampen">',

        '<link rel="stylesheet" href="assets/fonts/materialicons.css">',
        '<link rel="stylesheet" href="assets/css/general.php">',
        '<link rel="icon" type="image/x-icon" href="assets/img/logo.svg">',
        '<link rel="stylesheet" type="text/css" href="assets/css/toastify.min.css">'
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
    include("app/includes/topNavbar.php");
    include("app/includes/bottomNavbar.php");
}
function print_public_body() {
    echo('<body>' . "\n");
    include("app/includes/publicNavbar.php");
}
function print_body_top_nav_only() {
    global $text;
    echo('<body>' . "\n");
    include("app/includes/topNavbar.php");
}

function includeToastify() {
    echo('<script type="text/javascript" src="assets/js/toastify.js"></script>');
    include("app/includes/messages.php");
}

function updateLanguage() {
    global $text;
    include("assets/languages/" . $_SESSION['settings']['language'] . ".php");
}