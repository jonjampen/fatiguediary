<?php
// To be tested on the server
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // email
    $myEmail = 'info@fatiguediary.ch';
    $subject = 'New Contact Form Submission';
    $editedMessage = "Name: " . $name . "\nEmail: " . $email . "\nMessage:\n\n" . $message;
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // confirmation email
    $subjectConf = "Confirmation email: Message to Fatigue Diary";
    $messageConf = "Hello " . $name . "\n\nThank you for your message! I will get back to you as soon as possible. If you have any other remarks, please reply to this email.\n\nBest Regards\nJon Jampen\nDeveloper of Fatigue Diary\nhttps://fatiguediary.ch\info@fatiguediary.ch\n\n" . "---\n\n" . "Name: " . $name . "\nEmail: " . $email . "\nMessage: \n\n" . $message;
    $headersConf = "From: $myEmail\r\n";
    $headersConf .= "Reply-To: $myEmail\r\n";

    // send email
    mail($myEmail, $subject, $editedMessage, $headers);

    // Send confirmation email
    mail($email, $subjectConf, $messageConf, $headersConf);
}
