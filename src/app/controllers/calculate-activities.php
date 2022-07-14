<?php


function calculateActivity() {
    global $conn;

    $stmt = $conn->prepare("SELECT name, score from activities WHERE user_id =?");
    $stmt->bind_param("i", $_SESSION['id']);
    $stmt->execute();
    $stmt->bind_result($activity_name, $activity_score);

    $activities = array();

    while ($stmt->fetch()) {
        $activities[] = array("name" => $activity_name, "score" => $activity_score);
    }

    $good_activities = array();
    $bad_activities = array();
    foreach ($activities as $activity) {
        if ($activity['score'] > 0) {
            $good_activities[] = array("name" => $activity['name'], "score" => $activity['score']);
        }
        elseif ($activity['score'] < 0) {
            $bad_activities[] = array("name" => $activity['name'], "score" => $activity['score']);
        }
    }

    //sort activities by score
    if ($good_activities) {
        usort($good_activities, function ($a, $b) {
            return $b['score'] <=> $a['score'];   
        });
    }

    if ($bad_activities) {
        //sort activities by score (reverse order)
        usort($bad_activities, function ($a, $b) {
            return $a['score'] <=> $b['score'];   
        });
    }


    return array('good' => $good_activities, 'bad' => $bad_activities);

}