<?php
$startDatetime = strtotime($_GET['date'] . 'last monday');
$startDate = date("Y-m-d", $startDatetime);

$endDatetime = strtotime($startDate . " +6 days");
$endDate = date("Y-m-d", $endDatetime);


$energylevels = calculateDailyAvg($startDatetime, $endDatetime);


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

                    foreach ($energylevels as $energylevel) {
                        echo('"' . date("Y-m-d H:i:s", strtotime($energylevel['datetime'])) . '"' . ',');
                    };
print<<<EOF
                ],
                tickAmount: 7,
                labels: {
                    datetimeFormatter: {
                        year: 'YYYY',
                        month: 'MMM \'yy',
                        day: 'ddd',
                        hour: 'ddd'
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
                    format: 'ddd, dd.MM.yy'
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