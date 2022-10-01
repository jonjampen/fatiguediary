<?php
print_head(array('<title>Install Fatigue Diary</title>'), false);
print_body();
includeToastify();
?>

<div class="install-screen" style="text-align: justify;">
    <h2><?php echo $text['install-fd']; ?></h2>
    <button class="btn-primary" name="add-activity" id="installApp" onclick="installPWA(true);"><?php echo $text['install']; ?></button>
    <p><?php echo $text['install-text']; ?></p>

</div>