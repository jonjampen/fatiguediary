<nav>
    <ul class="nav_items">
        <li><a href="index.php?page=dashboard"><i class="fa-solid fa-chart-line fa-2xl"></i></a></li>
        <li><a href="index.php?page=entries"><i class="fa-solid fa-book fa-2xl"></i></a></li>
        <li><a href="index.php?page=add-new"><i class="fa-solid fa-plus fa-2xl"></i></a></li>
        <li><a href="index.php?page=tricks"><i class="fa-solid fa-lightbulb fa-2xl"></i></a></li>
        <li><a href="javascript:void(0)" onclick="openNav()"><i class="fa-solid fa-bars fa-2xl" id="open"></i></a> <a href="javascript:void(0)" onclick="closeNav()"><i class="fa-solid fa-xmark fa-2xl" id="close"></i></a></li>
    </ul>
</nav>


<div class="sidenav" id="mySidenav">
    <ul>
        <li><a href="index.php?page=profile">Profil</a></li>
        <li><a href="index.php?page=home">Long Covid Diary</a></li>
        <li><a href="index.php?page=about-app">Über LCD</a></li>
        <li><a href="index.php?page=new">Was ist neu?</a></li>
        <li><a href="index.php?page=contact">Kontakt</a></li>
        <li><a href="index.php?page=logout">Logout</a></li>
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