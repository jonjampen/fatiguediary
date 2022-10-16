<?php
print_head(array('<title>Install Fatigue Diary</title>'), false);
print_body();
includeToastify();
?>

<div class="install-screen" style="text-align: justify;">
    <h2><?php echo $text['install-fd']; ?></h2>
    <img src="assets/img/news/pwa.svg" alt="">
    <br>
    <br>
    <button class="btn-primary" style="width:auto" name="add-activity" id="installApp" onclick="installPWA(false);">Chrome/Edge/Opera installieren</button>
    <br>
    <br>
    <h3>Für andere Browser:</h3>
    <p>Safari: Klicke auf <span class="material-icons">ios_share</span> und dann auf "Zum Home-Bildschirm" klicken.</p>
    <br>
    <p>Firefox: Klicke auf die drei Punkte unten rechts und anschliessend auf "Installieren".</p>
    <br>

</div>