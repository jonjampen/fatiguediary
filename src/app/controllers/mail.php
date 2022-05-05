<?php
if(isset($_POST['send-email'])){
    $to = "info@fatiguediary.ch";
    $subject = $_POST['subject'];
    $message = "{$_POST['name']} schrieb folgendes:" . "\n" . "{$_POST['message']}";

    $headers = "MIME-Version: 1.0" . "\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\n";
    $headers .= 'From: <no-reply@fatiguediary.ch>' . "\n";
    $headers .= 'Reply-To: <' . $_POST['email'] . '>' . "\n";

    mail($to,$subject,$message,$headers);

    sendConfirmationMail($_POST['email'], "info@fatiguediary.ch", "Ihre Nachricht wurde versendet", "Vielen Dank für Ihre Nachricht, wir melden und in Kürze." . "\n" . "Kopie der Nachricht:" . "\n" . $_POST['message']);
}

function sendConfirmationMail($to, $from, $subject, $message) {
    $headers = "MIME-Version: 1.0" . "\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\n";
    $headers .= 'From: <' . $from . '>' . "\n";

    mail($to,$subject,$message,$headers);

}

?>