<?php

    print_head(array('<title>Passwort zurücksetzen | Fatigue Diary</title>'), false);
    print_body();
    includeToastify();

    if (!isset($_GET['token'])):
?>

    <div class="container">
        <h2 class="container-title">Passwort Zurücksetzen</h2>
        
        

        <form class="form" action="index.php?page=users" method="post">
            <div class="inputs">
                <label for="email">E-Mail</label>
                <input type="email" name="email" placeholder="E-Mail-Adresse eingeben...">
            </div>

            <div class="btn-center">
                <button class="btn-primary" type="submit" name="reset-password-send">Passwort zurücksetzen</button>
            </div>
        </form>
    </div>

<?php else: ?>
    <div class="container">
        <h2 class="container-title">Passwort Zurücksetzen</h2>
        
        

        <form class="form" action="index.php?page=users" method="post">
            <input type="hidden" name="token" value="<?php echo $_GET['token']; ?>">
            <label for="password">Neues Passwort</label>
            <input type="password" name="password" placeholder="Neues Passwort eingeben...">

            <label for="passwordConf">Passwort wiederholen</label>
            <input type="password" name="passwordConf" placeholder="Passwort erneut eingeben...">

            <div class="btn-center">
                <button class="btn-primary" type="submit" name="reset-password">Passwort zurücksetzen</button>
            </div>
        </form>
    </div>
<?php endif;?>

</body>
</html>