<?php

function calculateDailyAvg($startDatetime, $endDatetime) {
    $energylevels = array();

    for ($i = $startDatetime; $i <= $endDatetime; $i = strtotime(date("Y-m-d", $i) . ' +1 day')) {
        /* Daily average */
        $allEnergylevels = getEnergyLevelsByDate(date("Y-m-d", $i));
        $sum = 0;
        $counter = 0;
        foreach ($allEnergylevels as $energylevel) {
            $sum += $energylevel['energylevel'];
            $counter += 1;
        }
        if ($counter == 0) {
            $counter = 1;
        }
        $avgDay = $sum / $counter;
        if (!empty($allEnergylevels)) {
            $energylevels = array_merge($energylevels, array(array("energylevel" => $sum/$counter , "datetime" => date("Y-m-d", $i))));
        }
        else {
            $energylevels = array_merge($energylevels, array(array("energylevel" => 0, "datetime" => date("Y-m-d", $i))));
        }
    
        /* All values */
        //$energylevels = array_merge($energylevels, getEnergyLevelsByDate(date("Y-m-d", $i)));
    }
    return $energylevels;
}

function calculateMonthAvg($dayAvgEnergylevels, $startDatetime) {
    $avgByMonth = array_fill(0, 12, array("sum" => 0, "counter" => 0));

    foreach ($dayAvgEnergylevels as $dayAvgEnergylevel) {
        $avgByMonth[date("n", strtotime($dayAvgEnergylevel['datetime'])) - 1]['sum'] += $dayAvgEnergylevel['energylevel'];

        if ($dayAvgEnergylevel['energylevel'] != 0) {
            $avgByMonth[date("n", strtotime($dayAvgEnergylevel['datetime'])) - 1]['counter'] += 1;
        }
    }
    
    $monthAvgEnergylevels = array();
    foreach ($avgByMonth as $key=>$value) {
        $month = $key+1;
        if ($value['counter'] != 0) {
            $monthAvgEnergylevels[$key] = array("energylevel" => round($value['sum']/$value['counter'], 1), "datetime" => date("Y-" . date("m", strtotime("01." . $month . ".2022")) . "-d", $startDatetime));
        }
        else {
            $monthAvgEnergylevels[$key] = array("energylevel" => 0, "datetime" => date("Y-" . date("m", strtotime("01." . $month. ".2022")) . "-d", $startDatetime));
        }
    }

    return $monthAvgEnergylevels;
}