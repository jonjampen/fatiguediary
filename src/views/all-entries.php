<?php
    print_head(array('<title>' . $text['all-entries'] . ' | Fatigue Diary</title>'), false);
    print_body();
    includeToastify();
    $todayDate = date("Y-m-d", strtotime($_GET['date']));

    $tempDate = new DateTime();

    ?>

    <div class="entries-screen">
        <h2><?php echo $text['all-title']; ?></h2>
        <div class="date-picker">
            <span class="material-icons" id="nextDay">chevron_left</span>
            <input id="dateInput" type="date" class="date" value="<?php echo($todayDate); ?>">
            <span class="material-icons" id="prevDay">chevron_right</span>
        </div>

        <?php for ($day_counter = 0; $day_counter < 7; $day_counter++): //for each day of the past week ?>
            <?php
                $date = date_sub($tempDate->setTimestamp(strtotime($_GET['date'])), date_interval_create_from_date_string($day_counter . ' day')); // subtract i days from date
                $entries = getEnergyLevelsByDate($date->format("Y-m-d"));

                $average = calculateDailyAvg($entries);
                if ($average) {
                    $average = round($average, 1);
                }
            ?>

            <div class="container day border_color">
                <div class="title-row">
                    <h3><?php echo($date->format("D, d.m.Y")); ?></h3>
                    <h3 class="energyAverage"><?php echo($average); ?></h3>
                </div>
                <?php foreach ($entries as $entry): ?>
                    <?php
                        $activity_ids = getActivitiesByEnergyId($entry['energy_id']);
                    ?>
                    <div class="entry" onclick="redirectToEdit(<?php echo($entry['energy_id']);?>)">
                        <p class="time"><?php echo(date("H:i", strtotime($entry['datetime']))); ?></p>
                        <div class="info">
                            <div class="description">
                                <div class="activities">
                                    <?php
                                    $activity_counter = 1;
                                    foreach ($activity_ids as $activity_id){
                                        $activity_name = getActivityNameById($activity_id['id']);
                                        echo("<p>{$activity_name}</p>");
    
                                        // add comma after activity except for last activity
                                        if ($activity_counter != count($activity_ids)) {
                                            echo("<p>,&nbsp</p>");
                                        }
                                        $activity_counter++;
                                    }
                                    ?>
                                </div>
                                <div class="notes">
                                    <?php
                                    $energylevel = getEnergyLevelsById($entry['energy_id']);
                                    if (!empty($energylevel['notes'])) {
                                        echo ('<p> ' . $energylevel['notes'] . '</p>');
                                    }
                                    ?>
                                </div>
                            </div>
                            <h3 class="energyValue"><?php echo($entry['energylevel']); ?></h3>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endfor; ?>
    </div>
    
    
    <script src="assets/chart/moment.min.js"></script>
    <script src="assets/js/visualizeValue.js"></script>
    <script>
        var entryValue = document.getElementsByClassName("energyValue");
        for (var i = 0; i < entryValue.length; i++) {
            calculateColor(entryValue[i].textContent, entryValue[i]);
        }

        var averageValue = document.getElementsByClassName("energyAverage");
        for (var i = 0; i < averageValue.length; i++) {
            calculateColor(averageValue[i].textContent, averageValue[i]);
        }

        var border = document.getElementsByClassName("border_color");
        for (var i = 0; i < averageValue.length; i++) {
            calculateBorderColor(averageValue[i].textContent, border[i], false);
        }

        function redirectToEdit(id) {
            window.location.href = "index.php?page=add-new&id=" + id;
        }

        document.getElementById("nextDay").addEventListener("click", function () { changeDate(-7); });
        document.getElementById("prevDay").addEventListener("click", function () { changeDate(7); });
        var dateInput = document.getElementById("dateInput");
        dateInput.addEventListener("change", function () { changeDate(0); });
        var date = new Date();

        function changeDate(change) {
            date = new Date(dateInput.value);
            newDate = date.setDate(date.getDate() + change);
            newDate = moment(newDate).format("YYYY-MM-DD");
            dateInput.value = newDate;
            date = newDate;

            window.location.href = "index.php?page=entries&date=" + date;
        }
    </script>

</body>
</html>