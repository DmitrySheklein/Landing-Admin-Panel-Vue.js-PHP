<?php

$_POST = json_decode(file_get_contents('php://input'), true);

$fileName = $_POST['pageName'];
$newFile = '../../'.$fileName;
$newHtml = $_POST['html'];

define('BACKUP_URL', '../backups/');
if (!is_dir(BACKUP_URL)) {
    mkdir(BACKUP_URL);
}
$jsonFile = BACKUP_URL.'backups.json';
$backups = json_decode(file_get_contents($jsonFile));

if (!is_array($backups)) {
    $backups = [];
}

if ($newHtml && $fileName) {
    $backupFilename = uniqid().'.html';

    copy($newFile, BACKUP_URL.$backupFilename);

    if (!copy($newFile, BACKUP_URL.$backupFilename)) {
        echo "не удалось скопировать $newFile...\n";
        die;
    }

    array_push($backups, ['page' => $fileName, 'file' => $backupFilename, 'time' => date('H:i:s d.m.y')]);

    file_put_contents(BACKUP_URL.'backups.json', json_encode($backups));

    file_put_contents($newFile, $newHtml);
    echo basename($newFile).' обновлён! Создан бекап '."$fileName - $backupFilename";
} else {
    header('HTTP/1.0 400 Bad Request');
}
