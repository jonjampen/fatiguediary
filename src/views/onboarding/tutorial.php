<?php
print_head(array('<title>Onboarding | Fatigue Diary</title>'), false);
print_body_top_nav_only();
includeToastify();
?>

    <div class="onboarding-screen">
        <h2>Tutorial</h2>
        <img src="assets/img/illustrations/onboarding-tutorial.svg" alt="">
        <p><?php echo $text['tutorial-desc']; ?></p>
        <form action="<?php echo("index.php?page=set-settings&l=" . $_GET['l'] . "&t=" . $_GET['t'] . "&w=" . $_GET['w'] . "&b=" . $_GET['b'] . "&n=" . $_GET['n']); ?>" method="post">
            <div class="btn-option">
                <button class="btn-secondary" id="btn_next" type="submit" name="set-settings"><?php echo $text['start']; ?></button>
            </div>
        </form>
    </div>
</body>
</html>