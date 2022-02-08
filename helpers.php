<?php

function getFilesize( int $bytes )
{
    $arBytes = array(
        array(
            "UNIT" => " МБ",
            "VALUE" => pow(1024, 2)
        ),
        array(
            "UNIT" => " КБ",
            "VALUE" => 1024
        ),
    );


    foreach($arBytes as $arItem)
    {
        if( $bytes >= $arItem["VALUE"] ) {
            $result = $bytes / $arItem["VALUE"];
            return round($result, 1) . $arItem["UNIT"];
        }
    }
}