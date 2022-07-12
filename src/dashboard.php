<?php
print_head(array('<title>Dashboard</title>'), false);
print_body();
includeToastify();
$todayDate = date("Y-m-d");

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
        <span class="material-icons" id="nextDay">chevron_left</span>
        <input id="dateInput" type="date" class="date" value="<?php echo($todayDate); ?>">
        <span class="material-icons" id="prevDay">chevron_right</span>
    </div>
    
    <div class="container chart">
        <h3 class="center-title">Energie</h3>
        <div id="energylevel_area"></div>
        <!-- <div class="point-amount">
            <button class="btn-primary" type="" name="">Alle Werte</button>
            <button class="btn-primary outline" type="" name="">Tages Druchschn.</button>
            <button class="btn-primary outline" type="" name="">Wochen Druchschn.</button>
        </div> -->
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


    var range = 0;
    updateChart();

    document.getElementById("range_d").addEventListener("click", function () { range = 0; changeDateRange(range); });
    document.getElementById("range_w").addEventListener("click", function () { range = 1; changeDateRange(range); });
    document.getElementById("range_m").addEventListener("click", function () { range = 2; changeDateRange(range); });
    document.getElementById("range_y").addEventListener("click", function () { range = 3; changeDateRange(range); });

    function changeDateRange(index) {
        range_type = ["range_d", "range_w", "range_m", "range_y"];
        for (var i = 0; i < range_type.length; i++) {
            if (i == index) {
                document.getElementById(range_type[i]).classList.add("active");
            }
            else {
                document.getElementById(range_type[i]).classList.remove("active");
            }
        }
        if (range >= 1) {
            document.getElementById("energylevel_area").innerHTML = "<p>Diese Ansicht kommt bald...</p>";
        } else {
            updateChart();
        }
    }
    

    document.getElementById("nextDay").addEventListener("click", function () { changeDate(-1); });
    document.getElementById("prevDay").addEventListener("click", function () { changeDate(1); });
    var dateInput = document.getElementById("dateInput");
    dateInput.addEventListener("change", function () { changeDate(0); });
    var date = new Date();

    function changeDate(change) {
        date = new Date(dateInput.value);
        newDate = date.setDate(date.getDate() + change); // add one day
        newDate = moment(newDate).format("YYYY-MM-DD");
        dateInput.value = newDate;
        date = newDate;
        updateChart();
    }

    function updateChart() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if (this.readyState==4 && this.status==200) {
                eval(this.responseText);
            }
        };
        xmlhttp.open("GET", "index.php?page=ajax&chart=" + range + "&date=" + moment(date).format("YYYY-MM-DD"), true);
        xmlhttp.send();
    }   
    </script>

</body>
</html>