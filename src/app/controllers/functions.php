<?php

function isEmailExisting($email) {
    global $conn;

    $check = $conn->prepare("SELECT email from users WHERE email=?");
    $check->bind_param("s", $email);
    $check->execute();
    $check->store_result();

    $row_count = $check->num_rows;

    if($row_count > 0) {
        return true;
    }
    return false;
}

function isPasswordMatchingEmail($email, $hashed_password) {
    global $conn;
    
    $check = $conn->prepare("SELECT * from users WHERE email=? AND password=?");
    $check->bind_param("ss", $email, $hashed_password);
    $check->execute();
    $check->store_result();

    $row_count = $check->num_rows;

    if($row_count > 0) {
        return true;
    }
    return false;
}