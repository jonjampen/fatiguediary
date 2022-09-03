<nav class="desktop-nav">
    <ul>
        <div class="left">
            <li class="logo"><a href="index.php?page=app"><img src="assets/img/logo.svg" alt=""></a></li>
        </div>
        <div class="language">
            <li <?php if ($_SESSION['settings']['language'] == 'en') { echo ('class="active"');} ?> id="en">EN</li>
            <li>&nbsp; | &nbsp;</li>
            <li <?php if ($_SESSION['settings']['language'] == 'de') { echo ('class="active"');} ?> id="de">DE</li>
            </div>
        <div class="right">
            <li><a href="index.php?page=app" id="nav-app">Fatigue Diary</a></li>
            <li><a href="index.php?page=contact" id="nav-contact"><?php echo $text['contact']; ?></a></li>
            <?php if(isset($_SESSION['id'])): ?>
                <button class="btn-primary" id="nav-signup"onclick="location.href='index.php?page=register'"><?php echo $text['to-the-app']; ?></button>
            <?php else: ?>
                <li><a href="index.php?page=login" id="nav-login"><?php echo $text['login']; ?></a></li>
                <button class="btn-primary" id="nav-signup"onclick="location.href='index.php?page=register'"><?php echo $text['signup']; ?></button>
            <?php endif; ?>
        </div>
    </ul>
</nav>

<div class="mobile-nav">
    <nav>
        <ul class="nav_items">
            <li class="logo"><a href="index.php?page=app"><img src="assets/img/logo.svg" alt=""></a></li>
            <div class="language">
                <li class="active" id="en_mobile">EN</li>
                <li>&nbsp; | &nbsp;</li>
                <li id="de_mobile">DE</li>
            </div>
            <li><a href="javascript:void(0)" onclick="openNav()"><span class="material-icons" id="open">menu</span></i></a> <a href="javascript:void(0)" onclick="closeNav()"><span class="material-icons" id="close">close</span></a></li>
        </ul>
    </nav>

    <div class="sidenav" id="sidenav">
        <ul>
            <li><a href="index.php?page=app" id="nav-app">Fatigue Diary</a></li>
            <li><a href="index.php?page=contact" id="nav-contact"><?php echo $text['contact']; ?></a></li>
            <?php if(isset($_SESSION['id'])): ?>
                <button class="btn-primary" id="nav-signup"onclick="location.href='index.php?page=register'"><?php echo $text['to-the-app']; ?></button>
            <?php else: ?>
                <li><a href="index.php?page=login" id="nav-login"><?php echo $text['login']; ?></a></li>
                <button class="btn-primary" id="nav-signup"onclick="location.href='index.php?page=register'"><?php echo $text['signup']; ?></button>
            <?php endif; ?>
        </ul>
    </div>
</div>


<script>
function openNav() {
  document.getElementById("sidenav").style.display = "block";
  document.getElementById("open").style.display = "none";
  document.getElementsByTagName("body")[0].style.height = "100%";
  document.getElementsByTagName("body")[0].style.overflow = "hidden";
  document.getElementById("close").style.display = "inline";
}

function closeNav() {
    document.getElementById("sidenav").style.display = "none";
    document.getElementById("open").style.display = "inline";
    document.getElementsByTagName("body")[0].style.height = "auto";
    document.getElementsByTagName("body")[0].style.overflow = "visible";
    document.getElementById("close").style.display = "none";
}

document.getElementById("en").addEventListener("click", function(){ changeLang('en')});
document.getElementById("de").addEventListener("click", function(){ changeLang('de')});
function changeLang(lang) {
    window.location.href = "index.php?page=app&l="+lang;
}
</script>