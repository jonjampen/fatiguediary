<?php
//db.php with $servername, $username, $password (gitignore)
include("app/database/db.php");
include("app/database/connection.php");

$page = "register";


if(isset($_GET["page"])) {
    $page = $_GET["page"];
}



if ($page == "users") {
    include("app/controllers/validation.php");
    include("app/controllers/users.php");
}


//only if not logged in
//if(!isset($_SESSION['name'])) {
    if ($page == "register") {
        include("register.php");
    }
    elseif ($page == "login") {
        include("login.php");
    }
//}
//only if logged in
//else {
    if ($page == "dashboard") {
        include("dashboard.php");
    }
//}