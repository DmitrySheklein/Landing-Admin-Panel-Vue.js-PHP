<?php

if (file_exists($_FILES['image']['tmp_name'])) {
    $fileExt = explode('/', $_FILES['image']['type'])[1];
    $fileName = uniqid().'.'.$fileExt;
    define('IMG_URL', '../../img/');

    if (!is_dir(IMG_URL)) {
        mkdir(IMG_URL);
    }

    $isLoad = move_uploaded_file($_FILES['image']['tmp_name'], IMG_URL.$fileName);

    if ($isLoad) {
        echo json_encode(['status' => 'ok', 'src' => $fileName]);
    } else {
        header('HTTP/1.0 400 Bad Request');
    }
}
