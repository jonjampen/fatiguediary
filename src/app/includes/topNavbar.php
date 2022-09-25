<nav class="top-nav">
    <ul class="nav_items">
        <li class="logo"><a href="index.php?page=app"><img src="assets/img/logo.svg" alt=""></a></li>
        <div class="icons">
            <?php if(isset($_SESSION['id'])): ?>
                <li><a href="index.php?page=settings"><span class="material-icons">settings</span></a></li>
            <?php endif; ?>
            <li><a href="javascript:void(0)" onclick="openNav()"><span class="material-icons" id="open">menu</span></a> <a href="javascript:void(0)" onclick="closeNav()"><span class="material-icons" id="close">close</span></a></li>
        </div>
    </ul>
</nav>


<div class="sidenav" id="sidenav">
    <ul>
        <li><a href="index.php?page=app">Fatigue Diary</a></li>
        <li><a href="index.php?page=contact"><?php echo $text['contact']; ?></a></li>
        <li><a href="index.php?page=how"><?php echo $text['how-it-works']; ?></a></li>
        <li><a href="intro/<?php echo $_SESSION['settings']['language']; ?>/Dashboard.php"><?php echo $text['start-tutorial']; ?></a></li>
        <button class="btn-primary" name="add-activity" id="installApp" onclick="installPWA()"><?php echo $text['install']; ?></button>
        <?php if(isset($_SESSION['id'])): ?>
            <li><a href="index.php?page=logout" class="logout"><i class="fa-solid fa-arrow-right-from-bracket"></i> <?php echo $text['logout']; ?></a></li>
        <?php else: ?>
            <li></li>
            <li><a href="index.php?page=login"><?php echo $text['login']; ?></a></li>
            <li><button class="btn-secondary" onclick="window.location.href='index.php?page=register'"><?php echo $text['signup']; ?></button></li>
        <?php endif; ?>
    </ul>
</div>

<script>
function openNav() {
    document.getElementById("sidenav").style.display = "block";
    document.getElementById("open").style.display = "none";
    document.getElementById("close").style.display = "inline";
}

function closeNav() {
    document.getElementById("sidenav").style.display = "none";
    document.getElementById("open").style.display = "inline";
    document.getElementById("close").style.display = "none";
}

if ((window.matchMedia('(display-mode: standalone)').matches)) {
    document.getElementById("installApp").classList.add("hidden");
}
</script>