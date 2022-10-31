<!DOCTYPE html>
<html lang="en"><head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="../../assets/fonts/materialicons.css">
<link rel="stylesheet" href="addnew-Dateien/general.css">
<link rel="icon" type="image/x-icon" href="addnew-Dateien/logo.svg">
<link rel="stylesheet" type="text/css" href="addnew-Dateien/toastify.min.css">
<script src="addnew-Dateien/visualizeValue.js"></script>
<script src="addnew-Dateien/calculateDateTime.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/shepherd.js@8.3.1/dist/css/shepherd.css"/>
<title>Add Entry | Fatigue Diary</title>
<link rel="stylesheet" href="addnew-Dateien/app.css">
</head>
<body onload="loadActivities(), calculateDateTime(), setInterval(calculateDateTime, 10000)">
<nav class="top-nav">
    <ul class="nav_items">
        <li class="logo"><a href="http://localhost/fatigue-diary/src/index.php?page=app"><img src="addnew-Dateien/logo.svg" alt=""></a></li>
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
        <li><a href="http://localhost/fatigue-diary/src/index.php?page=dashboard"><span class="material-icons">bar_chart</span></a></li>
        <li><a href="http://localhost/fatigue-diary/src/index.php?page=add-new" class="add"><span class="material-icons">add</span></a></li>
        <li class="entries"><a><span class="material-icons">assignment</span></a></li>
    </ul>
</nav>
    <div class="add-screen">
        <h2>Add Entry</h2>

        
        <form>
            <div class="datetime">
                <div><span class="material-icons">calendar_month</span> <input type="date" name="date" id="currentDate" onchange="stopUpdatingDate()" value="2022-07-13"></div>
                <div><span class="material-icons">schedule</span> <input type="time" name="time" id="currentTime" onchange="stopUpdatingTime()" value="21:28"></div>
            </div>

            <div class="container energy">
                <div class="title-info">
                    <h3>Energy level</h3>
                </div>
                <input class="slider" id="energySlider" type="range" name="energylevel" min="0" max="10" step="0.5" value="3.5">
                <div class="description">
                    <h1 id="energyValue" class="level-text" style="color: rgb(243, 114, 44);">3.5</h1>
                    <h1 id="energyIcon">😨</h1>
                </div>
            </div>

            <div class="container container-activities">
                <div class="title-info">
                    <h3>Activities</h3>
                    <!-- <a href=""><span class="material-icons">question_mark</span></a> -->
                </div>
                <p class="hint">Select the activities that you have just done.</p>
                <div class="activities" id="activities"><a class="" id="toggleActivity_294" href="javascript:toggleActivity(294)">Sleep</a><a class="" id="toggleActivity_295" href="javascript:toggleActivity(295)">Work</a><a class="" id="toggleActivity_296" href="javascript:toggleActivity(296)">Eat</a><a class="" id="toggleActivity_297" href="javascript:toggleActivity(297)">Rest</a><a class="" id="toggleActivity_298" href="javascript:toggleActivity(298)">Therapy</a><a class="" id="toggleActivity_299" href="javascript:toggleActivity(299)">Shower</a><a class="" id="toggleActivity_301" href="javascript:toggleActivity(301)">Bath</a><a class="activity add"><span class="material-icons">add</span></a></div>
                                <input type="hidden" name="activities" id="activities_storage" value="">
            </div>

            <div class="container">
                <textarea name="notes" id="notes" rows="6" placeholder="Notes..." readonly></textarea>
            </div>
            <div class="space">

            </div>
            <div class="btn-center">
                
                <button class="btn-secondary btn-fixed" disabled>Add</button>
            </div>
        </form>

        <div class="modal-box" id="modal">
            <div class="container">
                <h3>Create new activity</h3>

                <input type="text" name="activity_name" id="activity_name" placeholder="Activity name...">

                <div class="modal-buttons">
                    <button class="btn-primary" name="add-activity" id="add_activity_btn" onclick="addActivity()">Add</button>
                    <button class="btn-secondary" type="reset" id="modalClose">Cancel</button>
                </div>
            </div>
        </div>
        
    </div>
    


<script src="addnew-Dateien/modal.js"></script>
<script src="https://cdn.jsdelivr.net/npm/shepherd.js@8.3.1/dist/js/shepherd.min.js"></script>

