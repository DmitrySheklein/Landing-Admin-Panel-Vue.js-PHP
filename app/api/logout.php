<?php

session_start();

if ($_SESSION['auth'] == true) {
    $_SESSION['auth'] = false;
    unset($_SESSION['auth']);
    session_destroy();
    echo json_encode(['logout' => true]);
} else {
    echo json_encode(['logout' => false]);
}
