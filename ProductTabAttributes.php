<?php

namespace seriatabs;

use JetBrains\PhpStorm\NoReturn;

class ProductTabAttributes {

    public string $web_uploads_path = '/uploads/'; //путь папки загрузок относительно корня URL
    public string $local_uploads_path = __DIR__ . '/uploads/'; //путь папки загрузок относительно корня файловой системы
    public string $img_path = 'img/';
    public string $attachment_path = 'attachments/';
    public string $info_tables_path = 'info-tables/';

    public bool|array $info_list = false;

    public function __construct(
        private $connection
    ){}

    /**
     * Возвращает все аттрибуты товара для табов
     */
    public function getSeriaAttrs( int $seria_id ): array|null
    {
        if (!$this->info_list) {
            $query = $this->connection->query("SELECT * FROM seria_attributes WHERE `seria_id` = $seria_id");
        } else {
            $query = $this->connection->query("SELECT * FROM seria_attributes WHERE `seria_id` = $seria_id AND `category` != 'info'");
        }

        return $query->fetch_all(MYSQLI_ASSOC);
    }

    /**
     * Сортирует информацию из $this->getSeriaAttrs() для удобного рендеринга в шаблоне
     */
    public function sortAttrs( array $attrs ): array
    {
        $data = [];
        foreach ($attrs as $values) {

            $data[ $values['tab_name'] ][ $values['category'] ][] = [
                'id' => $values['id'],
                'props' => $values['props'],
                'href' => $values['href'],
                'value' => $values['value'],
                'type' => $values['type'],
            ];
        }

        if ($this->info_list) {
            foreach ($this->info_list as $row) {
                $data['Обзор']['info'][] = [
                    'value' => $row
                ];
            }
        }

        return $data;
    }

    /**
     * Возвращает HTML шаблон табов по $seria_id. При передачи массива в $info_list заменят ею информацию о серии из БД
     * @param array|bool $info_list - если массив, то должен быть одномерный. Ключи не важны
     */
    public function getProductTabs ($seria_id, array|bool $info_list = false): bool|string
    {
        $this->info_list = $info_list;

        $tabs_data = $this->getSeriaAttrs( $seria_id );
        $data = $this->sortAttrs( $tabs_data );

        ob_start();
        require_once __DIR__ . './templates/user.php';
        return ob_get_clean();
    }

    /**
     * Обновляет или создает название серии из таба 'Обзор'
     */
    public function setTitle(): void
    {
        $title_info = $this->connection->query("SELECT `value` FROM `seria_attributes` WHERE `seria_id` = " . $_POST['seriaId'] . " AND `category` = 'title';")->fetch_all(MYSQLI_ASSOC);

        if ( empty($title_info) ) {
            $queryStatus = $this->noResultQuery(
                "INSERT INTO `seria_attributes` (seria_id, tab_name, category, value) VALUES (?, 'Обзор', 'title', ?)",
                'ds',
                $_POST['seriaId'], $_POST['title']
            );
        } else {
            $queryStatus = $this->noResultQuery(
                "UPDATE `seria_attributes` SET `value` = ? WHERE `seria_id` = ? AND `category` = 'title'",
                'sd',
                $_POST['title'], $_POST['seriaId']
            );
        }

        if ($queryStatus) {
            $this->response('Название серии успешно обновлено', 'success',200);
        }

        $this->response('Произошла неизвезтная ошибка', 'error',500);
    }

    /**
     * Обновляет или создает атрибут цены из таба 'Обзор'
     */
    public function setPrice(): void
    {
        $price_info = $this->connection->query("SELECT `value` FROM `seria_attributes` WHERE `seria_id` = " . $_POST['seriaId'] . " AND `category` = 'price';")->fetch_all(MYSQLI_ASSOC);

        if ( empty($price_info) ) {
            $queryStatus = $this->noResultQuery(
                "INSERT INTO `seria_attributes` (seria_id, tab_name, category, value) VALUES (?, 'Обзор', 'price', ?)",
                'ds',
                $_POST['seriaId'], $_POST['price']
            );
        } else {
            $queryStatus = $this->noResultQuery(
                "UPDATE `seria_attributes` SET `value` = ? WHERE `seria_id` = ? AND `category` = 'price'",
                'sd',
                $_POST['price'], $_POST['seriaId']
            );
        }

        if ($queryStatus) {
            $this->response('Цена серии успешно обновлена', 'success',200);
        }

        $this->response('Произошла неизвезтная ошибка', 'error',500);
    }

