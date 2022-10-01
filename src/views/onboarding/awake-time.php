<?php
print_head(array('<title>Onboarding | Fatigue Diary</title>'), false);
print_body_top_nav_only();
includeToastify();
?>

    <div class="onboarding-screen">
        <h2><?php echo $text['awake-time']; ?></h2>
        <img src="assets/img/onboarding-awake.svg" alt="">
        <p><?php echo $text['awake-question']; ?></p>
        <div class="btn-option">
            <input type="time" name="" id="wake_up" value="06:00">
            -
            <input type="time" name="" id="bed" value="22:30">
        </div>
        <p><?php echo $text['awake-desc']; ?></p>
        <div class="btn-option">
            <button class="btn-secondary" id="btn_next"><?php echo $text['next']; ?></button>
        </div>
    </div>


    <script>
        var btn_next = document.getElementById("btn_next");
        var lang = "<?php echo $_GET['l']; ?>";
        var theme = <?php echo($_GET['t']); ?>;
        var wake_up_time  = "06:00";
        var bed_time  = "22:30";

        btn_next.addEventListener("click", function() { redirect() });

        function redirect() {
            wake_up_time = wake_up.value;
            bed_time = bed.value;
            window.location.href = "index.php?page=onboarding03&l=" + lang + "&t=" + theme + "&w=" + wake_up_time + "&b=" + bed_time;
        }
    </script>
</body>
</html>