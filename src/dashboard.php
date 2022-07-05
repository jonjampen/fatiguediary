<?php
print_head(array('<title>Dashboard</title>'), false);
print_body();
$todayDate = date("Y-m-d");
$energylevels = getEnergyLevelsByDate($todayDate);
?>
    <div class="welcome-text">
        <h6>Hi <?php echo($_SESSION['name']);?></h6>
        <h3>Your Dashboard</h3>
    </div>
    <div class="date-range">
        <p>Day</p>
        <p>Week</p>
        <p class="active">Month</p>
        <p>Year</p>
    </div>
    <div class="date-picker">
        <a href=""><span class="material-icons">chevron_left</span></a>
        <input type="date" class="date" value="<?php echo($todayDate); ?>">
        <a href=""><span class="material-icons">chevron_right</span></a>
    </div>
    
    <div class="container chart">
        <h3 class="center-title">Energie</h3>
        <div id="energylevel_area"></div>
        <div class="point-amount">
            <button class="btn-primary" type="" name="">Alle Werte</button>
            <button class="btn-primary outline" type="" name="">Tages Druchschn.</button>
            <button class="btn-primary outline" type="" name="">Wochen Druchschn.</button>
        </div>
    </div>
    
    <?php
        $goodAndBad = array();
        $goodAndBad = calculateActivity();
        $goodActivities = $goodAndBad['good'];
        $badActivities = $goodAndBad['bad'];        
        ?>

    <div class="container">
        <h3 class="center-title">Aktivitäten, die dir Energie geben.</h3>
        <div class="rated-activities">
        <?php
            for ($i = 0; $i < count($goodActivities) && $i < 3; $i++) {
                $goodActivity = $goodActivities[$i];

                echo('<p class="rated-activity border_color">' . $goodActivity['name'] . '</p>');
            }
        ?>
        </div>
    </div>
    <div class="container">
        <h3 class="center-title">Aktivitäten, die dir Energie rauben.</h3>
        <div class="rated-activities">
            <?php
                for ($i = 0; $i < count($badActivities) && $i < 3; $i++) {
                    $badActivity = $badActivities[$i];
                    echo('<p class="rated-activity border_color">' . $badActivity['name'] . '</p>');
                }
            ?>
        </div>
    </div>



    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <script src="assets/js/visualizeValue.js"></script>

    <script>
        var options = {
            series: [{
                name: 'Energie',
                data: [
                    <?php
                    foreach ($energylevels as $energylevel) {
                        echo($energylevel['energylevel'] . ',');
                    };
                    ?>
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
                    <?php
                    foreach ($energylevels as $energylevel) {
                        echo('"' . date("Y-m-d H:i:s", strtotime($energylevel['datetime'])) . '"' . ',');
                    };
                    ?>
                ],
                labels: {
                    style: {
                        colors: '#FFFFFF',
                    },
                    datetimeUTC: false, // Do not convert to UTC
                },
                // min: new Date("04.07.2022 06:00:00").getTime(),
                // max: new Date("04.07.2022 23:00:00").getTime(),
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

        var border = document.getElementsByClassName("border_color");
        <?php
            $j = 0;
            for ($i = 0; $i < count($goodActivities) && $i < 3; $i++) {
                $goodActivity = $goodActivities[$i];
                echo("calculateBorderColor(" . round((10 + $goodActivity['score'])*2)/4 . ", border[" . $j . "]); \n");
                $j++;
            }
            for ($i = 0; $i < count($badActivities) && $i < 3; $i++) {
                $badActivity = $badActivities[$i];
                echo("calculateBorderColor(" . round((10 + $badActivity['score'])*2)/4 . ", border[" . $j . "]); \n");
                $j++;
            }

        ?>
        
    </script>

</body>
</html>