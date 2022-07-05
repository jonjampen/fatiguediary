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

    $energylevels = getEnergyLevelsByDate();
    $difference = $energylevel - end($energylevels)['energylevel']; //TODO if last date is not newest

    // count occurrences of activity in db
    $activities_count = array();
    foreach ($activities as $activity_id) {
        $stmt = $conn->prepare("SELECT * FROM energy_activities WHERE activity_id=?");
        $stmt->bind_param("i", $activity_id);
        $stmt->execute();
        $stmt->store_result();
        $activity_count = $stmt->num_rows;
        $stmt->close();

        //get old score
        $stmt = $conn->prepare("SELECT score FROM activities WHERE id=?");
        $stmt->bind_param("i", $activity_id);
        $stmt->execute();
        $stmt->bind_result($selected_score);

        $old_score = 0;
        while ($stmt->fetch()) {
            $old_score = $selected_score;
        }
        $stmt->close();        

        //calculate and set new score
        $new_score = (($old_score * $activity_count) + $difference) / ($activity_count + 1);

        $stmt = $conn->prepare("UPDATE activities SET score=? WHERE id=?");
        $stmt->bind_param("di", $new_score, $activity_id);
        $stmt->execute();
        $stmt->close();
    }

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

    
    header("location: index.php?page=dashboard");
}