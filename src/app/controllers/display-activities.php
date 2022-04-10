<?php
include("../database/db.php");
include("../database/connection.php");

//get activities form db
$stmt = $conn->prepare("SELECT id, name from activities WHERE user_id=?");
$stmt->bind_param("s", $_SESSION['id']);
$stmt->execute();
$stmt->bind_result($activity_id, $activity_name);
$activities = [];

while ($stmt->fetch()) {
    $activities[] = array("id" => $activity_id, "name" => $activity_name);
}


foreach ($activities as $activity) {
    echo "<a class='' id='toggleActivity_" . $activity['id'] . "' href='javascript:toggleActivity(" . $activity['id'] . ")'>" . $activity['name'] . "</a>";
}
echo "<a class='activity add' id='modalOpen'><span class='material-icons'>add</span></a>";

?>