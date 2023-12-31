<?php
    print_head(array('<title>Fatigue Diary</title>'), true);
    if (isset($_GET['l'])) {
        $_SESSION['settings']['language'] = $_GET['l'];
    }
    print_public_body();
    updateLanguage();
?>
<section class="top">
    <div class="left">
        <h1><?php echo $text['info-title']; ?></h1>
        <h4><?php echo $text['info-description']; ?></h4>
        <!-- <button class="btn-secondary nav" id="installApp">Install</button> -->
        <button class="btn-primary" onclick="window.location.href='index.php?page=register'"><?php if(isset($_SESSION['id'])) {echo $text['to-the-app'];} else { echo $text['info-btn']; } ?></button>
    </div>
    <img src="assets/img/screenshots/dashboard_top.png" alt="">
</section>

<section class="features">
    <h2><?php echo $text['features']; ?></h2>
    <div class="containers">
        <div class="feature">
            <h3 class="title"><?php echo $text['track-activities']; ?></h3>
            <div class="icon"><span class="material-icons">directions_walk</span></div>
            <p><?php echo $text['track-desc']; ?></p>
        </div>
        <div class="feature">
            <h3 class="title"><?php echo $text['pacing']; ?></h3>
            <div class="icon"><span class="material-icons">bed</span></div>
            <p><?php echo $text['pacing-desc']; ?></p>
        </div>
        <div class="feature">
            <h3 class="title"><?php echo $text['analysis']; ?></h3>
            <div class="icon"><span class="material-icons">insights</span></div>
            <p><?php echo $text['analysis-desc']; ?></p>
        </div>
    </div>
</section>
<!-- 
<section class="screenshots">
    <h2><?php echo $text['screenshots']; ?></h2>
    
</section> -->

<section class="about">
    <div class="content">
        <div class="left">
            <h2 class="side-title"><?php echo $text['about-title']; ?></h2>
            <h4><?php echo $text['about-desc']; ?></h4>
        </div>
        <img src="assets/img/illustrations/avatar.svg" alt="">
    </div>
    <p>&copy;2023 <?php echo $text['copy']; ?></p>
</section>
<section class="footer">
</section>
<script>


const installApp = document.getElementById('installApp');

installApp.addEventListener('click', async () => {
    if (deferredPrompt !== null) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            deferredPrompt = null;
        }
    }
});
  
</script>
</body>
