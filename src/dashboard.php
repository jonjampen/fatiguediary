<?php
print_head(array(
    '<script src="assets/chart/chart.min.js"></script>',
    '<script src="assets/chart/moment.min.js"></script>',
    '<script src="assets/chart/chartjs-adapter-moment.js"></script>',

    '<title>Document</title>'));
print_body();
$todayDate = date("Y-m-d");
$energylevels = getEnergyLevelsByDate($todayDate);
?>

    <h3 class="welcome-text">Willkommen <?php echo($_SESSION['name']);?></h3>
    
    <div class="container diagram">
      <canvas id="canvas"></canvas>
	  </div>
    
<script>
  const dataArr = [
    {
      "label": "Energylevel",
      "fill": false,
      "data": [
        <?php
          foreach ($energylevels as $energylevel) {
            // echo('{ x: ' . "$energylevel['datetime']" . ',' .)
            echo('{');
            echo('"' . 'x' . '": ' . '"' . $energylevel['datetime'] . '"' . ',');
            echo('"' . 'y' . '": ' . $energylevel['energylevel']);
            echo('},');
          };
        ?>
      ],
      "borderColor": "#F55B53",
      "backgroundColor": "#F55B53"
    },
  ];

  var config = {
    type: 'line',
    data: {
        datasets: dataArr
    },
    options: {
      maintainAspectRatio: false,
      aspectRatio: 0.4,
      responsive: true,
      title: {
        display: true,
        text: 'X-axis Example based on Time'
      },
      scales: {
        x: {
          type: "time",
          time: {
            unit: 'hour'
          },
          ticks: {
            autoSkip: true,
            maxRotation: 0,
            minRotation: 0
          },
          min: '<?php echo($energylevels[0]['date']); ?> 06:00 AM',
          max: '<?php echo($energylevels[0]['date']); ?> 11:00 PM',
        },
        y: {
          min: 0,
          max: 10, 
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  };

  window.onload = function() {
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);
  };

	</script>


</body>
</html>