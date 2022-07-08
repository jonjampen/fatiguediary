<?php


if (isset($_POST['set-settings'])) {
    $theme = $_GET['t'];
    $wake_up_time = $_GET['w'];
    $bed_time = $_GET['b'];
    $newsletter = $_GET['n'];


    $stmt = $conn->prepare("INSERT INTO settings (user_id, theme, wake_up_time, bed_time, newsletter) VALUES (?,?,?,?,?)");
    $stmt->bind_param("iissi", $_SESSION['id'], $theme, $wake_up_time, $bed_time, $newsletter);
    $stmt->execute();
    $stmt->close();
}