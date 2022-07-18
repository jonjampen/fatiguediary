<?php
    print_head(array('<title>Einstellungen | Fatigue Diary</title>'), false);
    print_body();
    includeToastify();
    ?>

    <div class="settings-screen">
        <h2>Einstellungen</h2>
        <div class="setting">
            <div class="text">
                <p>Modus:</p>
            </div>
            <div class="btn-option">
                <button class="btn-primary <?php if($_SESSION['settings']['theme'] == 1) {echo("outline");} ?>" id="btn1">Dunkel</button>
                <button class="btn-primary <?php if($_SESSION['settings']['theme'] == 0) {echo("outline");} ?>" id="btn2">Hell</button>
            </div>
        </div>
        <form action="<?php echo("index.php?page=set-settings"); ?>" method="post">
            <input type="hidden" name="theme" id="theme_field" value="<?php echo($_SESSION['settings']['theme']); ?>">
            <div class="setting">
                <div class="text">
                    <p>Tageszeit:</p>
                </div>
                <div class="btn-option time">
                    <input type="time" name="wake_up_time" id="wake_up" value="<?php echo($_SESSION['settings']['wake_up_time']); ?>">
                    <input type="time" name="bed_time" id="bed" value="<?php echo($_SESSION['settings']['bed_time']); ?>">
                </div>
            </div>
            <div class="setting">
                <div class="text">
                    <p>Informationen per Mail:</p>
                </div>
                <div class="btn-option">
                    <input type="checkbox" name="newsletter" id="newsletter_check" <?php if($_SESSION['settings']['newsletter'] == 1) {echo("checked");} ?>>
                </div>
            </div>

            <div class="btn-center">
                <button type="submit" class="btn-secondary btn-fixed" name="set-settings">Speichern</button>
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