<?php
    print_head(array('<title>Contact | Fatigue Diary</title>'), true);
?>
<body class="contact">
<?php include("app/includes/publicNavbar.php"); ?>
    <section>
        <div class="container form">
            <form action="index.php?page=mail" method="POST">
                <label for="email">E-Mail</label>
                <input type="email" name="email" id="" placeholder="E-Mail">
                <label for="name">Name</label>
                <input type="text" name="name" id="" placeholder="Name">
                <label for="subject">Betreff</label>
                <input type="text" name="subject" id="" placeholder="Betreff">
                <label for="message">Nachricht</label>
                <textarea name="message" id="" cols="30" rows="10"></textarea>
                <div class="btn-center">
                    <button class="btn-primary" type="submit" name="send-contact-mail">Senden</button>
                </div>
            </form>
        </div>
        <div class="container info">
            <div class="links">
                <div class="icon"><span class="material-icons">alternate_email</span> <p>info@fatiguediary.ch</p></div>
                <div class="icon"><span class="material-icons">reviews</span> <p>Feedback Formular</p></div>
                <div class="icon"><span class="material-icons">language</span> <p>www.fatiguediary.ch</p></div>
            </div>
        </div>
    </section>

</body>
<script src="assets/languages/de.js"></script>
<script src="assets/languages/en.js"></script>
<script src="assets/js/language-manager.js"></script>
</html>