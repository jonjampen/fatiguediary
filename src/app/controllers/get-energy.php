<?php
function getEnergyLevelsByDate($date) {
    global $conn;

    $stmt_get_energy_level = $conn->prepare("SELECT energylevel, datetime FROM energy WHERE user_id=? AND cast(datetime as date)=?");
    $stmt_get_energy_level->bind_param("is", $_SESSION['id'], $date);
    $stmt_get_energy_level->execute();

    $stmt_get_energy_level->bind_result($energylevel, $datetime);
    $energylevels = [];
    while ($stmt_get_energy_level->fetch()) {
        $newDateTime = date("M d, Y g:i A", strtotime($datetime));
        $newDate = date("M d, Y", strtotime($datetime));
        $energylevels[] = array("energylevel" => $energylevel, "datetime" => $newDateTime, "date" => $newDate);
    }
    $stmt_get_energy_level->close();
    return $energylevels;
}