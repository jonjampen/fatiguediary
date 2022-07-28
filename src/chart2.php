<?php
$startDatetime = strtotime(date("Y-m-01", strtotime($_GET['date'])));
$startDate = date("Y-m-d", $startDatetime);

$endDatetime = strtotime(date("Y-m-t", strtotime($_GET['date'])));
$endDate = date("Y-m-d", $endDatetime);


//$energylevels = array(    array("energy_id" => $energy_id, "energylevel" => $energylevel, "datetime" => $newDateTime, "date" => $newDate), array(...)   )
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
    $avgDay = round(($sum / $counter)*2)/2;
    if (!empty($allEnergylevels)) {
        $energylevels = array_merge($energylevels, array(array("energylevel" => $avgDay, "datetime" => date("Y-m-d", $i))));
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
                    foreach ($energylevels as $energylevel) {
                        echo($energylevel['energylevel'] . ',');
                    };
print<<<EOF
                ]
            }],
            chart: {
                height: 250,
                type: 'area'
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

                    foreach ($energylevels as $energylevel) {
                        echo('"' . date("Y-m-d H:i:s", strtotime($energylevel['datetime'])) . '"' . ',');
                    };
print<<<EOF
                ],
                min: new Date("{$startDate} 00:00:00").getTime(),
                max: new Date("{$endDate} 00:00:00").getTime(),
                labels: {
                    formatter: function(val) {
                        return moment(new Date(val)).format("DD");
                    },
                    style: {
                        colors: '#7D8082',
                    },
                    datetimeUTC: false, // Do not convert to UTC
                },
            },
            yaxis: {
                labels: {
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
                    format: 'dd/MM/yy HH:mm'
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