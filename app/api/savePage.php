<?php

$_POST = json_decode(file_get_contents('php://input'), true);

$fileName = $_POST['pageName'];
$newFile = '../../'.$fileName;
$newHtml = $_POST['html'];

if (file_exists($newFile)) {
    file_put_contents($newFile, $newHtml);
    echo basename($newFile).' обновлён!';
} else {
    header('HTTP/1.0 400 Bad Request');
}