    /**
     * Загружает переданные картинки в папку и БД
     */
    public function uploadImages(): void
    {
        if (!isset($_FILES['images']['tmp_name'])) $this->response('Файлы не были загружены', 'error', 500);

        foreach ($_FILES['images']['tmp_name'] as $key => $tmp_path) {

            $fileName = basename( $_FILES['images']['name'][ $key ] );
            $dirName = uniqid() . $key . '/';
            $uploadPath = $this->local_uploads_path . $this->img_path . $dirName . $fileName;

            mkdir($this->local_uploads_path . $this->img_path . $dirName);
            if (move_uploaded_file($tmp_path, $uploadPath)) {

                $webPath = $this->web_uploads_path . $this->img_path . $dirName . $fileName;

                $queryStatus = $this->noResultQuery(
                    "INSERT INTO `seria_attributes` (seria_id, tab_name, category, href) VALUES (?, 'Обзор', 'image', ?)",
                    'ds',
                    $_POST['seriaId'], $webPath
                );

                if (!$queryStatus) $this->response('Произошла неизвезтная ошибка','error',500);

            } else {
               $this->response('Не удалось сохранить файл', 'error', 500);
            }
        }

        $this->response('Картинки успешно добавлены','success',200);
    }

    /**
     * Сохраняет переданный материал из таба Обзор в папку и в БД
     */
    public function uploadAttachment(): void
    {
        if (!isset($_FILES['attachment-file']['tmp_name'])) $this->response('Файлы не были загружены', 'error', 500);

        $fileName = basename( $_FILES['attachment-file']['name'] );
        $dirName = uniqid() . '/';
        $uploadPath = $this->local_uploads_path . $this->attachment_path . $dirName . $fileName;

        mkdir($this->local_uploads_path . $this->attachment_path . $dirName);
        if (move_uploaded_file($_FILES['attachment-file']['tmp_name'], $uploadPath)) {

            $webPath = $this->web_uploads_path . $this->attachment_path . $dirName . $fileName;
            $size = $this->getFilesize( filesize($uploadPath) );

            $queryStatus = $this->noResultQuery(
                "INSERT INTO `seria_attributes` (seria_id, tab_name, category, value, props, href, type )
                        VALUES (?, 'Обзор', 'attachement', ?, ?, ?, ?)",
                'dssss',
                $_POST['seriaId'], $_POST['attachments-name'], $size, $webPath, $_POST['attachments-type']
            );

            if ( $queryStatus ) {
                $this->response('Материалы успешно загружены','success',200);
            }
            $this->response('Произошла неизвезтная ошибка','error',500);
        } else {
            $this->response('Не удалось сохранить файл', 'error', 500);
        }
    }

    /**
     * Сохраняет HTML таблицу из запроса в папку и как новый таб в БД
     */
    public function uploadInfoTable(): void
    {
        if (!isset($_FILES['table-file']['tmp_name'])) $this->response('Файл не был загружен', 'error', 500);

        $fileName = basename( $_FILES['table-file']['name'] );
        $dirName = uniqid() . '/';
        $uploadPath = $this->local_uploads_path . $this->info_tables_path . $dirName . $fileName;

        mkdir($this->local_uploads_path . $this->info_tables_path . $dirName);
        if (move_uploaded_file($_FILES['table-file']['tmp_name'], $uploadPath)) {

            $webPath = $this->web_uploads_path . $this->info_tables_path . $dirName . $fileName;

            $queryStatus = $this->noResultQuery(
                "INSERT INTO `seria_attributes` (seria_id, tab_name, category, href )
                        VALUES (?, ?, 'html', ?)",
                'dss',
                $_POST['seriaId'], $_POST['table-name'], $webPath
            );

            if ( $queryStatus ) {
                $this->response('Таблица успешно загружена','success',200);
            }
            $this->response('Произошла неизвезтная ошибка','error',500);
        } else {
            $this->response('Не удалось сохранить файл', 'error', 500);
        }
    }

