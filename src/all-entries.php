<?php
print_head(array());
print_body();
?>

<div class="entries-screen">
        <h2>Einträge</h2>
         <?php for ($i = 0; $i < 7; $i++): ?> <!-- for each day of the past week -->
            <?php
                $date = date("Y-m-d");
                $date = date_sub(date_create($datetime = "now"), date_interval_create_from_date_string($i . ' day'));
                $entries = getEnergyLevelsByDate($date->format("Y-m-d"));
                $sum = 0;
                $counter = 0;
                $average = 0;
                foreach ($entries as $entry) {
                    $sum += $entry['energylevel'];
                    $counter++;
                }
                if($counter != 0) {
                    $average = round(($sum/$counter) * 2) / 2; //round to 0.5
                }
            ?>
            <div class="container day border-color">
                <div class="title-row">
                    <h3><?php echo($date->format("D, d.m.Y")); ?></h3>
                    <h3 class="energyAverage"><?php echo($average); ?></h3>
                </div>
                <?php foreach ($entries as $entry): ?>
                    <?php
                        $activity_ids = getActivitiesByEnergyId($entry['energy_id']);
                    ?>
                    <div class="entry">
                        <p class="time"><?php echo(date("H:i", strtotime($entry['datetime']))); ?></p>
                        <div class="description">
                            <br>
                            <div class="activities">
                                <?php
                                foreach ($activity_ids as $activity_id){
                                    $activity_name = getActivityNameById($activity_id['id']);
                                    echo($activity_name . " ");
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
    </script>
</body>
</html>