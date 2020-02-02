<?php

if (file_exists($_FILES['image']['tmp_name'])) {
    $fileExt = explode('/', $_FILES['image']['type'])[1];
    $fileName = uniqid().'.'.$fileExt;
    $isLoad = move_uploaded_file($_FILES['image']['tmp_name'], '../../img/'.$fileName);

    if ($isLoad) {
        echo json_encode(['status' => 'ok', 'src' => $fileName]);
    } else {
        header('HTTP/1.0 400 Bad Request');
    }
}
