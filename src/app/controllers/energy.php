<?php

//If add button pressed
if (isset($_POST['add-energy'])) {

    //Setting variables to values from the form
    $date = $_POST['date'];
    $time = $_POST['time'];
    $datetime = strtotime($date . " " . $time);
    $datetime2 = date("Y-m-d H:i", $datetime);
    $energylevel = $_POST['energylevel'];
    $notes = $_POST['notes'];

    unset($_SESSION['errors']);
    
    //Preparing the statement
    $stmt = $conn->prepare("INSERT INTO energy (user_id, energylevel, notes, datetime) VALUES (?, ?, ?, ?)");

    //Binding the parameters to the statement
    $stmt->bind_param("ssss", $_SESSION['id'], $energylevel, $notes, $datetime2);

    //Executing the statement
    $stmt->execute();
    header("location: index.php?page=dashboard");
}