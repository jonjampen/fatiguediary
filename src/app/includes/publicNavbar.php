<nav class="desktop-nav">
    <ul>
        <div class="left">
            <li class="logo"><a href="index.php?page=app"><img src="assets/img/logo.svg" alt=""></a></li>
        </div>
        <div class="language">
            <li class="active" id="en">EN</li>
            <li>&nbsp; | &nbsp;</li>
            <li class="" id="de">DE</li>
            </div>
        <div class="right">
            <li><a href="index.php?page=app" id="nav-app">Fatigue Diary</a></li>
            <li><a href="index.php?page=contact" id="nav-contact">Kontakt</a></li>
            <li><a href="index.php?page=login" id="nav-login">Login</a></li>
            <button class="btn-primary" id="nav-signup"onclick="location.href='index.php?page=register'">Registrieren</button>
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
            <li><a href="index.php?page=contact" id="nav-contact">Kontakt</a></li>
            <li><a href="index.php?page=login" id="nav-login">Login</a></li>
            <button class="btn-primary" id="nav-signup">Registrieren</button>
        </ul>
    </div>
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
</script>