<!DOCTYPE html>
<html lang="en"><head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="../../assets/fonts/materialicons.css">
<link rel="stylesheet" href="all-entries-Dateien/general.css">
<link rel="icon" type="image/x-icon" href="all-entries-Dateien/logo.svg">
<link rel="stylesheet" type="text/css" href="all-entries-Dateien/toastify.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/shepherd.js@8.3.1/dist/css/shepherd.css"/>
<title>Alle Einträge | Fatigue Diary</title>
<link rel="stylesheet" href="all-entries-Dateien/app.css">
</head>
<body>
<nav class="top-nav">
    <ul class="nav_items">
        <li class="logo"><a href="http://localhost/fatigue-diary/src/index.php?page=app"><img src="all-entries-Dateien/logo.svg" alt=""></a></li>
        <div class="icons">
            <li><a href="http://localhost/fatigue-diary/src/index.php?page=settings"><span class="material-icons">settings</span></a></li>
            <li><a href="javascript:void(0)" onclick="openNav()"><span class="material-icons" id="open">menu</span></a> <a href="javascript:void(0)" onclick="closeNav()"><span class="material-icons" id="close">close</span></a></li>
        </div>
    </ul>
</nav>


<div class="sidenav" id="mySidenav">
    <ul>
        <li><a href="http://localhost/fatigue-diary/src/index.php?page=profile">Profil</a></li>
        <li><a href="http://localhost/fatigue-diary/src/index.php?page=appe">Fatigue Diary</a></li>
        <li><a href="http://localhost/fatigue-diary/src/index.php?page=about-app">Über</a></li>
        <li><a href="http://localhost/fatigue-diary/src/index.php?page=new">Was ist neu?</a></li>
        <li><a href="http://localhost/fatigue-diary/src/index.php?page=contact">Kontakt</a></li>
        <li><a href="http://localhost/fatigue-diary/src/index.php?page=logout" class="logout"><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</a></li>
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
</script><nav class="bottom-nav">
    <ul class="nav_items">
        <li class="dashboard tour"><a><span class="material-icons">bar_chart</span></a></li>
        <li><a href="http://localhost/fatigue-diary/src/index.php?page=add-new" class="add"><span class="material-icons">add</span></a></li>
        <li><a href="http://localhost/fatigue-diary/src/index.php?page=entries"><span class="material-icons">assignment</span></a></li>
    </ul>
