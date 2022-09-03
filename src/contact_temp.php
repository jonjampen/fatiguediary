<?php
print_head(array('<title>Dashboard</title>'), false);
if (isset($_SESSION['id'])) {
    print_body();
} else {
    print_body_top_nav_only();
}
includeToastify();
$todayDate = date("Y-m-d");

?>

    <h3>Kontakt</h3>
    <p>Jon Jampen</p>
    <a href="mailto:info@fatiguediary.ch">info@fatiguediary.ch</a>