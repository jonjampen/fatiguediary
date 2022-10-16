<?php
print_head(array('<title>Install Fatigue Diary</title>'), false);
print_body();
includeToastify();
?>

<div class="install-screen" style="text-align: justify;">
    <h2><?php echo $text['install-fd']; ?></h2>
    <p id="install-tutorial"></p>
    <!-- <p><button class="btn-primary" style="width:auto" name="add-activity" id="installApp" onclick="installPWA(true);">Chrome/Edge/Opera Install</button></p> -->
    <br>
    <p>Safari/Firefox: Klicke auf die drei Punkte unten rechts und klicke auf Installieren.</p>
    <!-- <p><?php //echo $text['install-text']; ?></p> -->

</div>
<script>
    var isEventSupported = (function(){
    var TAGNAMES = {
        'select':'input','change':'input',
        'submit':'form','reset':'form',
        'error':'img','load':'img','abort':'img'
    }
    function isEventSupported(eventName) {
        var el = document.createElement(TAGNAMES[eventName] || 'div');
        eventName = 'on' + eventName;
        var isSupported = (eventName in el);
        if (!isSupported) {
            el.setAttribute(eventName, 'return;');
            isSupported = typeof el[eventName] == 'function';
        }
        el = null;
        return isSupported;
    }
    return isEventSupported;
    })();


    // if (isEventSupported('BeforeInstallPromptEvent')) {
    if ("beforeinstallprompt" in window) {
        tutorial = '<button class="btn-primary" name="add-activity" id="installApp" onclick="installPWA(true);"><?php echo $text["install"]; ?></button>';
    }
    else {
        tutorial = 'Klicke auf die drei Punkte unten rechts und klicke auf Installieren.';
    }

    document.getElementById('install-tutorial').innerHTML = tutorial;
</script>