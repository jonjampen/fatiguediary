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
    <button class="btn-primary" style="width:auto" name="add-activity" id="installApp" onclick="installPWA(false);"><?php echo $text['install-rest']; ?></button>
    <br>
    <br>
    <h3><?php echo $text['install-other']; ?></h3>
    <p><?php echo $text['install-safari']; ?></p>
    <br>
    <p><?php echo $text['install-firefox']; ?></p>
    <br>

</div>