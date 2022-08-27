<?php
    //fill in name and email after error
    isset($_GET['name']) ? $name = $_GET['name'] : $name = '';
    isset($_GET['email']) ? $email = $_GET['email'] : $email = '';
    
    print_head(array('<title>Registrieren | Fatigue Diary</title>'), false);
    print_body();
    includeToastify();
?>

    <div class="container">
        <h2><?php echo $text['signup']; ?></h2>
        <form action="index.php?page=users" method="post">
            <div class="inputs">
                <label for="name"><?php echo $text['name']; ?></label>
                <input type="text" name="name" placeholder="<?php echo $text['enter-name']; ?>" value="<?php echo($name); ?>">

                <label for="email"><?php echo $text['email']; ?></label>
                <input type="email" name="email" placeholder="<?php echo $text['enter-email']; ?>" value="<?php echo($email); ?>">

                <label for="password"><?php echo $text['password']; ?></label>
                <input type="password" name="password" placeholder="<?php echo $text['enter-password']; ?>">

                <label for="passwordConf"><?php echo $text['repeat-pw']; ?></label>
                <input type="password" name="passwordConf" placeholder="<?php echo $text['enter-repeat-pw']; ?>">

                <input type="checkbox" name="remember" checked class="check">
                <label for="remember"> <?php echo $text['remember-me']; ?></label>
            </div>

            <div class="btn-center">
                <button class="btn-primary" type="submit" name="register"><?php echo $text['signup']; ?></button>
            </div>
        </form>
        
        <p class="other-option-link"><?php echo $text['already-registered']; ?> <a href="index.php?page=login"><?php echo $text['login-now']; ?></a></p>
        
    </div>
    
</body>
</html>