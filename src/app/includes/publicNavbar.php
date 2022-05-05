<nav class="desktop-nav">
    <ul>
        <div class="left">
            <li class="logo"><a href="index.php"><img src="assets/img/logo.svg" alt=""></a></li>
            <div class="language">
                <li class="active" id="en">EN</li>
                <li>|</li>
                <li id="de">DE</li>
            </div>
        </div>
        <div class="right">
            <li><a href="index.php?page=app" id="nav-app"></a></li>
            <li><a href="index.php?page=contact" id="nav-contact"></a></li>
            <li><a href="index.php?page=about" id="nav-about"></a></li>
            <li><a href="index.php?page=login" id="nav-login"></a></li>
            <button class="btn-primary" id="nav-signup" onclick=""></button>
        </div>
    </ul>
</nav>

<div class="mobile-nav">
    <nav>
        <ul class="nav_items">
            <li class="logo"><a href="index.php"><img src="assets/img/logo.svg" alt=""></a></li>
            <div class="language">
                <li class="active" id="en_mobile">EN</li>
                <li>|</li>
                <li id="de_mobile">DE</li>
            </div>
            <li><a href="javascript:void(0)" onclick="openNav()"><span class="material-icons" id="open">menu</span></i></a> <a href="javascript:void(0)" onclick="closeNav()"><span class="material-icons" id="close">close</span></a></li>
        </ul>
    </nav>

    <div class="sidenav" id="mySidenav">
        <ul>
            <li><a href="index.php" id="nav-app"></a></li>
            <li><a href="contact.php" id="nav-contact"></a></li>
            <li><a href="about.php" id="nav-about"></a></li>
            <li><a href="login.php" id="nav-login"></a></li>
            <button class="btn-primary" id="nav-signup"></button>
        </ul>
    </div>
</div>


<script>
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("open").style.display = "none";
  document.getElementById("close").style.display = "inline";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("open").style.display = "inline";
    document.getElementById("close").style.display = "none";
}
</script>