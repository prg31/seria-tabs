<?php

require_once './ProductTabAttributes.php';

$connection = new mysqli('localhost', 'admin', '123123', 'verstka');
if ($connection->connect_error) {
    die('Connect Error (' . $connection->connect_errno . ') ' . $connection->connect_error);
}

$productTabsAttrs = new ProductTabAttributes( $connection );

//handle AJAX queries
if ( isset($_GET['method']) ) {
    $method = $_GET['method'];
    $productTabsAttrs->$method();
}

//show input seria id page
if ( empty($_POST['seria-id'] ) ) {
    require_once './templates/manager/index.php';
    die();
}

//show page with data of seria
if ( empty($_POST['data']) ) {

    $seria_id = $_POST['seria-id'];
    $attributes = $productTabsAttrs->getSeriaAttrs( $seria_id );
    $sortedAttrs = $productTabsAttrs->sortAttrs( $attributes );

    require_once './templates/manager/edit-tab.php';
}