<?php
include("app/database/connection.php");
$page = "register";


if(isset($_GET["page"])) {
    $page = $_GET["page"];
}



if ($page == "users") {
    include("app/controllers/validation.php");
    include("app/controllers/users.php");
}
elseif ($page == "register") {
    include("register.php");
}
elseif ($page == "dashboard") {
    include("dashboard.php");
}