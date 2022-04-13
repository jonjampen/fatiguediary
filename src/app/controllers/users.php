<?php

//If registering
if (isset($_POST['register'])) {

    //Setting variables to values from the form
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $remember = $_POST['remember'];

    //Hashing password
    $hashed_password = hash("sha3-512", $password);


    unset($_SESSION['errors']);
    unset($_POST['register']);

    $errors = validateRegisterUser($_POST);
    
    if (empty($errors)) {
        $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $email, $hashed_password); //"sss" because name, email, password are three strings
        $stmt->execute();
        $stmt->close();
        login($email, null, $remember);
    }
    else {
        $_SESSION['errors'] = $errors;
        header("location: index.php?page=register&name=$name&email=$email");
    }
}

//If login
if (isset($_POST['login'])) {
    //Setting variables to values from the form
    $email = $_POST['email'];
    $password = $_POST['password'];
    $remember = $_POST['remember'];

    //Hashing password
    $hashed_password = hash("sha3-512", $password);

    unset($_SESSION['errors']);
    unset($_POST['login']);

    //check user data
    $errors = validateLoginUser($email, $hashed_password);
    
    if (empty($errors)) {
        login($email, null, $remember);
    }
    else {
        $_SESSION['errors'] = $errors;
        header("location: index.php?page=login&email=$email");
    }
}


function logout() {
    //Deleting session data
    session_destroy();
    setcookie("remember-me", "", time() - 3600); //unset cookie
    header("location: index.php?page=login");
}

function login($email, $id, $remember) {
    global $conn;
    if($email) {
        $stmt = $conn->prepare("SELECT id, name, email FROM users WHERE email=?");
        $stmt->bind_param("s", $email);
    } else {
        $stmt = $conn->prepare("SELECT id, name, email FROM users WHERE id=?");
        $stmt->bind_param("s", $id);
    }
    $stmt->execute();
    $stmt->bind_result($id, $name, $email);
    $stmt->fetch();
    $stmt->close();

    $_SESSION['id'] = $id;
    $_SESSION['name'] = $name;
    $_SESSION['email'] = $email;
    unset($_SESSION['errors']);
    
    if($remember) {
        createRememberToken($_SESSION['id']);
    }

    //Redirecting
    header("location: index.php?page=dashboard");
}

function createRememberToken($user_id) {
    global $conn;

    $token = bin2hex(random_bytes(100));
    $stmt = $conn->prepare("INSERT INTO tokens (user_id, token) VALUES (?, ?)");
    $stmt->bind_param("is", $user_id, $token);
    $stmt->execute();
    $stmt->close();

    //create cookie
    setcookie("remember-me", $token, time() + 60 * 60 * 24 * 30);
}

function checkCookie() {
    global $conn;

    if(isset($_COOKIE['remember-me'])) {
        $token = $_COOKIE['remember-me'];
        $stmt = $conn->prepare("SELECT user_id FROM tokens WHERE token=?");
        $stmt->bind_param("s", $token);
        $stmt->execute();
        $stmt->bind_result($user_id);
        $stmt->fetch();
        $stmt->close();

        if ($user_id) {
            login(null, $user_id, true);
            return true;
        }
        else {
            return false;
        }
    } else {
        return false;
    }
}

?>