</nav><script type="text/javascript" src="all-entries-Dateien/toastify.js"></script>
    <div class="entries-screen">
        <h2>Einträge (letzte 7 Tage)</h2>
                    
            <div class="container day border_color" style="border-color: rgb(248, 169, 73);">
                <div class="title-row">
                    <h3>Wed, 13.07.2022</h3>
                    <h3 class="energyAverage tour" style="color: rgb(248, 169, 73);">5.5</h3>
                </div>
                                                        <div class="entry tour">
                        <p class="time">06:30</p>
                        <div class="info">
                            <div class="description">
                                <div class="activities">
                                    <p>Schlafen</p><p>,&nbsp;</p><p>Duschen</p>                                </div>
                                <div class="notes">
                                                                    </div>
                            </div>
                            <h3 class="energyValue" style="color: rgb(164, 190, 109);">8</h3>
                        </div>
                    </div>
                                                        <div class="entry" onclick="redirectToEdit(377)">
                        <p class="time">07:30</p>
                        <div class="info">
                            <div class="description">
                                <div class="activities">
                                    <p>Essen</p>                                </div>
                                <div class="notes">
                                    <p> Schüssel Corn Flakes</p>                                </div>
                            </div>
                            <h3 class="energyValue" style="color: rgb(249, 196, 70);">7</h3>
                        </div>
                    </div>
                                                        <div class="entry" onclick="redirectToEdit(366)">
                        <p class="time">10:50</p>
                        <div class="info">
                            <div class="description">
                                <div class="activities">
                                    <p>Arbeiten</p>                                </div>
                                <div class="notes">
                                    <p> 30min im Homeoffice arbeiten.</p>                                </div>
                            </div>
                            <h3 class="energyValue" style="color: rgb(248, 169, 73);">4.5</h3>
                        </div>
                    </div>
                                                        <div class="entry" onclick="redirectToEdit(378)">
                        <p class="time">11:03</p>
                        <div class="info">
                            <div class="description">
                                <div class="activities">
                                    <p>Ausruhen</p>                                </div>
                                <div class="notes">
                                    <p> Musik hören</p>                                </div>
                            </div>
                            <h3 class="energyValue" style="color: rgb(249, 196, 70);">6</h3>
                        </div>
                    </div>
                                                        <div class="entry" onclick="redirectToEdit(379)">
                        <p class="time">11:45</p>
                        <div class="info">
                            <div class="description">
                                <div class="activities">
                                    <p>Arbeiten</p>                                </div>
                                <div class="notes">
                                    <p> 30min Arbeiten</p>                                </div>
                            </div>
                            <h3 class="energyValue" style="color: rgb(243, 114, 44);">3.5</h3>
                        </div>
                    </div>
                                                        <div class="entry" onclick="redirectToEdit(380)">
                        <p class="time">14:05</p>
                        <div class="info">
                            <div class="description">
                                <div class="activities">
                                    <p>Baden</p>                                </div>
                                <div class="notes">
                                                                    </div>
                            </div>
                            <h3 class="energyValue" style="color: rgb(243, 114, 44);">3.5</h3>
                        </div>
                    </div>
                            </div>
                    
            <div class="container day border_color" style="border-color: rgb(249, 196, 70);">
                <div class="title-row">
                    <h3>Tue, 12.07.2022</h3>
                    <h3 class="energyAverage" style="color: rgb(249, 196, 70);">6.5</h3>
                </div>
                                                        <div class="entry" onclick="redirectToEdit(385)">
                        <p class="time">06:30</p>
                        <div class="info">
                            <div class="description">
                                <div class="activities">
                                    <p>Schlafen</p><p>,&nbsp;</p><p>Duschen</p>                                </div>
                                <div class="notes">
                                    <p> 8h Schlaf</p>                                </div>
                            </div>
                            <h3 class="energyValue" style="color: rgb(164, 190, 109);">8</h3>
                        </div>
                    </div>
                                                        <div class="entry" onclick="redirectToEdit(386)">
                        <p class="time">07:15</p>
                        <div class="info">
                            <div class="description">
                                <div class="activities">
                                    <p>Essen</p>                                </div>
                                <div class="notes">
                                                                    </div>
                            </div>
                            <h3 class="energyValue" style="color: rgb(164, 190, 109);">7.5</h3>
                        </div>
                    </div>
                                                        <div class="entry" onclick="redirectToEdit(387)">
                        <p class="time">09:28</p>
                        <div class="info">
                            <div class="description">
                                <div class="activities">
                                    <p>Arbeiten</p>                                </div>
                                <div class="notes">
                                                                    </div>
                            </div>
                            <h3 class="energyValue" style="color: rgb(243, 114, 44);">3</h3>
                        </div>
                    </div>
                                                        <div class="entry" onclick="redirectToEdit(388)">
                        <p class="time">11:28</p>
                        <div class="info">
                            <div class="description">
                                <div class="activities">
                                    <p>Ausruhen</p>                                </div>
                                <div class="notes">
                                                                    </div>
                            </div>
                            <h3 class="energyValue" style="color: rgb(249, 196, 70);">7</h3>
                        </div>
                    </div>
                            </div>
                    
            <div class="container day border_color" style="border-color: rgb(248, 169, 73);">
                <div class="title-row">
                    <h3>Mon, 11.07.2022</h3>
                    <h3 class="energyAverage" style="color: rgb(248, 169, 73);">5.5</h3>
                </div>
                                                        <div class="entry" onclick="redirectToEdit(389)">
                        <p class="time">06:29</p>
                        <div class="info">
                            <div class="description">
                                <div class="activities">
                                    <p>Schlafen</p>                                </div>
                                <div class="notes">
                                                                    </div>
                            </div>
                            <h3 class="energyValue" style="color: rgb(105, 164, 85);">9</h3>
                        </div>
                    </div>
                                                        <div class="entry" onclick="redirectToEdit(390)">
                        <p class="time">11:30</p>
                        <div class="info">
                            <div class="description">
                                <div class="activities">
                                    <p>Arbeiten</p>                                </div>
                                <div class="notes">
                                                                    </div>
                            </div>
                            <h3 class="energyValue" style="color: rgb(243, 114, 44);">4</h3>
                        </div>
                    </div>
                                                        <div class="entry" onclick="redirectToEdit(392)">
                        <p class="time">14:32</p>
                        <div class="info">
                            <div class="description">
                                <div class="activities">
                                    <p>Therapie</p>                                </div>
                                <div class="notes">
                                                                    </div>
                            </div>
                            <h3 class="energyValue" style="color: rgb(243, 114, 44);">3</h3>
                        </div>
                    </div>
                            </div>
                    
            <div class="container day border_color">
                <div class="title-row">
                    <h3>Sun, 10.07.2022</h3>
                    <h3 class="energyAverage" style="color: rgb(247, 70, 73);"></h3>
                </div>
                            </div>
                    
            <div class="container day border_color">
                <div class="title-row">
                    <h3>Sat, 09.07.2022</h3>
                    <h3 class="energyAverage" style="color: rgb(247, 70, 73);"></h3>
                </div>
                            </div>
                    
            <div class="container day border_color">
                <div class="title-row">
                    <h3>Fri, 08.07.2022</h3>
                    <h3 class="energyAverage" style="color: rgb(247, 70, 73);"></h3>
                </div>
                            </div>
                    
            <div class="container day border_color">
                <div class="title-row">
                    <h3>Thu, 07.07.2022</h3>
                    <h3 class="energyAverage" style="color: rgb(247, 70, 73);"></h3>
                </div>
                            </div>
            </div>

    
    <script src="all-entries-Dateien/visualizeValue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/shepherd.js@8.3.1/dist/js/shepherd.min.js"></script>

    <script>
        var entryValue = document.getElementsByClassName("energyValue");
        for (var i = 0; i < entryValue.length; i++) {
            calculateColor(entryValue[i].textContent, entryValue[i]);
        }

        var averageValue = document.getElementsByClassName("energyAverage");
        for (var i = 0; i < averageValue.length; i++) {
            calculateColor(averageValue[i].textContent, averageValue[i]);
        }

        var border = document.getElementsByClassName("border_color");
        for (var i = 0; i < averageValue.length; i++) {
            calculateBorderColor(averageValue[i].textContent, border[i]);
        }

        function redirectToEdit(id) {
            window.location.href = "index.php?page=add-new&id=" + id;
        }
    </script>

    <script>
        const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
            classes: 'shadow-md bg-purple-dark',
            scrollTo: false
        }
    });

    tour.addStep({
        text: 'Hier wird dir der Tagesdurchschnitt gezeigt.',
        attachTo: {
            element: '.energyAverage.tour',
            on: 'bottom'
        },
        buttons: [
            {
              text: 'Weiter',
              action: tour.next
            }
        ]
    });
    
    tour.addStep({
      text: 'Durch Klicken auf einen Eintrag kannst du ihn bearbeiten oder löschen.',
      attachTo: {
          element: '.entry.tour',
          on: 'bottom'
      },
      buttons: [
        {
          text: 'Weiter',
          action: tour.next
        }
      ]
    });

    tour.addStep({
      text: 'Das Dashboard-Icon bringt dich zurück zum Dashboard.',
      attachTo: {
          element: '.dashboard.tour',
          on: 'top'
      },
      buttons: [
        {
          text: 'Weiter',
          action: function () {
            window.location.href = 'Dashboard.php?intro=1';
          }
        }
      ]
    });


    tour.start();
    </script>


</body></html>