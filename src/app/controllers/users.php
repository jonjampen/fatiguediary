<?php

//If registering
if (isset($_POST['register'])) {
    //Setting variables to values from the form
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $remember = isset($_POST['remember']) ? $_POST['remember'] : false;

    //Hashing password
    $hashed_password = hash("sha3-512", $password);

    unset($_SESSION['errors']);
    unset($_POST['register']);

    $errors = validateRegisterUser($_POST);
    
    if (empty($errors)) {
        $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $email, $hashed_password); //"sss" for data type
        $stmt->execute();
        $stmt->close();
        $_SESSION['success'][] = "Du hast dich erfolgreich registriert.";
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
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $remember = isset($_POST['remember']) ? $_POST['remember'] : false;
    
    //Hashing password
    $hashed_password = hash("sha3-512", $password);

    unset($_SESSION['errors']);
    unset($_POST['login']);

    //validate user data
    $errors = validateLoginUser($email, $hashed_password);
    
    if (empty($errors)) {
        $_SESSION['success'][] = "Du hast dich erfolgreich angemeldet.";
        login($email, null, $remember);
    }
    else {
        $_SESSION['errors'] = $errors;
        header("location: index.php?page=login&email=$email");
    }
}


function logout() {
    //Deleting session data and unset cookie
    session_destroy();
    setcookie("remember-me", "", time() - 3600);

    header("location: index.php?page=login");
}


function login($email, $id, $remember) {
    global $conn;

    // login by email or id
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

    $start_onboarding = loadSettings();
    
    if($remember) {
        createRememberToken($_SESSION['id']);
    }

    //Redirecting
    if ($start_onboarding) {
        header("location: index.php?page=onboarding");
    } else {
        header("location: index.php?page=dashboard");
    }
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

    if (isset($_COOKIE['remember-me'])) {
        $token = $_COOKIE['remember-me'];
        $stmt = $conn->prepare("SELECT user_id FROM tokens WHERE token=?");
        $stmt->bind_param("s", $token);
        $stmt->execute();
        $stmt->bind_result($user_id);
        $stmt->fetch();
        $stmt->close();

        if ($user_id) {
            login(null, $user_id, false);
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

function loadSettings () {
    $settings = loadSettingsDB();
    $start_onboarding = false;
    if (!$settings) {
        global $conn;
        $stmt = $conn->prepare("INSERT INTO settings (user_id) VALUES(?)");
        $stmt->bind_param("i", $_SESSION['id']);
        $stmt->execute();
        $stmt->close();

        $start_onboarding = true;

        $settings = loadSettingsDB();
    }

    addSettingsToSession($settings);

    return $start_onboarding;

}
function loadSettingsDB () {
    global $conn;
    $stmt = $conn->prepare("SELECT theme, wake_up_time, bed_time, newsletter FROM settings WHERE user_id=?");
    $stmt->bind_param("i", $_SESSION['id']);
    $stmt->execute();
    $stmt->bind_result($theme, $wake_up_time, $bed_time, $newsletter);
    $settings = null;
    
    while ($stmt->fetch()) {
        $settings = array("theme" => $theme, "wake_up_time" => $wake_up_time, "bed_time" => $bed_time, "newsletter" => $newsletter);
    }
    $stmt->close();
    return $settings;
}
function addSettingsToSession($settings) {
    $_SESSION['settings'] = $settings;
}

?>