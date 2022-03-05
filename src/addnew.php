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
    <div class="add-container">
        <h2 class="form-title">Eintrag hinzufügen</h2>
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

        <div class="add-form">
            <form action="index.php?page=add-new" method="post">
                <div class="datetime">
                    <div><i class="fa-solid fa-calendar-days"></i> <input type="date" name="date" id="currentDate" <?php echo("value= '" . $date . "'"); ?>></div>
                
                    <div><i class="fa-solid fa-clock"></i> <input type="time" name="time" id="currentTime" <?php echo("value= '" . $time . "'"); ?>></div>
                </div>
                <div class="add-section">
                    <div class="title">
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

                <div class="add-section">
                    <div class="title">
                        <h3>Aktivitäten</h3>
                        <i class="fa-solid fa-pencil"></i>
                    </div>
                    <div class="activities">
                        <a href="#" class="activity">Relax</a>
                        <a href="#" class="activity">School</a>
                        <a href="#" class="activity">Therapy</a>
                        <a href="#" class="activity">Relax</a>
                        <a href="#" class="activity">School</a>
                        <a href="#" class="activity">Therapy</a>
                        <a href="#" class="activity">Relax</a>
                        <a href="#" class="activity">School</a>
                        <a href="#" class="activity">Therapy</a>
                        
                        <a href="#" class="activity add"><i class="fa-solid fa-plus fa-2x"></i></a>
                    </div>
                </div>
                <textarea name="notes" id="notes" rows="6" placeholder="Notizen..."><?php echo($notes); ?></textarea>
        
                <button type="submit" name="add-energy">Hinzufügen</button>

            </form>
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
</script>

</html>