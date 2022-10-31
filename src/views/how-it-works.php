<?php
print_head(array('<title>How it works | Fatigue Diary</title>'), false);
print_body();
includeToastify();
?>

<div class="how-screen">
    <h2><?php echo $text['how-it-works']; ?></h2>
    <div class="part">
        <h3>Fatigue Diary</h3>
        <p><?php echo $text['how-fd-text']; ?></p>
    </div>
    
    <div class="part">
        <h3><?php echo $text['how-avg-title']; ?></h3>
        <p><?php echo $text['how-avg-text']; ?></p>
        <div class="img-container">
            <img src="assets/img/charts/chart1.svg" alt="">
            <img src="assets/img/charts/chart2.svg" alt="">
        </div>
    </div>
    
    <div class="part">
        <h3><?php echo $text['how-activities-title']; ?></h3>
        <p><?php echo $text['how-activities-text']; ?></p>
    </div>
    
</div>