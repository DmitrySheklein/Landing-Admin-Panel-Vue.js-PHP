<?php

$_POST = json_decode(file_get_contents('php://input'), true);

$file = $_POST['file'];
$page = $_POST['page'];
$time = $_POST['time'];
define("BACKUP_URL",     '../backups/');

if($file && $page && $time){
    if(file_exists(BACKUP_URL.$file.'.html')){
        copy(BACKUP_URL.$file.'.html', '../../'. $page);
        echo "Файл $page восстановлен от $time";
    }else {
        echo 'Нет такого файла';
    }
} else {
    header('HTTP/1.0 400 Bad Request');
}
