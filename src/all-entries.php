<?php
    print_head(array('<title>Alle Einträge | Fatigue Diary</title>'), false);
    print_body();
    includeToastify();
    ?>

    <div class="entries-screen">
        <h2>Einträge</h2>
        <?php for ($day_counter = 0; $day_counter < 7; $day_counter++): //for each day of the past week ?>
            <?php
                $date = date_sub(new DateTime(), date_interval_create_from_date_string($day_counter . ' day')); // subtract i days from date
                $entries = getEnergyLevelsByDate($date->format("Y-m-d"));

                // calculate daily energy average
                $sum = 0;
                $counter = 0;
                $average = null;
                foreach ($entries as $entry) {
                    $sum += $entry['energylevel'];
                    $counter++;
                }
                if ($counter != 0) {
                    $average = round(($sum/$counter) * 2) / 2; //round to 0.5
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
                        <div class="description">
                            <br>
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
                            <h3 class="energyValue"><?php echo($entry['energylevel']); ?></h3>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endfor; ?>
    </div>

    
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
            calculateBorderColor(averageValue[i].textContent, border[i]);
        }

        function redirectToEdit(id) {
            window.location.href = "index.php?page=add-new&id=" + id;
        }
    </script>

</body>
</html>