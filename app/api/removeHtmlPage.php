<?php

$fileName = $_POST['name'];
$newFile = '../../'.$fileName;

if (file_exists($newFile)) {
    if (unlink($newFile)) {
        echo 'Файл удалён';
    }

    die;
}

header('HTTP/1.0 400 Bad Request');
