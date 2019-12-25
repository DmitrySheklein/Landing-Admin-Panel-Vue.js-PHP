<?php

$_POST = json_decode(file_get_contents('php://input'), true);

$fileName = $_POST['pageName'];
$newFile = '../../'.$fileName;
$newHtml = $_POST['html'];

define("BACKUP_URL",     '../backups/');
$jsonFile = BACKUP_URL.'/backups.json';
$backups = [];

if(file_exists($jsonFile)){
    $backups = json_decode(file_get_contents($jsonFile));
}

if (file_exists($newFile)) {
    $backupFilename = uniqid();

    copy($newFile, BACKUP_URL .$backupFilename.'.html');
    array_push($backups, ["page" => $fileName, 'file' => $backupFilename, 'time' => date("H:i:s d.m.y")]);

    file_put_contents(BACKUP_URL.'/backups.json', json_encode($backups));

    file_put_contents($newFile, $newHtml);
    echo basename($newFile).' обновлён! Создан бекап '. "$fileName - $backupFilename";
} else {
    header('HTTP/1.0 400 Bad Request');
}
