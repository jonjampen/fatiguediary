<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
</head>
<body>
    <div class="login-container">
        <h2>Register</h2>
        <form action="register.php" method="post">
            <label for="name">Name</label>
            <input type="text" name="name">
            <label for="name">Username</label>
            <input type="text" name="username">
            <label for="name">Email</label>
            <input type="email" name="email">
            <label for="name">Password</label>
            <input type="password" name="password">
            <label for="name">Repeat password</label>
            <input type="password" name="passwordConf">
            <button type="submit" name="register">Register</button>
        </form>
    </div>
</body>
</html>