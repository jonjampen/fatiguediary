<?php

//If add button pressed
if (isset($_POST['add-activity'])) {

    //Setting variables to values from the form
    $name = $_POST['activity'];
    
    //Preparing the statement
    $stmt = $conn->prepare("INSERT INTO activities (user_id, name) VALUES (?, ?)");

    //Binding the parameters to the statement
    $stmt->bind_param("ss", $_SESSION['id'], $name);

    //Executing the statement
    $stmt->execute();
    header("location: index.php?page=add-new");
}