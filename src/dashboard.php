<?php
print_head(array(
    '<title>Document</title>'), false);
print_body();
$todayDate = date("Y-m-d");
$energylevels = getEnergyLevelsByDate($todayDate);
?>
    <div class="welcome-text">
        <h6>Hi <?php echo($_SESSION['name']);?></h6>
        <h3>Your Dashboard</h3>
    </div>
    
    <div class="container diagram">
      <div id="energylevel_area"></div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    
    <script>
        var options = {
            series: [{
                name: 'series1',
                data: [
                    <?php
                    foreach ($energylevels as $energylevel) {
                        echo($energylevel['energylevel'] . ',');
                    };
                    ?>
                ]
            }],
            chart: {
                height: 290,
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
                    <?php
                    foreach ($energylevels as $energylevel) {
                    echo('"' . date("Y-m-d H:i:s", strtotime($energylevel['datetime'])) . '"' . ',');
                    };
                    ?>
                ],
                labels: {
                    style: {
                        colors: '#FFFFFF',
                    }
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#FFFFFF',
                    }
                },
                min: 0,
                max: 10
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
        };

        var energylevel_area = new ApexCharts(document.querySelector("#energylevel_area"), options);
        energylevel_area.render();
    </script>

</body>
</html>