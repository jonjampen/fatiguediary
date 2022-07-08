<?php


if (isset($_POST['set-settings'])) {
    $theme = $_GET['t'];
    $wake_up_time = $_GET['w'];
    $bed_time = $_GET['b'];
    $newsletter = $_GET['n'];


    $stmt = $conn->prepare("UPDATE settings SET theme=?, wake_up_time=?, bed_time=?, newsletter=? WHERE user_id =?");
    $stmt->bind_param("issii", $theme, $wake_up_time, $bed_time, $newsletter, $_SESSION['id']);
    $stmt->execute();
    $stmt->close();

    header("location: index.php?page=dashboard");
}