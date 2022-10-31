<?php
    print_head(array('<title>Kontakt | Fatigue Diary</title>'), true);
?>
<body class="contact">
<?php include("views/includes/publicNavbar.php"); ?>
    <div class="block">
        <section>
            <div class="container form">
                <h2>Kontakt</h2>
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
                <img src="assets/img/illustrations/contact.svg" alt="">
                <div class="links">
                    <div class="contact-method"><span class="material-icons">email</span> <a href="mailto:info@fatiguediary.ch">info@fatiguediary.ch</a></div>
                    <div class="contact-method"><span class="material-icons">reviews</span> <a href="https://www.fatiguediary.ch/feedback/">Feedback Formular</a></div>
                    <div class="contact-method"><span class="material-icons">language</span> <a href="https://www.fatiguediary.ch/">www.fatiguediary.ch</a></div>
                </div>
            </div>
        </section>
    </div>
</body>
<script src="assets/languages/de.js"></script>
<script src="assets/languages/en.js"></script>
<script src="assets/js/language-manager.js"></script>
</html>