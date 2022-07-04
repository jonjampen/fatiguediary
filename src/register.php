<?php
    //fill in name and email after error
    isset($_GET['name']) ? $name = $_GET['name'] : $name = '';
    isset($_GET['email']) ? $email = $_GET['email'] : $email = '';
    
    print_head(array('<title>Registrieren | Fatigue Diary</title>'), false);
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
                <input type="text" name="name" placeholder="Name eingeben..." value="<?php echo($name); ?>">

                <label for="email">E-Mail</label>
                <input type="email" name="email" placeholder="E-Mail-Adresse eingeben..." value="<?php echo($email); ?>">

                <label for="password">Passwort</label>
                <input type="password" name="password" placeholder="Passwort wählen...">

                <label for="passwordConf">Passwort wiederholen</label>
                <input type="password" name="passwordConf" placeholder="Passwort erneut eingeben...">

                <input type="checkbox" name="remember" checked class="check">
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