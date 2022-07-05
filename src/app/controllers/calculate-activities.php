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

    foreach ($activities as $activity) {
        if ($activity['score'] > 0) {
            $good_activities[] = $activity['name'];
        }
        elseif ($activity['score'] < 0) {
            $bad_activities[] = $activity['name'];
        }
    }

    return array('good' => $good_activities, 'bad' => $bad_activities);

}