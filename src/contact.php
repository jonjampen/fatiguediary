<?php
    print_head(array('<title>Contact | Fatigue Diary</title>'), true);
?>
<body>
<?php include("app/includes/publicNavbar.php"); ?>
    
    <div class="contact">
        <form action="index.php?page=mail" method="POST">
            <input type="email" name="email" id="">
            <input type="text" name="name" id="">
            <input type="text" name="subject" id="">
            <textarea name="message" id="" cols="30" rows="10"></textarea>
            <button type="submit" name="send-contact-mail">Senden</button>
        </form>
    </div>

</body>
<script src="assets/languages/de.js"></script>
<script src="assets/languages/en.js"></script>
<script src="assets/js/language-manager.js"></script>
</html>