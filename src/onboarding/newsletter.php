<?php
print_head(array('<title>Onboarding | Fatigue Diary</title>'), false);
print_body();
includeToastify();
?>

    <div class="onboarding-screen">
        <h2>Informationen</h2>
        <img src="assets/img/onboarding-mail.svg" alt="">
        <p>Möchtest du über Neuigkeiten von Fatigue Diary informiert werden?</p>
        <div class="btn-option">
            <input type="checkbox" name="newsletter" id="newsletter_check" checked> <label for="newsletter"> Ich möchte Informationen erhalten.</label>
        </div>
        <div class="btn-option">
            <button class="btn-secondary" id="btn_next">Weiter</button>
        </div>
    </div>


    <script>
        var btn_next = document.getElementById("btn_next");
        var theme = <?php echo($_GET['t']); ?>;
        var wake_up_time  = "<?php echo($_GET['w']); ?>";
        var bed_time  = "<?php echo($_GET['b']); ?>";
        var newsletter = 1;
        var newsletter_check = document.getElementById("newsletter_check");

        btn_next.addEventListener("click", function() { redirect() });

        function redirect() {
            newsletter = newsletter_check.checked;
            if (newsletter) {
                newsletter = 1;
            } else {
                newsletter = 0;
            }
            window.location.href = "index.php?page=onboarding04&t=" + theme + "&w=" + wake_up_time + "&b=" + bed_time + "&n=" + newsletter;
        }
    </script>
</body>
</html>