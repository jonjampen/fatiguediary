<?php
//db.php with $servername, $username, $password (gitignore)
include("app/database/db.php");
include("app/database/connection.php");

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
    if ($page == "dashboard") {
        header("location: index.php?page=login");
    }
}
//only if logged in
else {
    if ($page == "register") {
        header("location: index.php?page=dashboard");
    }
    elseif ($page == "login") {
        header("location: index.php?page=dashboard");
    }
    if ($page == "dashboard") {
        include("dashboard.php");
    }
}