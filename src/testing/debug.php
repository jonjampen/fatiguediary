<?php

// array
function log_a($array) {
    $file = openFile();
    fwrite($file, print_r($array, true). "\n\n");
    fclose($file);  
}

// text
function log_t($text) {
    $file = openFile();
    fwrite($file, $text . "\n\n");
    fclose($file);  
}

function openFile() {
    $file = fopen('testing/log.txt', 'a'); // open file in append mode
    fwrite($file, "----------------------------------------------------------------". "\n\n");
    return $file;
}