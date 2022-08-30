<?php
    print_head(array('<title>Fatigue Diary</title>', '<link rel="stylesheet" href="assets/carousel/glide.core.min.css">', '<link rel="stylesheet" href="assets/carousel/glide.theme.css">'), true);
    
    print_public_body();
?>
<section class="top">
    <div class="left">
        <h1>Eine Web-App, die dir mit deiner Fatigue hilft.</h1>
        <h4>Wenn du an chronischer Fatigue (ME/CFS, Long COVID) leidest, kann dich diese Web-App in deinem Alltag unterstützen.</h4>
        <button class="btn-secondary" onclick="window.location.href='index.php?page=register'">Gratis Registrieren</button>
    </div>
    <img src="assets/img/screenshots/screenshot.svg" alt="">
</section>

<section class="features">
    <h2>Features</h2>
    <div class="containers">
        <div class="feature">
            <h3 class="title">Aktivitäten Tracken</h3>
            <div class="icon"><span class="material-icons">directions_walk</span></div>
            <p>Trage ein, wann du welche Aktivitäten gemacht hast und wie du dich danach fühlst. Dies kann dir mit Pacing sehr helfen.</p>
        </div>
        <div class="feature">
            <h3 class="title">Pacing</h3>
            <div class="icon"><span class="material-icons">bed</span></div>
            <p>Pacing ist extrem wichtig. Lerne also deinen Körper besser kennen und bemerke, wann du eine Pause brauchst. Dabei unterstützt dich Fatigue Diary.</p>
        </div>
        <div class="feature">
            <h3 class="title">Analyse</h3>
            <div class="icon"><span class="material-icons">insights</span></div>
            <p>Alle Daten, die du einträgst, werden dir in verschiedensten Diagrammen dargestellt und analysiert. <br>Vergleiche verschiedene Tage, Wochen oder Monate miteinander oder sehe, welche Aktivitäten deine Fatigue verschlechtern.</p>
        </div>
    </div>
</section>

<section class="screenshots">
    <h2>Screenshots</h2>
    <div class="glide">
        <div class="glide__arrows" data-glide-el="controls">
            <button class="glide__arrow glide__arrow--left" data-glide-dir="<">
                <
            </button>
        </div>
        <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
                <li class="glide__slide"><img src="assets/img/screenshots/screenshot.svg" alt=""></li>
                <li class="glide__slide"><img src="assets/img/screenshots/screenshot.svg" alt=""></li>
                <li class="glide__slide"><img src="assets/img/screenshots/screenshot.svg" alt=""></li>
                <li class="glide__slide"><img src="assets/img/screenshots/screenshot.svg" alt=""></li>
                <li class="glide__slide"><img src="assets/img/screenshots/screenshot.svg" alt=""></li>
                <li class="glide__slide"><img src="assets/img/screenshots/screenshot.svg" alt=""></li>
                <li class="glide__slide"><img src="assets/img/screenshots/screenshot.svg" alt=""></li>
                <li class="glide__slide"><img src="assets/img/screenshots/screenshot.svg" alt=""></li>
            </ul>
        </div>
        <div class="glide__arrows" data-glide-el="controls">
          <button class="glide__arrow glide__arrow--right" data-glide-dir=">">
            >
          </button>
        </div>
    </div>
</section>

<script src="assets/carousel/glide.min.js"></script>

<script>
  var glide = new Glide('.glide', {
    type: 'carousel',
    startAt: 1,
    focusAt: 'center',
    autoplay: 3000,
    perView: 4,
  });

  glide.mount();
  
</script>
</body>
