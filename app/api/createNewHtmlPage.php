<?php

$_POST = json_decode(file_get_contents('php://input'), true);

$fileName = $_POST['name'];
$newFile = '../../'.$fileName.'.html';

if (file_exists($newFile)) {
    header('HTTP/1.0 400 Bad Request');

    die;
}

fopen($newFile, 'w');
echo basename($newFile).' создан!';
