<?php
print_head(array());
print_body("loadActivities()");
?>
    <div class="add-screen">
        <h2>Eintrag hinzufügen</h2>

        <form action="index.php?page=add-new" method="post">
            <div class="datetime">
                <div><span class="material-icons">calendar_month</span> <input type="date" name="date" id="currentDate" onchange="stopUpdatingDate()"></div>
            
                <div><span class="material-icons">schedule</span> <input type="time" name="time" id="currentTime" onchange="stopUpdatingTime()"></div>
            </div>
            <div class="container">
                <div class="title-info">
                    <h3>Energie-Level</h3>
                    <i class="fa-solid fa-circle-info"></i>
                </div>
                <input class="slider" id="energySlider" type="range" name="energylevel" min="0" max="10" step="0.5">
                <div class="description">
                    <h1 id="energyValue" class="level-text"></h1>
                    <h1 id="energyIcon"></h1>
                </div>
            </div>

            <div class="container">
                <div class="title-info">
                    <h3>Aktivitäten</h3>
                    <i class="fa-solid fa-pencil"></i>
                </div>
                <div class="activities" id="activities">
                    <?php //include("app/controllers/display-activities.php"); ?>
                    <!-- code from ajax -->
                </div>
                <input type="hidden" name="activities" id="activities_storage">
            </div>

            <div class="container">
                <textarea name="notes" id="notes" rows="6" placeholder="Notizen..."></textarea>
            </div>

            <div class="btn-center">
                <button class="btn-primary" type="submit" name="add-energy">Hinzufügen</button>
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
<script src="assets/js/visualizeValue.js"></script>
<script src="assets/js/calculateDateTime.js"></script>
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

    //update date&time every minute
    calculateDateTime();
    setInterval(calculateDateTime, 60000);


    var selected_activities = [];
    var activities_storage = document.getElementById("activities_storage");

    function toggleActivity(id) {
        if (selected_activities.includes(id)) {
            index = selected_activities.indexOf(id);
            selected_activities.splice(index, 1); //removes from array
        } else {
            selected_activities.push(id); //adds to array
        }
        //change style
        var activity = document.getElementById("toggleActivity_" + id);
        activity.classList.toggle("active");
        
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