<?php

$connection = new mysqli('localhost', 'admin', '123123', 'verstka');
if ($connection->connect_error) {
    die('Connect Error (' . $connection->connect_errno . ') ' . $connection->connect_error);
}

class ProductTabAttributes {

    /**
     * Возвращает все аттрибуты товара для табов
     *
     * @param int $seria_id
     * @return array|null
     */
    public static function getSeriaAttrs( int $seria_id ): array|null
    {
        global $connection;

        $query = $connection->query("SELECT * FROM seria_attributes WHERE `seria_id` = $seria_id");

        return $query->fetch_all(MYSQLI_ASSOC);
    }

    public static function sortAttrs( array $attrs ): array
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

        return $data;
    }

    public static function getProductTabs( int $seria_id ): bool|string
    {

        $tabs_data = self::getSeriaAttrs( $seria_id );

        $data = self::sortAttrs( $tabs_data );

        ob_start();
        require_once './templates/user.php';
        return ob_get_clean();
    }

}

//echo ProductTabAttributes::getProductTabs(228);