<script>
    
    var activities = document.getElementById("activities");
    var activity_name = document.getElementById("activity_name");

    function loadActivities() {
        var xmlhttp2 = new XMLHttpRequest();
        xmlhttp2.onreadystatechange=function() {
            if (this.readyState==4 && this.status==200) {
                activities.innerHTML=this.responseText;            
                var modalOpen = document.getElementById("modalOpen");
                modalOpen.addEventListener('click', openModal, false);
                setSelectedActivities();
            }
        };
        xmlhttp2.open("GET", "app/controllers/display-activities.php?type=ajax", true);
        xmlhttp2.send();
    }

    function addActivity() {
        closeModal();

        //add activity using ajax
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "app/controllers/add-activity.php?activity_name=" + activity_name.value, true);
        xmlhttp.send();

        //display new activity
        setTimeout(loadActivities, 500); //reload if not ready
    }
        
    var activities_storage = document.getElementById("activities_storage");
    
    
    function setSelectedActivities() {
        var selected_activities = [];
        for (var i = 0; i < selected_activities.length; i++) {
            id = selected_activities[i];
            
            //change style
            let activity = document.getElementById("toggleActivity_" + id);
            activity.classList.add("active");
        }
    }
    
    var selected_activities = [];
    function toggleActivity(id) {
        if (selected_activities.includes(id)) {
            index = selected_activities.indexOf(id);
            selected_activities.splice(index, 1); //removes from array

            //change style
            let activity = document.getElementById("toggleActivity_" + id);
            activity.classList.remove("active");
        } else {
            selected_activities.push(id); //adds to array

            //change style
            let activity = document.getElementById("toggleActivity_" + id);
            activity.classList.add("active");
        }
        
        activities_storage.value = selected_activities;
    }

        
    // slider description
    var energySlider = document.getElementById("energySlider");
    var energyValue = document.getElementById("energyValue");
    var energyIcon = document.getElementById("energyIcon");

    //display initial slider value, emoji and color
    energyValue.innerHTML = energySlider.value;
    calculateEmoji(energySlider.value, energyIcon);
    calculateColor(energySlider.value, energyValue);

    energySlider.addEventListener('input', updateSliderDescription, false);

    function updateSliderDescription() {
        energyValue.innerHTML = energySlider.value;
        calculateEmoji(energySlider.value, energyIcon);
        calculateColor(energySlider.value, energyValue);
    }

</script>

<script>
    const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
            classes: 'shadow-md bg-purple-dark',
            scrollTo: true
        }
    });

    tour.addStep({
        text: 'Here you can enter your current energy level. <br> The energy level represents how good you are currently feeling. If your fatigue is currently severe and you are really exhauste, choose a lower number. But if you feel a bit better, choose a higher number.',
        attachTo: {
            element: '.energy',
            on: 'bottom'
        },
        buttons: [
            {
              text: 'Next',
              action: tour.next
            }
        ]
    });
    
    tour.addStep({
      text: 'By clicking on the plus icon you can create a new activity.',
      attachTo: {
          element: '.activity.add',
          on: 'bottom'
      },
      buttons: [
        {
          text: 'Next',
          action: function () {
            toggleActivity(295);
            tour.next();
          }
        }
      ]
    });

    tour.addStep({
      text: 'Click on all activities that you have just done to add them to your entry. Selected activities are blue.',
      attachTo: {
          element: '.container-activities',
          on: 'top'
      },
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ]
    });

    tour.addStep({
      text: 'If you want to, you can add some notes (e.g. Description, duration, etc.)',
      attachTo: {
          element: '#notes',
          on: 'top'
      },
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ]
    });

    tour.addStep({
      text: 'You can also change the date and time if you want to create an entry in the past.',
      attachTo: {
          element: '.datetime',
          on: 'bottom'
      },
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ]
    });

    tour.addStep({
      text: 'By clicking on add your entry will be saved.',
      attachTo: {
          element: '.btn-secondary',
          on: 'bottom'
      },
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ]
    });

    tour.addStep({
      text: 'A click on the list icon will bring you to all your entries.',
      attachTo: {
          element: '.entries',
          on: 'top'
      },
      buttons: [
        {
          text: 'Next',
          action: function () {
            window.location.href = 'all-entries.php';
          }
        }
      ]
    });


    tour.start();
</script>
</body></html>