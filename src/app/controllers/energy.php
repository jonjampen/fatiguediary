<?php

//If add button pressed
if (isset($_POST['add-energy'])) {

    //Setting variables to values from the form
    $date = $_POST['date'];
    $time = $_POST['time'];
    $datetime = strtotime($date . " " . $time);
    $datetime2 = date("Y-m-d H:i", $datetime);
    $energylevel = $_POST['energylevel'];
    $activities = explode(",", $_POST['activities']); //string to array
    $notes = $_POST['notes'];

    unset($_SESSION['errors']);
    

    //Adding energylevel
    $stmt_add_energy = $conn->prepare("INSERT INTO energy (user_id, energylevel, notes, datetime) VALUES (?, ?, ?, ?)");
    $stmt_add_energy->bind_param("iiss", $_SESSION['id'], $energylevel, $notes, $datetime2);
    $stmt_add_energy->execute();
    $energy_id = $stmt_add_energy->insert_id;

    //adding activities to db
    foreach ($activities as $activity) {
        $stmt_add_activities = $conn->prepare("INSERT INTO energy_activities (user_id, energy_id, activity_id) VALUES (?, ?, ?)");
        $stmt_add_activities->bind_param("iii", $_SESSION['id'], $energy_id, $activity);
        $stmt_add_activities->execute();
    }

    
    header("location: index.php?page=dashboard");
}