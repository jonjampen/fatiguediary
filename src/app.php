<?php
    print_head(array('<title>Fatigue Diary</title>'));
?>
<body class="public">
    <?php include("app/includes/publicNavbar.php"); ?>
    <section class="one left-right">
        <div class="text">
            <h1 id="title"></h1>
            <p id="title-desc"></p>
            <button class="btn-secondary" id="use-for-free"></button>
        </div>
        <img src="assets/img/screenshots/add.png" alt="">
    </section>
    
    
    <section class="two">
        <h2>Features</h2>
        <div class="features">
            <div class="container">
                <div class="icon"><span class="material-icons">menu_book</span></div>
                <h3 id="feature1-title"></h3>
                <p class="description" id="feature1-desc"></p>
            </div>
            <div class="container">
                <div class="icon"><span class="material-icons">query_stats</span></div>
                <h3 id="feature2-title"></h3>
                <p class="description" id="feature2-desc"></p>
            </div>
            <div class="container">
                <div class="icon"><span class="material-icons">lightbulb</span></div>
                <h3 id="feature3-title"></h3>
                <p class="description" id="feature3-desc"></p>
            </div>
        </div>
    </section>

    <section class="five left-right">
        <div class="text">
            <h2 style="color:white;" id="section5-title"></h2>
            <p style="color: white;" id="section5-desc"></p>
        </div>
        <img src="assets/img/avatar.svg" alt="">
    </section>

    <section class="footer">
        <p><a href="https://www.fatiguediary.ch/">www.fatiuediary.ch</a> | Developed by <a href="index.php?page=about">Jon Jampen</a></p>
    </section>
</body>
<script src="language.js"></script>
</html>