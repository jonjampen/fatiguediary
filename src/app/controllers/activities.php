<?php

//If add button pressed
if (isset($_POST['add-activity'])) {

    //Setting variables to values from the form
    $name = $_POST['activity'];
    
    //adding new activity to the db
    $stmt = $conn->prepare("INSERT INTO activities (user_id, name) VALUES (?, ?)");
    $stmt->bind_param("ss", $_SESSION['id'], $name);
    $stmt->execute();

    header("location: index.php");
}