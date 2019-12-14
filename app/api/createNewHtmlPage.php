<?php

$fileName = $_POST['name'];
$newFile = '../../'.$fileName.'.html';

if (file_exists($newFile)) {
    header('HTTP/1.0 400 Bad Request');

    die;
}

fopen($newFile, 'w');
echo basename($newFile).' создан!';
