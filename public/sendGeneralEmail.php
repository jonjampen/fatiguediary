<?php
// To be tested on the server
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $emailTo = $_POST['emailTo'];
    $emailFrom = $_POST['emailFrom'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    
    $headers = "From: $emailFrom\r\n";
    $headers .= "Reply-To: $emailFrom\r\n";

    // send email
    mail($emailTo, $subject, $message, $headers);
}
