<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Document</title>
</head>
<body>
    <p>welcome <?php echo($_SESSION['name'] . " " . $_SESSION['email']);?></p>
    <form action="index.php?page=users" method="post">
        <button type="submit" name="logout">Logout</button>
    </form>
</body>
</html>