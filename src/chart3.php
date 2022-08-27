<?php
$startDatetime = strtotime(date("Y-01-01", strtotime($_GET['date'])));
$startDate = date("Y-m-d", $startDatetime);

$endDatetime = strtotime(date("Y-12-31", strtotime($_GET['date'])));
$endDate = date("Y-m-d", $endDatetime);

$dayAvgEnergylevels = calculateDailyAvg($startDatetime, $endDatetime);
$monthAvgEnergylevels = calculateMonthAvg($dayAvgEnergylevels, $startDatetime);




print<<<EOF
        var options = {
            noData: {
                text: "{$text['dnf']}",
            },
            series: [{
                name: "{$text['energylevel']}",
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