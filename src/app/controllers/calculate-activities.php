<?php


function calculateActivity() {
    $energylevels = array();
    $energylevels = getEnergyLevelsByDate(date("Y-m-d"));

    print_r($energylevels);
    echo("--------------------------------");
    
    $energylevels_sorted = sortByDatetime($energylevels);

    print_r($energylevels_sorted);
}


function sortByDatetime($array) {
    usort($array, function($a, $b) {
        $a_datetime = new DateTime($a['datetime']);
        $b_datetime = new DateTime($b['datetime']);
        
        if ($a_datetime == $b_datetime) {
            return 0;
        }
        
        return $a_datetime < $b_datetime ? -1 : 1;
    });

    return $array;
}