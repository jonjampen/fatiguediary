<?php

$sql = "INSERT INTO users (name, email, password) VALUES ('John Doe', 'john@doe.com', 'password123')";
mysqli_query($conn, $sql);

header("location: index.php?page=dashboard");