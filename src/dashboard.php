<?php
print_head(array(
    '<script src="assets/chart/chart.min.js"></script>',
    '<script src="assets/chart/moment.min.js"></script>',
    '<script src="assets/chart/chartjs-adapter-moment.js"></script>',

    '<title>Document</title>'), false);
print_body();
$todayDate = date("Y-m-d");
$energylevels = getEnergyLevelsByDate($todayDate);
?>

    <h3 class="welcome-text">Willkommen <?php echo($_SESSION['name']);?></h3>
    
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
            min: new Date('12 Jun 2022 06:00:00'),
            max: new Date('12 Jun 2022 22:30:00'),
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

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    </script>

</body>
</html>