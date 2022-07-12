<?php
$startDatetime = strtotime($_GET['date'] . 'last monday');
$startDate = date("Y-m-d", $startDatetime);

$endDatetime = strtotime($startDate . " +7 days");
$endDate = date("Y-m-d", $endDatetime);


//$energylevels = array(    array("energy_id" => $energy_id, "energylevel" => $energylevel, "datetime" => $newDateTime, "date" => $newDate), array(...)   )
$energylevels = array();
for ($i = $startDatetime; $i <= $endDatetime; $i = strtotime(date("Y-m-d", $i) . ' +1 day')) {
    $energylevels = array_merge($energylevels, getEnergyLevelsByDate(date("Y-m-d", $i)));
}


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
                min: new Date("{$startDate} 05:00:00").getTime(),
                max: new Date("{$endDate} 22:30:00").getTime(),
                labels: {
                    formatter: function(val) {
                        return moment(new Date(val)).format("ddd");
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

        document.getElementById("energylevel_area").innerHTML = "";
        var energylevel_area = new ApexCharts(document.querySelector("#energylevel_area"), options);
        energylevel_area.render();
EOF;