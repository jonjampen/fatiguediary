<?php
include("../database/db.php");
include("../database/connection.php");

//Setting variables to values from the form
$name = $_GET['activity_name'];

//adding new activity to the db
$stmt = $conn->prepare("INSERT INTO activities (user_id, name) VALUES (?, ?)");
$stmt->bind_param("ss", $_SESSION['id'], $name);
$stmt->execute();