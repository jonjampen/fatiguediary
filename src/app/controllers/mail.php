<?php
if(isset($_POST['send-contact-mail'])){
    $to = "info@fatiguediary.ch";
    $subject = "Kontaktanfrage: " . $_POST['subject'];
    $message = $_POST['name'] . " schrieb folgendes:" . "\n\n" . $_POST['message'];

    $headers = "MIME-Version: 1.0" . "\n";
    $headers .= "Content-type:text/plain;charset=UTF-8" . "\n";
    $headers .= 'From: <no-reply@fatiguediary.ch>' . "\n";
    $headers .= 'Reply-To: <' . $_POST['email'] . '>' . "\n";

    mail($to,$subject,$message,$headers);

    $conf_message =  "Vielen Dank für Ihre Nachricht, wir melden und in Kürze." . "\n" . "Kopie der Nachricht:" . "\n\n" . $_POST['message'] . "\n\n\n" . "Bei weiteren Anmerkungen antworten Sie bitte auf diese E-Mail.";
    sendConfirmationMail($_POST['email'], "info@fatiguediary.ch", "Ihre Nachricht wurde versendet", $conf_message);
}

function sendConfirmationMail($to, $from, $subject, $message) {
    $headers = "MIME-Version: 1.0" . "\n";
    $headers .= "Content-type:text/plain;charset=UTF-8" . "\n";
    $headers .= 'From: <' . $from . '>' . "\n";

    mail($to,$subject,$message,$headers);

}

?>