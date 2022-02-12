<?php

//If registering
if (isset($_POST['register'])) {

    //Setting variables to values from the form
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    //Hashing password
    $hashed_password = hash("sha3-512", $password);


    unset($_SESSION['errors']);
    unset($_POST['register']);

    $errors = validateRegisterUser($_POST);
    
    if (empty($errors)) {
        //Preparing the statement
        $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");

        //Binding the parameters to the statement
        $stmt->bind_param("sss", $name, $email, $hashed_password); //"sss" because name, email, password are three strings

        //Executing the statement
        $stmt->execute();
        login($email);
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

    //Hashing password
    $hashed_password = hash("sha3-512", $password);

    unset($_SESSION['errors']);
    unset($_POST['login']);

    //check user data
    $errors = validateLoginUser($email, $hashed_password);
    
    if (empty($errors)) {
        login($email);
    }
    else {
        $_SESSION['errors'] = $errors;
        header("location: index.php?page=login&email=$email");
    }
}

// //Logout
// if (isset($_POST['logout'])) {
//     logout();
// }




function logout() {
    //Deleting session data
    session_destroy();
    header("location: index.php?page=login");
}

function login($email) {
    global $conn;

    $stmt = $conn->prepare("SELECT id, name, email FROM users WHERE email=?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($id, $name, $email);
    $stmt->fetch();

    $_SESSION['id'] = $id;
    $_SESSION['name'] = $name;
    $_SESSION['email'] = $email;
    unset($_SESSION['errors']);
    
    //Redirecting
    header("location: index.php?page=dashboard");
}

?>