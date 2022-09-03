<?php
    //fill in email after error
    isset($_GET['email']) ? $email = $_GET['email'] : $email = '';


    print_head(array('<title>Anmelden | Fatigue Diary</title>'), false);
    print_body_top_nav_only();
    includeToastify();
?>

    <div class="container">
        <h2 class="container-title"><?php echo $text['login']; ?></h2>
        
        

        <form class="form" action="index.php?page=users" method="post">
            <div class="inputs">
                <label for="email"><?php echo $text['email']; ?></label>
                <input type="email" name="email" placeholder="<?php echo $text['enter-email']; ?>" value="<?php echo($email); ?>">

                <label for="password"><?php echo $text['password']; ?></label>
                <input type="password" name="password" placeholder="<?php echo $text['enter-password']; ?>">

                <input type="checkbox" name="remember" checked class="check">
                <label for="remember"> <?php echo $text['remember-me']; ?></label>
            </div>

            <div class="btn-center">
                <button class="btn-primary" type="submit" name="login"><?php echo $text['login']; ?></button>
            </div>
            <a href="index.php?page=reset-password"><?php echo $text['forgot-password']; ?></a>
        </form>
        
        <p class="other-option-link"><?php echo $text['no-account']; ?> <a href="index.php?page=register"><?php echo $text['register-now']; ?></a></p>
    </div>

</body>
</html>