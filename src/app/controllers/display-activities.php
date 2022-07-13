<?php
if (isset($_GET['type'])) {
    include("../database/db.php");
    include("../database/connection.php");

    displayActivities();
}

function displayActivities() {
    global $conn;
    //get activities form db
    $stmt = $conn->prepare("SELECT id, name from activities WHERE user_id=?");
    $stmt->bind_param("s", $_SESSION['id']);
    $stmt->execute();
    $stmt->bind_result($activity_id, $activity_name);
    $activities = [];
    
    while ($stmt->fetch()) {
        $activities[] = array("id" => $activity_id, "name" => $activity_name);
    }
    $stmt->close();
    
    foreach ($activities as $activity) {
        echo "<a class='' id='toggleActivity_" . $activity['id'] . "' href='javascript:toggleActivity(" . $activity['id'] . ")'>" . $activity['name'] . "</a>";
    }
    echo "<a class='activity add' id='modalOpen'><span class='material-icons'>add</span></a>";

}

function getActivitiesByEnergyId($energy_id) {
    global $conn;
    //get activities form db
    $stmt = $conn->prepare("SELECT activity_id from energy_activities WHERE user_id=? AND energy_id=?");
    $stmt->bind_param("si", $_SESSION['id'], $energy_id);
    $stmt->execute();
    $stmt->bind_result($activity_id);
    $activities = array();
    
    while ($stmt->fetch()) {
        $activities[] = array("id" => $activity_id);
    }
    $stmt->close();
    return $activities;
}

function getActivityNameById($activity_id) {
    global $conn;
    //get activities form db
    $stmt = $conn->prepare("SELECT name from activities WHERE id=?");
    $stmt->bind_param("i", $activity_id);
    $stmt->execute();
    $stmt->bind_result($activity_name);
    $activities = [];
    
    while ($stmt->fetch()) {
        $activities[] = array("name" => $activity_name);
    }
    $stmt->close();
    return $activity_name;
}
?>