<?php

function isEmailExisting($email) {
    global $conn;
    //TODO: prepared statement
    $check = $conn->query("SELECT email from users WHERE email='$email'");

    $row_count = $check->num_rows;
    
    if($row_count > 0) {
        return true;
    }
    return false;
}

function isPasswordMatchingEmail($email, $hashed_password) {
    global $conn;
    //TODO: prepared statement
    $check = $conn->query("SELECT * from users WHERE email='$email' AND password='$hashed_password'");
    
    $row_count = $check->num_rows;
    if($row_count > 0) {
        return true;
    }

    return false;
}