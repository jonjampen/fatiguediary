<?php
if (isset($_GET['email'])) {
    $email = $_GET['email'];
} else {
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
        <h2 class="container-title">Anmelden</h2>
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
            <label for="email">E-Mail</label>
            <input type="email" name="email" placeholder="E-Mail-Adresse eingeben..." <?php echo("value= '" . $email . "'"); ?>>

            <label for="password">Passwort</label>
            <input type="password" name="password" placeholder="Passwort eingeben...">

            <div class="btn-center">
                <button class="btn-primary" type="submit" name="login">Anmelden</button>
            </div>

            <p class="other-option-link">Noch keinen Account? <a href="index.php?page=register">Jetzt registrieren</a></p>
        </form>
        
    </div>
</body>
</html>