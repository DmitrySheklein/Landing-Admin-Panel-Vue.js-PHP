<?php

$htmlfiles = glob('../../*.html');
$result = [];

foreach ($htmlfiles as $file) {
    array_push($result, basename($file));
}
echo json_encode($result);
