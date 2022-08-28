<?php

function checkPasswordMatch($password, $password_conf) {
    global $text;
    $errors = array();
    if (empty($password)) {
        array_push($errors, $text['empty-pw']);
    }
    elseif ($password != $password_conf) {
        array_push($errors, $text['not-match']);
    }
    return $errors;
}

function validateRegisterUser($user){
    global $text;
    $errors = array();

    //empty
    if (empty($user['name'])) {
        array_push($errors, $text['empty-name']);
    }
    elseif (!preg_match("/^[a-zA-Z- öäüéèêà]*$/", $user['name'])) {
        array_push($errors, $text['invalid-name']);
    }

    if (empty($user['email'])) {
        array_push($errors, $text['empty-email']);
    }
    elseif (!filter_var($user['email'], FILTER_VALIDATE_EMAIL)) {
        array_push($errors, $text['invalid-email']);
    }
    elseif (isEmailExisting($user['email'])) {
        array_push($errors, $text['used-email']);
    }

    if (empty($user['password'])) {
        array_push($errors, $text['empty-password']);
    }
    elseif ($user['password'] != $user['passwordConf']) {
        array_push($errors, $text['not-match']);
    }

    return $errors;
}


function validateLoginUser($email, $hashed_password) {
    global $text;

    $errors = array();
    //Wrong email or password
    if (!isPasswordMatchingEmail($email, $hashed_password)) {        
        array_push($errors, $text['em-pw-wrong']);
    }

    return $errors;
}


function isEmailExisting($email) {
    global $conn;

    $check = $conn->prepare("SELECT email from users WHERE email=?");
    $check->bind_param("s", $email);
    $check->execute();
    $check->store_result();

    $row_count = $check->num_rows;
    $check->close();

    return $row_count > 0 ? true : false;
}


function isPasswordMatchingEmail($email, $hashed_password) {
    global $conn;
    
    $check = $conn->prepare("SELECT * from users WHERE email=? AND password=?");
    $check->bind_param("ss", $email, $hashed_password);
    $check->execute();
    $check->store_result();

    $row_count = $check->num_rows;
    $check->close();

    if($row_count > 0) {
        return true;
    }
    return false;
}