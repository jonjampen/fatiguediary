<?php
if (isset($_GET['name'])) {
    $name = $_GET['name'];
    $email = $_GET['email'];
} else {
    $name = '';
    $email = '';
}
?>

<?php
print_head(array());
print_body();
?>
    <div class="container">
        <h2>Registrieren</h2>

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

        <form action="index.php?page=users" method="post">
            <div class="inputs">
                <label for="name">Name</label>
                <input type="text" name="name" placeholder="Name eingeben..." <?php echo("value= '" . $name . "'"); ?>>

                <label for="email">E-Mail</label>
                <input type="email" name="email" placeholder="E-Mail-Adresse eingeben..." <?php echo("value= '" . $email . "'"); ?>>

                <label for="password">Passwort</label>
                <input type="password" name="password" placeholder="Passwort eingeben...">

                <label for="passwordConf">Passwort wiederholen</label>
                <input type="password" name="passwordConf" placeholder="Passwort erneut eingeben...">

                <!-- TODO: remember me   -->
                <input type="checkbox" name="remember" id="remember" checked class="check">
                <label for="remember"> Eingeloggt bleiben</label>
            </div>

            <div class="btn-center">
                <button class="btn-primary" type="submit" name="register">Register</button>
            </div>
        </form>
        
        <p class="other-option-link">Bereits einen Account? <a href="index.php?page=login">Jetzt anmelden</a></p>
        
    </div>
</body>
</html>