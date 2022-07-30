<?php
// type: int
$startDatetime = strtotime($_GET['date']);

//type: string
$startDate = date("Y-m-d", $startDatetime);
$endDate = $startDate;

$wakeUpTime = date("H:i:s", strtotime($_SESSION['settings']['wake_up_time']));
$bedTime = date("H:i:s", strtotime($_SESSION['settings']['bed_time']));

//$energylevels = array(    array("energy_id" => $energy_id, "energylevel" => $energylevel, "datetime" => $newDateTime, "date" => $newDate), array(...)   )
$energylevels = array();
$energylevels = getEnergyLevelsByDate($startDate);


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
                        $activities = getActivitiesByEnergyId($energylevel['energy_id']);
                        $activities_string = "";
                        $activity_counter = 1;
                        foreach ($activities as $activity) {
                            $activities_string .= getActivityNameById($activity['id']);
                            if ($activity_counter != count($activities)) {
                                $activities_string .= ", ";
                            }
                            $activity_counter++;
                        }
                        echo('{
                            y: ' . $energylevel['energylevel'] . ',
                            x: "' . $energylevel['datetime'] . '",
                            z: "' . $activities_string . '",
                        },');
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
                min: new Date("{$startDate} {$wakeUpTime}").getTime(),
                max: new Date("{$endDate} {$bedTime}").getTime(),
                labels: {
                    datetimeFormatter: {
                        year: 'YYYY',
                        month: 'MMM \'yy',
                        day: 'ddd',
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
                    format: 'dd/MM/yy HH:mm'
                },
                y: {
                    formatter: function (val) {
                        return val.toFixed(1)
                    },
                },
                z: {
                    title: "Aktivitäten:",
                }
            },
            grid: {
                borderColor: '#7D8082',
            }

        };

        document.getElementById("energylevel_area").innerHTML = "";
        var energylevel_area = new ApexCharts(document.querySelector("#energylevel_area"), options);
        energylevel_area.render();
EOF;