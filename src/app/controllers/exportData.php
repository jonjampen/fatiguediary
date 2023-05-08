<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'assets/PHPMailer/src/Exception.php';
    require 'assets/PHPMailer/src/PHPMailer.php';


    print_head(array('<title>' . $text['all-entries'] . ' | Fatigue Diary</title>'), false);
    print_body();
    includeToastify();
    $allData = array(); // fill with ["datetime" => "01.01.2020", "energylevel" => 5, "activities" => ["school", "tv"]]
    $activity_names = array();
    ?>

<div class="entries-screen">
    <h2><?php echo $text['export']; ?></h2>
    <p>Exporting...</p>
    <p>Your data will be sent to you by email (<?php echo $_SESSION['email']; ?>) shortly.</p>
    <?php for ($day_counter = 0; $day_counter < 350; $day_counter++): //for each day of the past week ?>
        <?php

                $date = date_sub(new DateTime(), date_interval_create_from_date_string($day_counter . ' day')); // subtract i days from date
                $entries = getEnergyLevelsByDate($date->format("Y-m-d"));

                foreach ($entries as $entry) {
                    $activity_names = array();
                    
                    $activity_ids = getActivitiesByEnergyId($entry['energy_id']);
                    
                    foreach ($activity_ids as $activity_id){
                        array_push($activity_names, getActivityNameById($activity_id['id']));
                    }

                    array_push($allData, [
                        "datetime" => $entry['datetime'],
                        "energylevel" => $entry['energylevel'],
                        "activities" => $activity_names,
                        "notes" => getEnergyLevelsById($entry['energy_id'])['notes'],
                    ]);
                }   
        ?>

        <?php endfor; ?>
        <?php        
            // Open a file in write mode ('w')
            $filename = time();
            $fp = fopen('../exports/' . $filename . '.csv', 'w');

            fputcsv($fp, array_keys($allData[0])); // Add the keys as the column headers

            foreach ($allData as $row) {
                $row['activities'] = implode(", ", $row['activities']);
                fputcsv($fp, $row);
            }
            
            fclose($fp);
            sendMail($filename);
        ?>
</div>

        

</body>
</html>

<?php 
function sendMail($FILENAME) {
    $bodytext = "Hello";
    $email = new PHPMailer();
    $email->SetFrom('info@fatiguediary.ch', 'Your Name'); //Name is optional
    $email->Subject   = 'Message Subject';
    $email->Body      = $bodytext;
    $email->AddAddress( 'jon.jampen@cryptography.ch' );

    $file_to_attach = '../exports/' . $FILENAME . '.csv';

    $email->AddAttachment( $file_to_attach , 'NameOfFile.csv' );

    return $email->Send();
}