    /**
     * Удаляет файл атрибута из папки и стирает из БД
     */
    public function deleteWithFile(): void
    {
        try {
            $query = $this->connection->query("SELECT href FROM `seria_attributes` WHERE id = " . $_POST['id']);
            $href = $query->fetch_all(MYSQLI_ASSOC)[0]['href'];

            $type = $_POST['type'];

            //находим название папки, в котором лежит файл
            $file_dir = substr($href, 0, strrpos($href, '/'));
            $file_dir = substr($file_dir, strrpos($file_dir, '/') + 1);

            if ( $type === 'image' ) {
                $this->deleteDirectory( $this->local_uploads_path . $this->img_path . $file_dir );
            }
            elseif ( $type === 'attachment' ) {
                $this->deleteDirectory( $this->local_uploads_path . $this->attachment_path . $file_dir );
            }
            elseif ( $type === 'html' ) {
                $this->deleteDirectory( $this->local_uploads_path . $this->info_tables_path . $file_dir );
            }

        } catch (Exception $exception) {
            $this->response('Не удалось удалить файл на сервере', 'error', 500);
        }

        $this->deleteAttribute();
    }

    /**
     * Удаляет атрибут по id из БД. id передается в $_POST['id']
     */
    public function deleteAttribute(): void
    {
        $queryStatus = $this->noResultQuery("DELETE FROM `seria_attributes` WHERE id = ?", 'd', $_POST['id']);

        if ( $queryStatus ) {
            $this->response('Аттрибут успешно удален','success',200);
        }
        $this->response('Произошла неизвезтная ошибка','error',500);
    }

    /**
     * Добавляет информацию о серии в БД
     */
    public function addInfo()
    {
        $queryStatus = $this->noResultQuery(
            "INSERT INTO `seria_attributes` (seria_id, tab_name, category, value) VALUES (?, 'Обзор', 'info', ?)",
            'ds',
            $_POST['seriaId'], $_POST['info']
        );

        if ( $queryStatus ) {
            $this->response('Строка успешно добавлена','success',200);
        }
        $this->response('Произошла неизвезтная ошибка','error',500);
    }

    /**
     * Возвращает размер файла (в зависимости от его размера) в мегабайтах, кигабайтах или байтах
     */
    public function getFilesize( int $bytes ): null|string
    {
        $arBytes = [
            [
                "UNIT" => " МБ",
                "VALUE" => pow(1024, 2)
            ],
            [
                "UNIT" => " КБ",
                "VALUE" => 1024
            ],
            [
                "UNIT" => " Б",
                "VALUE" => 1
            ],
        ];

        foreach($arBytes as $arItem)
        {
            if( $bytes >= $arItem["VALUE"] ) {
                $result = $bytes / $arItem["VALUE"];
                return round($result, 1) . $arItem["UNIT"];
            }
        }
        return null;
    }

    /**
     * Выполняет sql запрос, не выводя результат. При ошибке отсылает ответ сервера и завершает программу
     */
    private function noResultQuery(string $query, string|null $paramsSigns = null, ...$params): bool
    {
        $query = $this->connection->prepare( $query );
        if ( !$query ) {
            $this->response($this->connection->error, 'error', 500);
        }

        if ($paramsSigns) {
            $query->bind_param($paramsSigns, ...$params);
        }
        $query->execute();

        if ($this->connection->error) {
            $this->response($this->connection->error, 'error', 500);
        }

        return true;
    }

    /**
     * Выводит текст, статус в json и код ответа. Завершает программу
     */
    private function response(string $message, string $type, int $code )
    {
        http_response_code( $code );
        echo json_encode([
            'status' => $type,
            'text' => $message,
        ]);
        die();
    }

    private function deleteDirectory($dir): bool
    {
        if ( !file_exists($dir) ) return true;
        if ( !is_dir($dir) ) return unlink($dir);

        foreach (scandir($dir) as $item) {

            if ($item == '.' || $item == '..') {
                continue;
            }

            if (!$this->deleteDirectory($dir . DIRECTORY_SEPARATOR . $item)) return false;
        }

        return rmdir($dir);
    }
}

//$connection = new mysqli('localhost', 'admin', '123123', 'verstka');
//if ($connection->connect_error) {
//    die('Connect Error (' . $connection->connect_errno . ') ' . $connection->connect_error);
//}
//
//echo (new ProductTabAttributes($connection))->getProductTabs(228);