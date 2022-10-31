<?php

    print_head(array('<title>Passwort zurücksetzen | Fatigue Diary</title>'), false);
    print_body();
    includeToastify();

    if (!isset($_GET['token'])):
?>

    <div class="container">
        <h2 class="container-title"><?php echo $text['reset-pw']; ?></h2>
        
        

        <form class="form" action="index.php?page=users" method="post">
            <div class="inputs">
                <label for="email"><?php echo $text['email']; ?></label>
                <input type="email" name="email" placeholder="<?php echo $text['enter-email']; ?>">
            </div>

            <div class="btn-center">
                <button class="btn-primary" type="submit" name="reset-password-send"><?php echo $text['reset-pw']; ?></button>
            </div>
        </form>
    </div>

<?php else: ?>
    <div class="container">
        <h2 class="container-title"><?php echo $text['change-pw']; ?></h2>
        
        

        <form class="form" action="index.php?page=users" method="post">
            <input type="hidden" name="token" value="<?php echo $_GET['token']; ?>">
            <label for="password"><?php echo $text['new-pw']; ?></label>
            <input type="password" name="password" placeholder="<?php echo $text['enter-new-pw']; ?>">

            <label for="passwordConf"><?php echo $text['repeat-pw']; ?></label>
            <input type="password" name="passwordConf" placeholder="<?php echo $text['enter-repeat-pw']; ?>">

            <div class="btn-center">
                <button class="btn-primary" type="submit" name="reset-password"><?php echo $text['change-pw']; ?></button>
            </div>
        </form>
    </div>
<?php endif;?>

</body>
</html>