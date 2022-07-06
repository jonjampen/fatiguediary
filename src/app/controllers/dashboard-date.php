<?php

if (isset($_GET['newDate'])) {
    echo(date("Y-m-d", strtotime($_GET['newDate'])));

}
