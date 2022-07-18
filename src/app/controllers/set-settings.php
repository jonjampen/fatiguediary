<?php


if (isset($_POST['set-settings'])) {
    if (isset($_GET['w'])) {
        $theme = $_GET['t'];
        $wake_up_time = $_GET['w'];
        $bed_time = $_GET['b'];
        $newsletter = $_GET['n'];
    }
    else {
        $theme = $_POST['theme'];
        $wake_up_time = $_POST['wake_up_time'];
        $bed_time = $_POST['bed_time'];
        if (isset($_POST['newsletter'])) {
            $newsletter = 1; 
        }
        else {
            $newsletter = 0;
        }
    }


    $stmt = $conn->prepare("UPDATE settings SET theme=?, wake_up_time=?, bed_time=?, newsletter=? WHERE user_id =?");
    $stmt->bind_param("issii", $theme, $wake_up_time, $bed_time, $newsletter, $_SESSION['id']);
    $stmt->execute();
    $stmt->close();

    $theme = intval($theme);
    $settings = array("theme" => $theme, "wake_up_time" => $wake_up_time, "bed_time" => $bed_time, "newsletter" => $newsletter);
    $_SESSION['settings'] = $settings;

    if (isset($_GET['w'])) {
        header("location: intro/Dashboard.php");
    }
    else {
        header("location: index.php");
    }
}