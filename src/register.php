<?php
if (isset($_GET['name'])) {
    $name = $_GET['name'];
    $email = $_GET['email'];
} else {
    $name = '';
    $email = '';
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
</head>
<body>
    <div class="container">
        <h2 class="container-title">Registrieren</h2>
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

        <div class="form">
            <form action="index.php?page=users" method="post">
                <label for="name">Name</label>
                <input type="text" name="name" placeholder="Name eingeben..." <?php echo("value= '" . $name . "'"); ?>>

                <label for="email">E-Mail</label>
                <input type="email" name="email" placeholder="E-Mail-Adresse eingeben..." <?php echo("value= '" . $email . "'"); ?>>

                <label for="password">Passwort</label>
                <input type="password" name="password" placeholder="Passwort eingeben...">

                <label for="passwordConf">Passwort wiederholen</label>
                <input type="password" name="passwordConf" placeholder="Passwort erneut eingeben...">

                <div class="btn-center">
                    <button class="btn-primary" type="submit" name="register">Register</button>
                </div>

                <p class="other-option-link">Bereits einen Account? <a href="index.php?page=login">Jetzt anmelden</a></p>
            </form>
        </div>
        
    </div>
</body>
</html>