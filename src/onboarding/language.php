<?php
print_head(array('<title>Onboarding | Fatigue Diary</title>'), false);
print_body_top_nav_only();
includeToastify();
?>

    <div class="onboarding-screen">
        <h2><?php echo $text['welcome']; ?></h2>
        <h3><?php echo $text['thank-you-register']; ?></h3>
        <img src="assets/img/onboarding-language.svg" alt="">
        <p><?php echo $text['language-question']; ?></p>
        <div class="btn-option">
            <?php if ($_SESSION['settings']['language'] == 'en'): ?>
                <button class="btn-primary outline" id="btn1">Deutsch</button>
                <button class="btn-primary" id="btn2">English</button>
            <?php else: ?>
                <button class="btn-primary" id="btn1">Deutsch</button>
                <button class="btn-primary outline" id="btn2">English</button>
            <?php endif; ?>
            </div>
        <div class="btn-option">
            <button class="btn-secondary" id="btn_next"><?php echo $text['next']; ?></button>
        </div>
    </div>


    <script>
        var btn1 = document.getElementById("btn1");
        var btn2 = document.getElementById("btn2");
        var btn_next = document.getElementById("btn_next");
        var lang = "<?php echo $_SESSION['settings']['language']; ?>";

        btn1.addEventListener("click", function() { changeOption(1)});
        btn2.addEventListener("click", function() { changeOption(2)});

        btn_next.addEventListener("click", function() { redirect() });

        function changeOption(option) {
            if (option === 1) {
                btn1.classList.remove("outline");
                btn2.classList.add("outline");
                lang = "de";
            } else if (option === 2) {
                btn2.classList.remove("outline");
                btn1.classList.add("outline");
                lang = "en";
            }
        }

        function redirect() {
            window.location.href = "index.php?page=onboarding01&l=" + lang;
        }
    </script>
</body>
</html>