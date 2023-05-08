<?php
    print_head(array('<title>' . $text['all-entries'] . ' | Fatigue Diary</title>'), false);
    print_body();
    includeToastify();
    $allData = array(); // fill with ["datetime" => "01.01.2020", "energylevel" => 5, "activities" => ["school", "tv"]]
    $activity_names=array();
    ?>

<div class="entries-screen">
    <h2><?php echo $text['export']; ?></h2>
    <p>Exporting...</p>
    <p>Your data will be sent to you by email (<?php echo $_SESSION['email']; ?>) shortly.</p>
    <?php for ($day_counter = 0; $day_counter < 350; $day_counter++): //for each day of the past week ?>
        <?php

                $date = date_sub(new DateTime(), date_interval_create_from_date_string($day_counter . ' day')); // subtract i days from date
                $entries = getEnergyLevelsByDate($date->format("Y-m-d"));

                $average = calculateDailyAvg($entries);
                if ($average) {
                    $average = round($average, 1);
                }

                foreach ($entries as $entry) {
                    $activity_names=array();
                    
                    $activity_ids =  getActivitiesByEnergyId($entry['energy_id']);
                    
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
            // Create an array of elements
            $list = array(
                ['Name', 'age', 'Gender'],
                ['Bob', 20, 'Male'],
                ['John', 25, 'Male'],
                ['Jessica', 30, 'Female']
            );
            
            // Open a file in write mode ('w')
            $filename = time();
            print($filename);
            $fp = fopen('../exports/' . $filename . '.csv', 'w');

            fputcsv($fp, array_keys($allData[0])); // Add the keys as the column headers

            foreach ($allData as $row) {
                $row['activities'] = implode(", ", $row['activities']);
                fputcsv($fp, $row);
            }
            
            // Loop through file pointer and a line
            // foreach ($list as $fields) {
            //     fputcsv($fp, $fields);
            // }
            
            fclose($fp);
        ?>
</div>

        

</body>
</html>

<?php 
 
// Recipient 
$to = $_SESSION['email']; 
 
// Sender 
$from = 'info@fatiguediary.ch'; 
$from_name = 'Jon from Fatigue Diary'; 
 
// Email subject 
$subject = 'Exported Data form Fatigue Diary';  
 
// Attachment file 
$file = "../exports/" . $filename . ".csv"; 
 
// Email body content 
$body = ' 
    <h3>Your Exported Data from Fatigue Diary</h3> 
    <p>Hey!</p>
    <p>You have requested your data from <a href="https://www.fatiguediary.ch">Fatigue Diary</a>. You can find it in the attachment.</p>
    <p>If you have any questions, feel free to contact me!</p>
    <p>Kind regards, <br>
    Jon Jampen <br>
    Creator of <a href="https://www.fatiguediary.ch">Fatigue Diary</a>
    </p>
    <i>This email was sent automatically from </i><a href="https://www.fatiguediary.ch">www.fatiguediary.ch</a>
'; 
 
$file_size = filesize($file);
$handle = fopen($file, "r");
$content = fread($handle, $file_size);
fclose($handle);

$content = chunk_split(base64_encode($content));
$uid = md5(uniqid(time()));
$name = basename($file);

$eol = PHP_EOL;

// Basic headers
$header = "From: ".$from_name." <".$from.">".$eol;
$header .= "Reply-To: ".$from.$eol;
$header .= "MIME-Version: 1.0\r\n";
$header .= "Content-Type: multipart/mixed; boundary=\"".$uid."\"";

// Put everything else in $message
$message = "--".$uid.$eol;
$message .= "Content-Type: text/html; charset=ISO-8859-1".$eol;
$message .= "Content-Transfer-Encoding: 8bit".$eol.$eol;
$message .= $body.$eol;
$message .= "--".$uid.$eol;
$message .= "Content-Type: application/pdf; name=\"".$filename."\"".$eol;
$message .= "Content-Transfer-Encoding: base64".$eol;
$message .= "Content-Disposition: attachment; filename=\"".$filename."\"".$eol;
$message .= $content.$eol;
$message .= "--".$uid."--";

if (mail($to, $subject, $message, $header))
{
    return "mail_success";
}
else
{
    return "mail_error";
}