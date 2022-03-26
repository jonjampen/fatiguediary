<head>
<link rel="stylesheet" href="assets/fonts/materialicons.css">
    <link rel="stylesheet" href="assets/css/style.css">
</head>

<?php
//db.php with $servername, $username, $password (gitignore)
include("app/database/db.php");
include("app/database/connection.php");

include("app/includes/topNavbar.php");
include("app/includes/bottomNavbar.php");

//Setting default page
if(isset($_SESSION['id'])) {
    $page = "register";
}
else {
    $page = "dashboard";
}

//Getting page from url
if(isset($_GET["page"])) {
    $page = $_GET["page"];
}



if ($page == "users") {
    include("app/controllers/functions.php");
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
        include("dashboard.php");
    }
    if ($page == "logout") {
        include("app/controllers/users.php");
        include("app/controllers/logout.php");
    }
    if ($page == "add-new") {
        include("addnew.php");
        include("app/controllers/energy.php");
    }
}