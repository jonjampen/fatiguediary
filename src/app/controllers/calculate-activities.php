<?php


function calculateActivity() {
    $energylevels = array();
    $energylevels = getEnergyLevelsByDate(date("Y-m-d"));

    print_r($energylevels);
}