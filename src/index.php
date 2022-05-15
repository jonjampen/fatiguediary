<?php
$pages = ["login", "register", "users", "logout", "dashboard", "add-new", "entries"];

//db.php with $servername, $username, $password (gitignore)
include("app/database/db.php");
include("app/database/connection.php");

//Setting default page
if(!isset($_SESSION['id'])) {
    include("app/controllers/validation.php");
    include("app/controllers/users.php");
    $page = "login";
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



if ($page == "users") {
    include("app/controllers/validation.php");
    include("app/controllers/users.php");
}


//only if not logged in
if(!isset($_SESSION['id'])) {
    if ($page == "register") {
        include("register.php");
    }
    elseif ($page == "login") {
        include("login.php");
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
        include("dashboard.php");
    }
    if ($page == "logout") {
        include("app/controllers/users.php");
        include("app/controllers/logout.php");
    }
    if ($page == "add-new") {
        include("app/controllers/energy.php");
        include("addnew.php");
    }
    if ($page == "entries") {
        include("app/controllers/get-energy.php");
        include("app/controllers/display-activities.php");
        include("all-entries.php");
    }
}

if (!in_array($page, $pages)) {
    include("not-found.php");
}

function print_head($page_head) {
    $head = array(
        '<!DOCTYPE html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="UTF-8">',
        '<meta http-equiv="X-UA-Compatible" content="IE=edge">',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
        '<link rel="stylesheet" href="assets/fonts/materialicons.css">',
        '<link rel="stylesheet" href="assets/css/style.css">',
        '<link rel="icon" type="image/x-icon" href="assets/img/logo.png">'
    );

    foreach ($head as $head_line) {
        echo($head_line."\n");
    }
    foreach ($page_head as $head_line) {
        echo($head_line."\n");
    }
    echo('</head>'."\n");
    
}
function print_body($onload = "") {
    if ($onload != "") {
        $onload = ' onload="' . $onload . '"';
    }
    echo('<body'. $onload . '>' . "\n");
    include("app/includes/topNavbar.php");
    include("app/includes/bottomNavbar.php");
}