<?php

//If add button pressed
if (isset($_POST['add-energy'])) {

    //Setting variables to values from the form
    $date = $_POST['date'];
    $time = $_POST['time'];
    $datetime = strtotime($date . " " . $time);
    $datetime2 = date("Y-m-d H:i", $datetime);
    $energylevel = $_POST['energylevel'];
    $activities = array();
    if (!empty($_POST['activities'])) {
        $activities = explode(",", $_POST['activities']); //string to array
    }
    $notes = $_POST['notes'];    

    unset($_SESSION['errors']);

    // Adding energylevel
    $stmt_add_energy = $conn->prepare("INSERT INTO energy (user_id, energylevel, notes, datetime) VALUES (?, ?, ?, ?)");
    $stmt_add_energy->bind_param("idss", $_SESSION['id'], $energylevel, $notes, $datetime2);
    $stmt_add_energy->execute();
    $energy_id = $stmt_add_energy->insert_id;
    $stmt_add_energy->close();

    // Adding activities to db
    foreach ($activities as $activity) {
        $stmt_add_activities = $conn->prepare("INSERT INTO energy_activities (user_id, energy_id, activity_id) VALUES (?, ?, ?)");
        $stmt_add_activities->bind_param("iii", $_SESSION['id'], $energy_id, $activity);
        $stmt_add_activities->execute();
        $stmt_add_activities->close();
    }

    $_SESSION['success'][] = "Der Eintrag wurde erfolgreich hinzugefügt.";
    header("location: index.php?page=dashboard");
}

if (isset($_POST['edit-energy'])) {
    //Setting variables to values from the form
    $date = $_POST['date'];
    $time = $_POST['time'];
    $datetime = strtotime($date . " " . $time);
    $datetime2 = date("Y-m-d H:i", $datetime);
    $energylevel = $_POST['energylevel'];
    $activities = array();
    if (!empty($_POST['activities'])) {
        $activities = explode(",", $_POST['activities']); //string to array
    }
    $notes = $_POST['notes'];
    $energy_id = $_GET['id'];


    $stmt = $conn->prepare("UPDATE energy SET energylevel=?, notes=?, datetime=? WHERE id=?");
    $stmt->bind_param("dssi", $energylevel, $notes, $datetime2, $energy_id);
    $stmt->execute();
    $stmt->close();

    // updating activities in db
    $stmt = $conn->prepare("DELETE FROM energy_activities WHERE energy_id=? AND user_id=?");
    $stmt->bind_param("ii", $energy_id, $_SESSION['id']);
    $stmt->execute();
    $stmt->close();
        
    foreach ($activities as $activity) {
        $stmt = $conn->prepare("INSERT INTO energy_activities (user_id, energy_id, activity_id) VALUES (?, ?, ?)");
        $stmt->bind_param("iii", $_SESSION['id'], $energy_id, $activity);
        $stmt->execute();
        $stmt->close();
    }

    $_SESSION['success'][] = "Der Eintrag wurde erfolgreich bearbeitet.";
    header("location: index.php?page=entries");

}

if (isset($_GET['delete'])) {
    $energy_id = $_GET['id'];

    $stmt = $conn->prepare("DELETE FROM energy WHERE id=?");
    $stmt->bind_param("i", $energy_id);
    $stmt->execute();
    $stmt->close();

    $stmt = $conn->prepare("DELETE FROM energy_activities WHERE energy_id=?");
    $stmt->bind_param("i", $energy_id);
    $stmt->execute();
    $stmt->close();

    $_SESSION['success'][] = "Der Eintrag wurde erfolgreich gelöscht.";
    header("location: index.php?page=entries");
}