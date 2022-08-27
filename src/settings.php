<?php
    print_head(array('<title>Einstellungen | Fatigue Diary</title>'), false);
    print_body();
    includeToastify();
    ?>

    <div class="settings-screen">
        <h2><?php echo $text['settings']; ?></h2>
        <div class="setting">
            <div class="text">
                <p><?php echo $text['mode']; ?></p>
            </div>
            <div class="btn-option">
                <button class="btn-primary <?php if($_SESSION['settings']['theme'] == 1) {echo("outline");} ?>" id="btn1"><?php echo $text['dark']; ?></button>
                <button class="btn-primary <?php if($_SESSION['settings']['theme'] == 0) {echo("outline");} ?>" id="btn2"><?php echo $text['light']; ?></button>
            </div>
        </div>
        <form action="<?php echo("index.php?page=set-settings"); ?>" method="post">
            <input type="hidden" name="theme" id="theme_field" value="<?php echo($_SESSION['settings']['theme']); ?>">
            <div class="setting">
                <div class="text">
                    <p><?php echo $text['awake-time']; ?></p>
                </div>
                <div class="btn-option time">
                    <input type="time" name="wake_up_time" id="wake_up" value="<?php echo($_SESSION['settings']['wake_up_time']); ?>">
                    <input type="time" name="bed_time" id="bed" value="<?php echo($_SESSION['settings']['bed_time']); ?>">
                </div>
            </div>
            <div class="setting">
                <div class="text">
                    <p><?php echo $text['information-mail']; ?></p>
                </div>
                <div class="btn-option">
                    <input type="checkbox" name="newsletter" id="newsletter_check" <?php if($_SESSION['settings']['newsletter'] == 1) {echo("checked");} ?>>
                </div>
            </div>

            <div class="btn-center">
                <button type="submit" class="btn-secondary btn-fixed" name="set-settings"><?php echo $text['save']; ?></button>
            </div>
        </form>
    </div>


    <script>
        // Theme
        var btn1 = document.getElementById("btn1");
        var btn2 = document.getElementById("btn2");
        btn1.addEventListener("click", function() { changeOption(1)});
        btn2.addEventListener("click", function() { changeOption(2)});
        theme_field = document.getElementById("theme_field");

        function changeOption(option) {
            if (option === 1) {
                btn1.classList.remove("outline");
                btn2.classList.add("outline");
                theme_field.value = 0;
            } else if (option === 2) {
                btn2.classList.remove("outline");
                btn1.classList.add("outline");
                theme_field.value = 1;
            }
        }

    </script>