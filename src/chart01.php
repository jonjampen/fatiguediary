<?php
// from get start and end date
$startDate = date("Y-m-d", strtotime($_GET['startDate']));
$endDate = date("Y-m-d", strtotime($_GET['endDate']));

// call function to get energylevels
$energylevels = getEnergyLevelsByDate($startDate);

print<<<EOF
        var options = {
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
                min: new Date("{$startDate} 06:00:00").getTime(),
                max: new Date("{$endDate} 22:30:00").getTime(),
                labels: {
                    formatter: function(val) {
                        return moment(new Date(val)).format("HH:mm");
                    },
                    style: {
                        colors: '#FFFFFF',
                    },
                    datetimeUTC: false, // Do not convert to UTC
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#FFFFFF',
                    },
                    formatter: function (val) {
                        return val.toFixed(0) // only integers
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

        };

        var energylevel_area = new ApexCharts(document.querySelector("#energylevel_area"), options);
        energylevel_area.render();
EOF;