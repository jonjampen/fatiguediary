<?php
//Setting variables to values from the form.
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];


//Preparing the statement
$stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");

//Binding the parameters to the statement
$stmt->bind_param("sss", $name, $email, $password); //"sss" because name, email, password are three strings

//Executing the statement
$stmt->execute();


//Redirecting
header("location: index.php?page=dashboard");