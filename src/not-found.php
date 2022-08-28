<?php
print_head(array('<title>Dashboard</title>'), false);
print_body();
includeToastify();
$todayDate = date("Y-m-d");

?>

<h3><?php echo $text['dnf-page']; ?></h1>