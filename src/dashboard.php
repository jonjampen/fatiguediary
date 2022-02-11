<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/fontawesome/all.css">
    <title>Document</title>
</head>
<body>
    welcome <i class="fa-solid fa-face-angry"></i><?php echo($_SESSION['name'] . $_SESSION['email']);?>;
    <form action="index.php?page=users" method="post">
        <button type="submit" name="logout">Logout</button>
    </form>
</body>
</html>