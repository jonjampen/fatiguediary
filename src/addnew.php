<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add New</title>
</head>
<body onload="loadActivities()">
    <div class="add-screen">
        <h2>Eintrag hinzufügen</h2>

        <form action="index.php?page=add-new" method="post">
            <div class="datetime">
                <div><span class="material-icons">calendar_month</span> <input type="date" name="date" id="currentDate"></div>
            
                <div><span class="material-icons">schedule</span> <input type="time" name="time" id="currentTime"></div>
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
                <input type="hidden" name="activities" id="post_activities">
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
                    <button class="btn-primary" name="add-activity" id="modalClose add_activity_btn" onclick="addActivity()">Hinzufügen</button>
                    <button class="btn-secondary" type="reset" id="modalClose">Abbrechen</button>
                </div>
            </div>
        </div>
    </div>
        
</body>

<script src="assets/js/visualizeValue.js"></script>
<script>
    var modalClose = document.getElementById("modalClose");

    function loadActivities() {
        var xmlhttp2 = new XMLHttpRequest();
        xmlhttp2.onreadystatechange=function() {
            if (this.readyState==4 && this.status==200) {
                document.getElementById("activities").innerHTML=this.responseText;            
                var modalOpen = document.getElementById("modalOpen");
                modalOpen.addEventListener('click', openModal, false);
            }
        };
        xmlhttp2.open("GET", "app/controllers/display-activities.php", true);
        xmlhttp2.send();
    }

    //add activity
    var activity_name = document.getElementById("activity_name");
    var add_activity_btn = document.getElementById("add_activity_btn");
    function addActivity() {
        //close modal
        modal.style.display = "none";
        
        //add activity using ajax
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "app/controllers/add-activity.php?activity_name=" + activity_name.value, true);
        xmlhttp.send();
        loadActivities();
        setTimeout(loadActivities, 500);
        setTimeout(loadActivities, 2000);
    }



    //open/close modal
    var modal = document.getElementById("modal");

    // var modalClose = document.getElementById("modalClose");
    // modalClose.addEventListener('click', closeModal, false);
    
    function openModal() {
        modal.style.display = "block";
    }
    function closeModal() {
        modal.style.display = "none";
    }
</script>
</html>