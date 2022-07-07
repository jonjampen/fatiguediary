<?php
print_head(array(
    '<script src="assets/js/visualizeValue.js"></script>',
    '<script src="assets/js/calculateDateTime.js"></script>',
    '<title>Eintrag Hinzufügen | Fatigue Diary</title>'), false);
    
$notes = "";

if(isset($_GET['id'])) {
    print_body("loadActivities();");
    $energylevel = getEnergyLevelsById($_GET['id']);
    $activities = [];
    $activities = getActivitiesByEnergyId($energylevel['energy_id']);
    $notes = $energylevel['notes'];
} else {
    print_body("loadActivities(), calculateDateTime(), setInterval(calculateDateTime, 10000)");
    $activities = [];
}
?>

    <div class="add-screen">
        <h2>Eintrag <?php if(isset($_GET['id'])){ echo("bearbeiten");} else{ echo("hinzufügen");} ?></h2>

        <?php if(isset($_GET['id'])){
            echo('<a href="index.php?page=add-new&id='. $_GET['id'] . '&delete=true"><span class="material-icons delete">delete</span></a>');
        }?>

        <form action="index.php?page=add-new<?php if(isset($_GET['id'])) { echo("&id=" . $_GET['id']); } ?>" method="post">
            <div class="datetime">
                <div><span class="material-icons">calendar_month</span> <input type="date" name="date" id="currentDate" onchange="stopUpdatingDate()" value="<?php echo(date("Y-m-d", strtotime($energylevel['datetime']))); ?>"></div>
                <div><span class="material-icons">schedule</span> <input type="time" name="time" id="currentTime" onchange="stopUpdatingTime()" value="<?php echo(date("H:i", strtotime($energylevel['datetime']))); ?>"></div>
            </div>

            <div class="container">
                <div class="title-info">
                    <h3>Energie-Level</h3>
                    <a href=""><span class="material-icons">question_mark</span></a>
                </div>
                <input class="slider" id="energySlider" type="range" name="energylevel" min="0" max="10" step="0.5" value="<?php echo($energylevel['energylevel']); ?>">
                <div class="description">
                    <h1 id="energyValue" class="level-text"></h1>
                    <h1 id="energyIcon"></h1>
                </div>
            </div>

            <div class="container">
                <div class="title-info">
                    <h3>Aktivitäten</h3>
                    <a href=""><span class="material-icons">question_mark</span></a>
                </div>
                <div class="activities" id="activities">
                    <!-- code from ajax -->
                </div>
                <?php
                $activities_string = "";
                foreach ($activities as $activity) {
                    $activities_string .= $activity['id'] . ",";
                }

                ?>
                <input type="hidden" name="activities" id="activities_storage" value="<?php echo($activities_string); ?>">
            </div>

            <div class="container">
                <textarea name="notes" id="notes" rows="6" placeholder="Notizen..." ><?php echo($notes); ?></textarea>
            </div>
            <div class="space">

            </div>
            <div class="btn-center">
                
                <button class="btn-secondary btn-fixed" type="submit" name="<?php if(isset($_GET['id'])){ echo("edit-energy");} else { echo("add-energy");} ?>"><?php if(isset($_GET['id'])){ echo("Änderungen Speichern");} else{ echo("Hinzufügen");} ?></button>
            </div>
        </form>

        <div class="modal-box" id="modal">
            <div class="container">
                <h3>Neue Aktivität hinzufügen</h3>

                <input type="text" name="activity_name" id="activity_name" placeholder="Aktivität eingeben..." value="">

                <div class="modal-buttons">
                    <button class="btn-primary" name="add-activity" id="add_activity_btn" onclick="addActivity()">Hinzufügen</button>
                    <button class="btn-secondary" type="reset" id="modalClose">Abbrechen</button>
                </div>
            </div>
        </div>
        
    </div>
    
</body>

<script src="assets/js/modal.js"></script>

<script>
    
    var activities = document.getElementById("activities");
    var activity_name = document.getElementById("activity_name");

    function loadActivities() {
        var xmlhttp2 = new XMLHttpRequest();
        xmlhttp2.onreadystatechange=function() {
            if (this.readyState==4 && this.status==200) {
                activities.innerHTML=this.responseText;            
                var modalOpen = document.getElementById("modalOpen");
                modalOpen.addEventListener('click', openModal, false);
                setSelectedActivities();
            }
        };
        xmlhttp2.open("GET", "app/controllers/display-activities.php?type=ajax", true);
        xmlhttp2.send();
    }

    function addActivity() {
        closeModal();

        //add activity using ajax
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "app/controllers/add-activity.php?activity_name=" + activity_name.value, true);
        xmlhttp.send();

        //display new activity
        setTimeout(loadActivities, 500); //reload if not ready
    }
    <?php //foreach ($selected_activities as $selected_activity) { $value[]= $selected_activity['id'];} echo(implode(",", $value));?>
    
    var activities_storage = document.getElementById("activities_storage");
    
    
    function setSelectedActivities() {
        var selected_activities = [<?php echo $activities_string; ?>];
        for (var i = 0; i < selected_activities.length; i++) {
            id = selected_activities[i];
            
            //change style
            let activity = document.getElementById("toggleActivity_" + id);
            activity.classList.add("active");
        }
    }
    
    var selected_activities = [<?php echo $activities_string; ?>];
    function toggleActivity(id) {
        if (selected_activities.includes(id)) {
            index = selected_activities.indexOf(id);
            selected_activities.splice(index, 1); //removes from array

            //change style
            let activity = document.getElementById("toggleActivity_" + id);
            activity.classList.remove("active");
        } else {
            selected_activities.push(id); //adds to array

            //change style
            let activity = document.getElementById("toggleActivity_" + id);
            activity.classList.add("active");
        }
        
        activities_storage.value = selected_activities;
    }

        
    // slider description
    var energySlider = document.getElementById("energySlider");
    var energyValue = document.getElementById("energyValue");
    var energyIcon = document.getElementById("energyIcon");

    //display initial slider value, emoji and color
    energyValue.innerHTML = energySlider.value;
    calculateEmoji(energySlider.value, energyIcon);
    calculateColor(energySlider.value, energyValue);

    energySlider.addEventListener('input', updateSliderDescription, false);

    function updateSliderDescription() {
        energyValue.innerHTML = energySlider.value;
        calculateEmoji(energySlider.value, energyIcon);
        calculateColor(energySlider.value, energyValue);
    }

</script>
</html>