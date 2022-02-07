<?php

function isEmailExisting($email) {
    global $conn;

    $check = $conn->query("SELECT email from users WHERE email='$email'");

    $row_count = $check->num_rows;
    
    if($row_count > 0) {
        return true;
    }
    return false;
}