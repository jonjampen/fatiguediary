<?php

function validateRegisterUser($user){
    $errors = array();

    //empty
    if (empty($user['name'])) {
        array_push($errors, "Der Name darf nicht leer sein");
    }
    if (empty($user['email'])) {
        array_push($errors, "Die E-Mail-Adresse darf nicht leer sein.");
    }
    if (empty($user['password'])) {
        array_push($errors, "Das Passwort kann nicht leer sein.");
    }

    //Passwords not matching
    if ($user['password'] != $user['passwordConf']) {
        array_push($errors, "Die Passwörter stimmen nicht überein.");
    }

    //Invalid input
    if (!preg_match("/^[a-zA-Z- ]*$/", $user['name'])) {
        array_push($errors, "Der Name ist ungültig (darf nur Buchstaben, '-' und Leerschläge beinhalten).");
    }
    if (!filter_var($user['email'], FILTER_VALIDATE_EMAIL)) {
        array_push($errors, "Die E-Mail-Adresse ist ungültig.");
    }

    //E-Mail already existing
    if (isEmailExisting($user['email']) == true) {
        array_push($errors, "Diese E-Mail-Adresse wird bereits verwendet");
    }

    return $errors;
}
    
