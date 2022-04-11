<?php
print_head(array(
    '<script src="assets/chart/chart.min.js"></script>',
    '<script src="assets/chart/moment.min.js"></script>',
    '<script src="assets/chart/chartjs-adapter-moment.js"></script>',

    '<title>Document</title>'));
print_body();
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
        {
          "x": "Jan 22, 2020 3:06 PM",
          "y": 5
        },
        {
          "x": "Jan 22, 2020 3:04 PM",
          "y": 3
        },
        {
          "x": "Jan 22, 2020 2:59 PM",
          "y": 7
        },
        {
          "x": "Jan 22, 2020 2:23 PM",
          "y": 6.5
        },
        {
          "x": "Jan 22, 2020 1:23 PM",
          "y": 9
        },
        {
          "x": "Jan 22, 2020 12:23 PM",
          "y": 2.5
        },
        {
          "x": "Jan 22, 2020 11:23 AM",
          "y": 4
        }
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
                            min: "06:00 AM",
                            max: "23:00 PM"
                        },
                        ticks: {
                            autoSkip: true,
                            maxRotation: 0,
                            minRotation: 0
                        },
                        min: 'Jan 22, 2020 06:00 AM',
                        max: 'Jan 22, 2020 11:00 PM',
                    },
                    y: {
                        min: 0,
                        max: 10
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