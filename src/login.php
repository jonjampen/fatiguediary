<?php
if (isset($_GET['email'])) {
    $email = $_GET['email'];
} else {
    $email = '';
}
?>

<?php
print_head(array(), false);
print_body();
?>

    <div class="container">
        <h2 class="container-title">Anmelden</h2>
        
        <!-- Errors -->
        <?php if (isset($_SESSION['errors'])): ?>
            <div class="error">
                <ul>
                    <?php foreach($_SESSION['errors'] as $error): ?>
                        <li><?php echo($error); ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
            <br>
        <?php endif; ?>

        <form class="form" action="index.php?page=users" method="post">
            <div class="inputs">
                <label for="email">E-Mail</label>
                <input type="email" name="email" placeholder="E-Mail-Adresse eingeben..." <?php echo("value= '" . $email . "'"); ?>>

                <label for="password">Passwort</label>
                <input type="password" name="password" placeholder="Passwort eingeben...">

                <input type="checkbox" name="remember" checked class="check">
                <label for="remember"> Eingeloggt bleiben</label>
            </div>

            <div class="btn-center">
                <button class="btn-primary" type="submit" name="login">Anmelden</button>
            </div>
        </form>
        
        <p class="other-option-link">Noch keinen Account? <a href="index.php?page=register">Jetzt registrieren</a></p>
    </div>

</body>
</html>