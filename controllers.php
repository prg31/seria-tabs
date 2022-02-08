<?php

use JetBrains\PhpStorm\NoReturn;

function updateTitle(): void
{
    global $connection;

    try {
        $connection->query(
            "UPDATE `seria_attributes` 
                    SET `value` = " . $_POST['title'] . " 
                    WHERE `seria_id` = " . $_POST['seriaId'] . " AND `category` = 'title'");
    } catch ( Exception $exception ) {

    }
}

function uploadImages(): void
{
    global $connection;

    $uploadDir = __DIR__ . '/uploads/img/';
    foreach ($_FILES['images']['tmp_name'] as $key => $tmp_path) {

        $fileName = time() . '_' . basename( $_FILES['images']['name'][ $key ] );
        $uploadFile = $uploadDir . $fileName;

        if (move_uploaded_file($tmp_path, $uploadFile)) {

            $webPath = '/uploads/img/' . $fileName;
            $connection->query("INSERT INTO `seria_attributes` (seria_id, tab_name, category, href)
                VALUES (" . $_POST['seriaId'] . ", 'Обзор', 'image', '$webPath')");
        } else {
            echo "Возможная атака с помощью файловой загрузки!\n";
        }
    }
}

function deleteAttribute(): void
{
    global $connection;

    $connection->query("DELETE FROM `seria_attributes` WHERE id = " . $_POST['id']);
}