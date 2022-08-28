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
        $_SESSION['success'][] = $text['register-success'];
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
        $_SESSION['success'][] = $text['login-success'];
        login($email, null, $remember);
    }
    else {
        $_SESSION['errors'] = $errors;
        header("location: index.php?page=login&email=$email");
    }
}

//reset password
if (isset($_POST['reset-password-send'])) {
    global $conn;

    $email = trim($_POST['email']);

    $stmt = $conn->prepare("SELECT id, name FROM users WHERE email=?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($user_id, $user_name);
    $stmt->fetch();
    $stmt->close();
    if (!empty($user_id)) {
        $token = bin2hex(random_bytes(100));
    
        $stmt = $conn->prepare("INSERT INTO resettoken (user_id, token) VALUES(?,?)");
        $stmt->bind_param("is", $user_id, $token);
        $stmt->execute();
        $stmt->close();
    
        $link = "https://www.fatiguediary.ch/index.php?page=reset-password&token=".$token;
    
        $to = $email;
        $subject = $text['subject-reset-pw'];
        $message = $text['hello'] . $user_name . "\n\n" . $text['content-reset-pw'] . $link;
    
        $headers = "MIME-Version: 1.0" . "\n";
        $headers .= "Content-type:text/plain;charset=UTF-8" . "\n";
        $headers .= 'From: <no-reply@fatiguediary.ch>' . "\n";
        $headers .= 'Reply-To: <info@fatiguediary.ch>' . "\n";
    
        mail($to,$subject,$message,$headers);
    }

    
    $_SESSION['success'][] = $text['email-success'];
    header("location: index.php?page=reset-password");
}

if (isset($_POST['reset-password'])) {
    $password = $_POST['password'];
    $password_conf = $_POST['passwordConf'];
    $token = $_POST['token'];
    
    $errors = checkPasswordMatch($password, $password_conf);
    if (empty($errors)) {
        $hashed_password = hash("sha3-512", $password);

        global $conn;
        $stmt = $conn->prepare("SELECT user_id FROM resettoken WHERE token=?");
        $stmt->bind_param("s", $token);
        $stmt->execute();
        $stmt->bind_result($user_id);
        $stmt->fetch();
        $stmt->close();

        $stmt = $conn->prepare("UPDATE users SET password=? WHERE id=?");
        $stmt->bind_param("si", $hashed_password, $user_id);
        $stmt->execute();
        $stmt->close();

        $stmt = $conn->prepare("DELETE FROM resettoken WHERE token=?");
        $stmt->bind_param("s", $token);
        $stmt->execute();
        $stmt->close();

        $_SESSION['success'][] ="Passwort erfolgreich zurückgesetzt";
        header("location: index.php?page=login");
    }
    else {
        $_SESSION['errors'] = $errors;
        header("location: index.php?page=reset-password&token=".$token);
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
    $stmt = $conn->prepare("SELECT language, theme, wake_up_time, bed_time, newsletter FROM settings WHERE user_id=?");
    $stmt->bind_param("i", $_SESSION['id']);
    $stmt->execute();
    $stmt->bind_result($lang, $theme, $wake_up_time, $bed_time, $newsletter);
    $settings = null;
    
    while ($stmt->fetch()) {
        $settings = array("language" => $lang, "theme" => $theme, "wake_up_time" => $wake_up_time, "bed_time" => $bed_time, "newsletter" => $newsletter);
    }
    $stmt->close();
    return $settings;
}
function addSettingsToSession($settings) {
    $_SESSION['settings'] = $settings;
}

?>