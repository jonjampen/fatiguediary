<?php
print_head(array(
    '<script src="assets/chart/chart.min.js"></script>',
    '<script src="assets/chart/moment.min.js"></script>',
    '<script src="assets/chart/chartjs-adapter-moment.js"></script>',

    '<title>Document</title>'));
print_body();
$todayDate = "2022-04-11";
$energylevels = getEnergyLevelsByDate($todayDate);
?>

    <p>welcome <?php echo($_SESSION['name']);?></p>
    
    <div class="container diagram">
      <canvas id="canvas"></canvas>
	  </div>
    
<script>
  const dataArr = [
    {
      "label": "Sensor1",
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
      "borderColor": "#00E3E3",
      "backgroundColor": "#00E3E3"
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
                          unit: 'hour',
                          // unitStepSize: 1,
                          // min: "06:00 AM",
                          // max: "23:00 PM"
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