<?php
function getEnergyLevelsByDate($date) {
    global $conn;

    $stmt_get_energy_level = $conn->prepare("SELECT id, energylevel, datetime FROM energy WHERE user_id=? AND cast(datetime as date)=?");
    $stmt_get_energy_level->bind_param("is", $_SESSION['id'], $date);
    $stmt_get_energy_level->execute();

    $stmt_get_energy_level->bind_result($energy_id, $energylevel, $datetime);
    $energylevels = [];
    while ($stmt_get_energy_level->fetch()) {
        $newDateTime = date("M d, Y g:i A", strtotime($datetime));
        $newDate = date("M d, Y", strtotime($datetime));
        $energylevels[] = array("energy_id" => $energy_id, "energylevel" => $energylevel, "datetime" => $newDateTime, "date" => $newDate);
    }
    $stmt_get_energy_level->close();
    return $energylevels;
}

function getEnergyLevelsById($id) {
    global $conn;

    $stmt_get_energy_level = $conn->prepare("SELECT id, energylevel, datetime, notes FROM energy WHERE id=?");
    $stmt_get_energy_level->bind_param("i", $id);
    $stmt_get_energy_level->execute();

    $stmt_get_energy_level->bind_result($energy_id, $energylevel, $datetime, $notes);
    $energylevels = [];
    $stmt_get_energy_level->fetch();
    $newDateTime = date("M d, Y g:i A", strtotime($datetime));
    $energylevels = array("energy_id" => $energy_id, "energylevel" => $energylevel, "notes" => $notes, "datetime" => $newDateTime);

    $stmt_get_energy_level->close();
    return $energylevels;
}