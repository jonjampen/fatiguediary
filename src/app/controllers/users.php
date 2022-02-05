<?php

//Setting variables to values from the form
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];

//Hashing password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);


//If registering
if (isset($_POST['register'])) {
    unset($_SESSION['errors']);
    unset($_POST['register']);

    $errors = validateUser($_POST);
    
    if (empty($errors)) {
        //Preparing the statement
        $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");

        //Binding the parameters to the statement
        $stmt->bind_param("sss", $name, $email, $hashed_password); //"sss" because name, email, password are three strings

        //Executing the statement
        $stmt->execute();
        login($_POST);
    }
    else {
        $_SESSION['errors'] = $errors;
        header("location: index.php?page=register");
    }
}


//Logout
if (isset($_POST['logout'])) {
    logout();
}




function logout() {
    //Deleting session data
    session_destroy();
    header("location: index.php?page=login");
}


function login($user) {
    $_SESSION['name'] = $user['name'];
    unset($_SESSION['errors']);
    //Redirecting
    header("location: index.php?page=dashboard");
}

?>