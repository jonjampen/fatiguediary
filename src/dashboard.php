<?php
print_head(array('<title>Dashboard</title>'), false);
print_body();
$todayDate = date("Y-m-d");
$daterangeStart = $todayDate;
$daterangeEnd = $todayDate;
$energylevels = getEnergyLevelsByDate($todayDate);
?>


    <div class="welcome-text">
        <h6>Hi <?php echo($_SESSION['name']);?></h6>
        <h3>Your Dashboard</h3>
    </div>
    <div class="date-range">
        <p id="range_d" class="range-item active">Tag</p>
        <p id="range_w" class="range-item">Woche</p>
        <p id="range_m" class="range-item">Monat</p>
        <p id="range_y" class="range-item">Jahr</p>
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



    <script src="assets/chart/moment.min.js"></script>
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
                min: new Date("<?php echo($daterangeStart); ?> 06:00:00").getTime(),
                max: new Date("<?php echo($daterangeEnd); ?> 22:30:00").getTime(),
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

    document.getElementById("range_d").addEventListener("click", function () { changeDateRange(0); });
    document.getElementById("range_w").addEventListener("click", function () { changeDateRange(1); });
    document.getElementById("range_m").addEventListener("click", function () { changeDateRange(2); });
    document.getElementById("range_y").addEventListener("click", function () { changeDateRange(3); });

    function changeDateRange(index) {
        range = ["range_d", "range_w", "range_m", "range_y"];
        for (var i = 0; i < range.length; i++) {
            if (i == index) {
                document.getElementById(range[i]).classList.add("active");
            }
            else {
                document.getElementById(range[i]).classList.remove("active");
            }
        }
    }
        
    </script>

</body>
</html>