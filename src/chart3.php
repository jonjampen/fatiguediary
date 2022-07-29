<?php
$startDatetime = strtotime(date("Y-01-01", strtotime($_GET['date'])));
$startDate = date("Y-m-d", $startDatetime);

$endDatetime = strtotime(date("Y-12-31", strtotime($_GET['date'])));
$endDate = date("Y-m-d", $endDatetime);


//$energylevels = array(    array("energy_id" => $energy_id, "energylevel" => $energylevel, "datetime" => $newDateTime, "date" => $newDate), array(...)   )
$dayAvgEnergylevels = array();
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
        $dayAvgEnergylevels = array_merge($dayAvgEnergylevels, array(array("energylevel" => $avgDay, "datetime" => date("Y-m-d", $i))));
    }
    else {
        $dayAvgEnergylevels = array_merge($dayAvgEnergylevels, array(array("energylevel" => 0, "datetime" => date("Y-m-d", $i))));
    }
}

$monthSum = array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
$monthCounter = array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
foreach ($dayAvgEnergylevels as $dayAvgEnergylevel) {
    $monthSum[date("n", strtotime($dayAvgEnergylevel['datetime'])) - 1] += $dayAvgEnergylevel['energylevel'];
    if ($dayAvgEnergylevel['energylevel'] != 0) {
        $monthCounter[date("n", strtotime($dayAvgEnergylevel['datetime'])) - 1] += 1;
    }
}

$monthAvgEnergylevels = array();
foreach ($monthSum as $key=>$sum) {
    if ($monthCounter[$key] != 0) {
        $monthAvgEnergylevels[$key] = array("energylevel" => round($sum/$monthCounter[$key], 1), "datetime" => date("Y-" . $key+1 . "-d", $startDatetime));
    }
    else {
        $monthAvgEnergylevels[$key] = array("energylevel" => 0, "datetime" => date("Y-" . $key+1 . "-d", $startDatetime));
    }
}



print<<<EOF
        var options = {
            noData: {
                text: "No Data Available",
            },
            series: [{
                name: 'Energie',
                data: [
EOF;
                    foreach ($monthAvgEnergylevels as $energylevel) {
                        echo($energylevel['energylevel'] . ',');
                    };
print<<<EOF
                ]
            }],
            chart: {
                height: 250,
                type: 'bar'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            colors:['#F55B53'],
            xaxis: {
                type: 'datetime',
                categories: [
EOF;

                    foreach ($monthAvgEnergylevels as $energylevel) {
                        echo('"' . date("Y-m-d H:i:s", strtotime($energylevel['datetime'])) . '"' . ',');
                    };
print<<<EOF
                ],
                labels: {
                    datetimeFormatter: {
                        year: 'yyyy',
                        month: 'MMM',
                        day: 'dd',
                        hour: 'HH:mm'
                    },
                    style: {
                        colors: '#7D8082',
                    },
                    datetimeUTC: false, // Do not convert to UTC
                },
            },
            yaxis: {
                labels: {
                    formatter: function(val) {
                        return val.toFixed(0);
                    },
                    style: {
                        colors: '#7D8082',
                    },
                },
                tickAmount: 5, // only 6 labels
                min: 0,
                max: 10
            },
            tooltip: {
                x: {
                    show: true,
                    format: 'MMMM yyyy',
                },
                y: {
                    formatter: function (val) {
                        return val.toFixed(1)
                    },
                },
            },
            grid: {
                borderColor: '#7D8082',
            }

        };

        document.getElementById("energylevel_area").innerHTML = "";
        var energylevel_area = new ApexCharts(document.querySelector("#energylevel_area"), options);
        energylevel_area.render();
EOF;