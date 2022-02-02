<?php
//db.php with $servername, $username, $password (gitignore)
include("db.php");

//Creating a connection to the db
$conn = new mysqli($servername, $username, $password, $dbname);

//Checking if connection is successful
if($conn->connect_error) {
    echo("Connection to DB failed: " . $conn->connect_error);
    echo "Connected successfully.";
}

?>