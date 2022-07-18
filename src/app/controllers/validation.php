<?php

function checkPasswordMatch($password, $password_conf) {
    $errors = array();
    if (empty($password)) {
        array_push($errors, "Das Passwort kann nicht leer sein.");
    }
    elseif ($password != $password_conf) {
        array_push($errors, "Die Passwörter stimmen nicht überein.");
    }
    return $errors;
}

function validateRegisterUser($user){
    $errors = array();

    //empty
    if (empty($user['name'])) {
        array_push($errors, "Der Name darf nicht leer sein");
    }
    elseif (!preg_match("/^[a-zA-Z- öäüéèêà]*$/", $user['name'])) {
        array_push($errors, "Der Name ist ungültig (darf nur Buchstaben, '-' und Leerschläge beinhalten).");
    }

    if (empty($user['email'])) {
        array_push($errors, "Die E-Mail-Adresse darf nicht leer sein.");
    }
    elseif (!filter_var($user['email'], FILTER_VALIDATE_EMAIL)) {
        array_push($errors, "Die E-Mail-Adresse ist ungültig.");
    }
    elseif (isEmailExisting($user['email'])) {
        array_push($errors, "Diese E-Mail-Adresse wird bereits verwendet.");
    }

    if (empty($user['password'])) {
        array_push($errors, "Das Passwort kann nicht leer sein.");
    }
    elseif ($user['password'] != $user['passwordConf']) {
        array_push($errors, "Die Passwörter stimmen nicht überein.");
    }

    return $errors;
}


function validateLoginUser($email, $hashed_password) {
    $errors = array();
    //Wrong email or password
    if (!isPasswordMatchingEmail($email, $hashed_password)) {        
        array_push($errors, "E-Mail oder Passwort falsch.");
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