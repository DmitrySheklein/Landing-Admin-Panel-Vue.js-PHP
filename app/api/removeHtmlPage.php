<?php

$_POST = json_decode(file_get_contents('php://input'), true);
$fileName = $_POST['name'];
$newFile = '../../'.$fileName;

if (file_exists($newFile)) {
    if (unlink($newFile)) {
        echo 'Файл: '.$fileName.' удалён';
    }

    die;
}

header('HTTP/1.0 400 Bad Request');
