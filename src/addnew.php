<?php
if (isset($_GET['energy'])) {
    $date = $_GET['date'];
    $time = $_GET['time'];
    $energy = $_GET['energy'];
    $notes = $_GET['notes'];
} else {
    $date = '';
    $time = '';
    $energy = 5;
    $notes = '';
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add New</title>
</head>
<body>
    <div class="add-screen">
        <h2>Eintrag hinzufügen</h2>
        <br>
        <?php if (isset($_SESSION['errors'])): ?>
            <div class="error">
                <ul>
                    <?php foreach($_SESSION['errors'] as $error): ?>
                        <li><?php echo($error); ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
            <br>
        <?php endif; ?>

        <form action="index.php?page=add-new" method="post">
            <div class="datetime">
                <div><span class="material-icons">schedule</span> <input type="date" name="date" id="currentDate" <?php echo("value= '" . $date . "'"); ?>></div>
            
                <div><span class="material-icons">calendar_month</span> <input type="time" name="time" id="currentTime" <?php echo("value= '" . $time . "'"); ?>></div>
            </div>
            <div class="container">
                <div class="title-info">
                    <h3>Energie-Level</h3>
                    <i class="fa-solid fa-circle-info"></i>
                </div>
                <input class="slider" id="energySlider" type="range" name="energylevel" min="0" max="10" <?php echo("value= '" . $energy . "'"); ?> step="0.5">
                <div class="description">
                    <h1 id="energyValue" class="level-text"></h1>
                    <h1 id="energyIcon"></h1>
                    <!-- <h3 class="level-text">eher hoch</h3>                         -->
                </div>
            </div>

            <div class="container">
                <div class="title-info">
                    <h3>Aktivitäten</h3>
                    <i class="fa-solid fa-pencil"></i>
                </div>
                <div class="activities">
                    <a href="#" class="activity">Relax</a>
                    <a href="#" class="activity">School</a>
                    <a href="#" class="activity">Listening to music</a>
                    <a href="#" class="activity">Relax</a>
                    <a href="#" class="activity">School</a>
                    <a href="#" class="activity">Therapy</a>
                    <a href="#" class="activity">Relax</a>
                    <a href="#" class="activity">School</a>
                    <a href="#" class="activity">Therapy</a>
                    
                    <a href="#" class="activity add"  id="modalOpen"><span class="material-icons">add</span></a>
                </div>
            </div>

            <div class="container break">
                <textarea name="notes" id="notes" rows="6" placeholder="Notizen..."><?php echo($notes); ?></textarea>
            </div>

            <div class="btn-center break">
                <button class="btn-primary" type="submit" name="add-energy">Hinzufügen</button>
            </div>
        </form>

        <div class="modal-box" id="modal">
            <div class="container">
                <h3>Neue Aktivität hinzufügen</h3>
                <form action="index.php?page=add-new" method="get">
                    <input type="text" name="activity" id="" placeholder="Aktivität eingeben...">
                    <div class="modal-buttons">
                        <button class="btn-primary" type="submit" name="add-activity">Hinzufügen</button>
                        <button class="btn-secondary" type="reset" id="modalClose">Abbrechen</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
        
</body>

<script src="assets/js/visualizeValue.js"></script>
<script>
    <?php if (!isset($_GET['energy'])) : ?>
        //calculate todays date and time
        var today = new Date();
        //consider timezone offset
        today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
        var date = today.toISOString().substring(0,10);
        var time = today.toISOString().substring(11,16);
        document.getElementById("currentDate").value = date;
        document.getElementById("currentTime").value = time;
    <?php endif; ?>

    var energySlider = document.getElementById("energySlider");
    var energyValue = document.getElementById("energyValue");
    var energyIcon = document.getElementById("energyIcon");
    var notes = document.getElementById("notes");
    var date = document.getElementById("currentDate");
    var time = document.getElementById("currentTime");

    //display first slider value, emoji and color
    energyValue.innerHTML = energySlider.value;
    calculateEmoji(energySlider.value, energyIcon);
    calculateColor(energySlider.value, energyValue);

    energySlider.addEventListener('input', writeValue, false);
    notes.addEventListener('input', addToUrl, false);
    date.addEventListener('input', addToUrl, false);
    time.addEventListener('input', addToUrl, false);
    
    //update slider
    function writeValue() {
        energyValue.innerHTML = energySlider.value;
        calculateEmoji(energySlider.value, energyIcon);
        calculateColor(energySlider.value, energyValue);
        //add energylevel to url
        addToUrl();
    }

    //add notes to url
    function addToUrl() {
        window.history.pushState({urlPath:'index.php'}, "", '?page=add-new&date=' + date.value + '&time=' + time.value + '&energy=' + energySlider.value + '&notes=' + notes.value);
    }



    //open/close modal
    var modal = document.getElementById("modal");

    var modalOpen = document.getElementById("modalOpen");
    modalOpen.addEventListener('click', openModal, false);

    var modalClose = document.getElementById("modalClose");
    modalClose.addEventListener('click', closeModal, false);
    
    function openModal() {
        modal.style.display = "block";
    }
    function closeModal() {
        modal.style.display = "none";
    }
</script>

</html>