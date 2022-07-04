<nav class="top-nav">
    <ul class="nav_items">
        <li class="logo"><a href="index.php?page=app"><img src="assets/img/logo.svg" alt=""></a></li>
        <div class="icons">
            <li><a href="index.php?page=settings"><span class="material-icons">settings</span></a></li>
            <li><a href="javascript:void(0)" onclick="openNav()"><span class="material-icons" id="open">menu</span></a> <a href="javascript:void(0)" onclick="closeNav()"><span class="material-icons" id="close">close</span></a></li>
        </div>
    </ul>
</nav>


<div class="sidenav" id="mySidenav">
    <ul>
        <li><a href="index.php?page=profile">Profil</a></li>
        <li><a href="index.php?page=appe">Fatigue Diary</a></li>
        <li><a href="index.php?page=about-app">Über</a></li>
        <li><a href="index.php?page=new">Was ist neu?</a></li>
        <li><a href="index.php?page=contact">Kontakt</a></li>
        <li><a href="index.php?page=logout" class="logout"><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</a></li>
    </ul>
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