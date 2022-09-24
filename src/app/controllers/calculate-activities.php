<?php

function calculateActivities() {
    global $conn;
    // get all activities
    $stmt = $conn->prepare("SELECT name FROM activities WHERE user_id = ?");
    $stmt->bind_param("i", $_SESSION['id']);
    $stmt->execute();
    $stmt->bind_result($activity);
    while ($stmt->fetch()) {
        $activities[$activity] = array();
    }
    
    // get all entries from user
    $stmt = $conn->prepare("SELECT id, energylevel FROM energy WHERE user_id = ? AND datetime >= DATE(NOW() - INTERVAL 30 DAY)");
    $stmt->bind_param("i", $_SESSION['id']);
    $stmt->execute();
    $stmt->bind_result($energy_id, $energylevel);
    
    $entries = array();
    while ($stmt->fetch()) {
        $entries[] = array("id" => $energy_id, "energylevel" => $energylevel);
    }
    $stmt->close();
    
    // foreach entry add difference to array
    foreach ($entries as $key=>$entry) {
        $activity_entry = array();
        // get according activity_ids
        $stmt = $conn->prepare("SELECT b.name FROM energy_activities a, activities b WHERE a.user_id = ? AND a.energy_id = ? AND b.id = a.activity_id");
        $stmt->bind_param("ii", $_SESSION['id'], $entry['id']);
        $stmt->execute();
        $stmt->bind_result($name);
        while ($stmt->fetch()) {
            $activity_entry[] = $name;
        }
        $stmt->close();
        
        // calculate energy difference
        if ($key > 0) {
            $difference = $entry['energylevel'] - $entries[$key-1]['energylevel'];
        }
        else {
            $difference = 0;
        }
        foreach ($activity_entry as $activity) {
            $activities[$activity][] = $difference;
        }
    }    
    
    if (!empty($activities)) {
        foreach ($activities as $activity=>$differences) {
            $sum = 0;
            $counter = 0;
            $avg = 0;
    
            foreach ($differences as $difference) {
                $sum += $difference;
                $counter++;
            }
    
            if (!$counter == 0) {
                $avg = $sum / $counter;
            }
    
            $activities[$activity]['avg'] = $avg;
        }
        
        $goodBad = array("good" => array(), "bad" => array());
        foreach ($activities as $activity=>$array) {
            if ($array['avg'] > 0) {
                $goodBad['good'][$activity] = $array['avg'];
            }
            else if ($array['avg'] < 0) {
                $goodBad['bad'][$activity] = $array['avg'];
            }
    
        }
        
        // sort
        arsort($goodBad['good']);
        asort($goodBad['bad']);
        
    } else {
        $goodBad = array("good" => array(), "bad" => array());
    }

    return($goodBad);
    // @return array("good" => array(#activity_names), "bad" => array(#activity_names));
}