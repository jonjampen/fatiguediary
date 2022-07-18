<?php

    print_head(array('<title>Passwort zurücksetzen | Fatigue Diary</title>'), false);
    print_body();
    includeToastify();
?>

    <div class="container">
        <h2 class="container-title">Passwort Zurücksetzen</h2>
        
        

        <form class="form" action="index.php?page=users" method="post">
            <div class="inputs">
                <label for="email">E-Mail</label>
                <input type="email" name="email" placeholder="E-Mail-Adresse eingeben...">
            </div>

            <div class="btn-center">
                <button class="btn-primary" type="submit" name="reset-password">Passwort zurücksetzen</button>
            </div>
        </form>
    </div>

</body>
</html>