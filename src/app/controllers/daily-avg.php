<?php

function calculateDailyAvg($entries) {
    // calculate daily energy average
    if (count($entries) == 0) {
        return null;
    }
    if (count($entries) == 1) {
        return $entries[0]['energylevel'];
    }
    $values = array();
    
    // time from first-last
    $lastTime = strtotime(end($entries)['datetime']);
    $firstTime = strtotime($entries[0]['datetime']);
    $totalTime = ($lastTime - $firstTime) / 60;
    
    // avg of two entries
    foreach ($entries as $key=>$entry) {
        // skip last
        if ($key == (count($entries) - 1)) {
            break;
        }
        
        //time from one-two
        $startTime = strtotime($entry['datetime']);
        $endTime = strtotime($entries[$key + 1]['datetime']);
        $timeDifference = ($endTime - $startTime) / 60;
        
        //avg
        $avg = ($entry['energylevel'] + $entries[$key + 1]['energylevel']) / 2;
        $values[] = ($avg * $timeDifference) / $totalTime;
    }
    
    //calculate total average
    return array_sum($values);
}
