<?php
print_head(array('<title>Onboarding | Fatigue Diary</title>'), false);
print_body();
includeToastify();
?>

    <div class="onboarding-screen">
        <h2>Tutorial</h2>
        <img src="assets/img/onboarding-tutorial.svg" alt="">
        <p>Du kannst diese Tour jederzeit wiederholen, gehe dazu einfach im Seiten-Menu auf "Tour starten".</p>
        <form action="<?php echo("index.php?page=set-settings&t=" . $_GET['t'] . "&w=" . $_GET['w'] . "&b=" . $_GET['b'] . "&n=" . $_GET['n']); ?>" method="post">
            <div class="btn-option">
                <button class="btn-secondary" id="btn_next" type="submit" name="set-settings">Start</button>
            </div>
        </form>
    </div>
</body>
</html>