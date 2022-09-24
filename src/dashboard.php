<?php
print_head(array('<title>Dashboard</title>'), false);
print_body();
includeToastify();
$todayDate = date("Y-m-d");

?>


    <div class="welcome-text">
        <h6>Hi <?php echo($_SESSION['name']);?></h6>
        <h3><?php echo $text['d_title']; ?></h3>
    </div>
    <div class="date-range">
        <p id="range_d" class="range-item active"><?php echo $text['day']; ?></p>
        <p id="range_w" class="range-item"><?php echo $text['week']; ?></p>
        <p id="range_m" class="range-item"><?php echo $text['month']; ?></p>
        <p id="range_y" class="range-item"><?php echo $text['year']; ?></p>
    </div>
    <div class="date-picker">
        <span class="material-icons" id="nextDay">chevron_left</span>
        <input id="dateInput" type="date" class="date" value="<?php echo($todayDate); ?>">
        <span class="material-icons" id="prevDay">chevron_right</span>
    </div>
    
    <div class="container chart">
        <h3 class="center-title"><?php echo $text['energy']; ?></h3>
        <div id="energylevel_area"></div>
        <!-- <div class="point-amount">
            <button class="btn-primary" type="" name="">Alle Werte</button>
            <button class="btn-primary outline" type="" name="">Tages Druchschn.</button>
            <button class="btn-primary outline" type="" name="">Wochen Druchschn.</button>
        </div> -->
    </div>
    
    <?php
        $goodAndBad = calculateActivities();
        $goodActivities = $goodAndBad['good'];
        
        $badActivities = $goodAndBad['bad'];
        ?>

    <div class="container">
        <div class="title-row">
            <span class="material-icons"></span>
            <h3 class="center-title"><?php echo $text['good-activities']; ?></h3>
            <span class="material-icons" onclick="expandActivities(0, this)">expand_more</span>
        </div>
        <div class="rated-activities">
        <?php
            $i = 0;
            foreach ($goodActivities as $name=>$avg) {
                if ($i<3) {
                    echo('<p class="rated-activity border_color">' . $name . '</p>');
                } else {
                    echo('<p class="rated-activity border_color hidden good-overflow-activity">' . $name . '</p>');
                }
                $i++;
            }
        ?>
        </div>
    </div>
    <div class="container">
        <div class="title-row">
            <span class="material-icons"></span>
            <h3 class="center-title"><?php echo $text['bad-activities']; ?></h3>
            <span class="material-icons" onclick="expandActivities(1, this)">expand_more</span>
        </div>
        <div class="rated-activities">
            <?php
                $i = 0;
                foreach ($badActivities as $name=>$avg) {
                    if ($i<3) {
                        echo('<p class="rated-activity border_color">' . $name . '</p>');
                    } else {
                        echo('<p class="rated-activity border_color hidden bad-overflow-activity">' . $name . '</p>');
                    }
                    $i++;
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
            $i = 0;
            $value = 0;
            $worst = end($goodActivities);
            $best = array_values($goodActivities)[0];
            $segment = ($best - $worst) / 3;
            
            foreach ($goodActivities as $name=>$avg) {
                for ($factor = 1; $factor <= 3; $factor++) {
                    if ($avg <= $worst + ($segment * $factor)) {
                        $value = 7 - (4 - $factor);
                        break;
                    }
                }
                echo("calculateBorderColor(" . $value . ", border[" . $j . "]); \n");
                $j++;
            }
            
            
            $i = 0;
            $worst = array_values($badActivities)[0];
            $best = end($badActivities);
            $segment = (abs($worst) - abs($best)) / 3;

            foreach ($badActivities as $name=>$avg) {
                for ($factor = 1; $factor <= 3; $factor++) {
                    if (abs($avg) >= abs($worst + ($segment * $factor))) {
                        $value = $factor - 1;
                        break;
                    }
                }
                echo("calculateBorderColor(" . $value . ", border[" . $j . "]); \n");
                $j++;
            }
        ?>


    var range = 0;
    var increment = [1, 7, "month", "year"];
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
            updateChart();
    }
    

    document.getElementById("nextDay").addEventListener("click", function () { changeDate(-1); });
    document.getElementById("prevDay").addEventListener("click", function () { changeDate(1); });
    var dateInput = document.getElementById("dateInput");
    dateInput.addEventListener("change", function () { changeDate(0); });
    var date = new Date();

    function changeDate(change) {
        date = new Date(dateInput.value);

        // add days/month/year
        if (increment[range] == "month") {
            newDate = date.setMonth(date.getMonth() + change);
        }
        else if (increment[range] == "year") {
            newDate = date.setYear(date.getFullYear() + change);
        }
        else {
            newDate = date.setDate(date.getDate() + change * increment[range]);
        }

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

    expandState = [];
    expandState[0] = false;
    expandState[1] = false;
    function expandActivities(section, element) {
        expandState[section] = !expandState[section];
        
        if (section == 0) {
            overflowActivities = document.getElementsByClassName("good-overflow-activity");
        } else {
            overflowActivities = document.getElementsByClassName("bad-overflow-activity");
        }

        if (expandState[section] == true) {
            element.innerHTML = "expand_less";
            Array.from(overflowActivities).forEach(element => element.classList.remove("hidden"));
            console.log("Expanding");
        } else {
            Array.from(overflowActivities).forEach(element => element.classList.add("hidden"));
            element.innerHTML = "expand_more";
            console.log("collapse");
        }
    }
    </script>

</body>
</html>