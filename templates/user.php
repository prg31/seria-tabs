<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
    <title>ITEM (1600)</title>

    <meta charset="utf-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" href="/build/css/user/ProductTabAttributes.css">
    <script src="/build/js/user/ProductTabAttributes.js"></script>

</head>

<body>

    <div class="container">

        <section class="group-info">
            <div class="info-tabs">
                <ul class="info-tabs__tabs">

                    <?php foreach ($data as $tab_name => $value): ?>
                        <li class="info-tabs__tab"><?= $tab_name ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>


            <div class="group-info__body">

                <div class="control left">
                    <div class="control-button"></div>
                </div>

                <div class="tab-content">
                    <?php foreach ($data as $tab_name => $values): ?>
                        <div class="tab-content__item">
                            <?php if ($tab_name === 'Обзор'): ?>
                                <div class="info-content">
                                    <div class="product-gallery info-content__item">

                                        <div class="active-view product-gallery__active">
                                            <div class="zoom-in-icon"></div>
                                            <!-- adding image here -->
                                        </div>

                                        <div class="image-carousel product-gallery__bottom">
                                            <?php foreach ($values['image'] as $src): ?>
                                                <img src="<?= $src['href'] ?>" alt="" class="carousel__item">
                                            <?php endforeach; ?>
                                        </div>
                                    </div>

                                    <div class="product-text info-content__main-text info-content__item">

                                        <h3 class="info-content__item-head"><?= $values['title'][0]['value'] ?></h3>
                                        <p class="product-text__price"><?= $values['price'][0]['value'] ?></p>
                                        <p class="product-text__price-description">Цены указаны без учета НДС</p>

                                        <ul class="product-text__params">
                                            <?php foreach ($values['info'] as $info): ?>
                                                <li class="product-text__params-item"><?= $info['value'] ?></li>
                                            <?php endforeach; ?>
                                        </ul>
                                    </div>

                                    <div class="info-content__attachments info-content__item">

                                        <h3 class="info-content__item-head">Материалы</h3>
                                        <ul class="attachments-list">

                                            <?php foreach ($values['attachement'] as $attachement): ?>

                                                <li class="attachments-list__item">
                                                    <div class="product-attachment">
                                                        <img class="product-attachment__placeholder" src="/build/svg/<?= $attachement['type'] ?>-file-type-placeholder.svg" alt="">
                                                        <div class="product-attachment__text">

                                                            <a class="product-attachment__link" href="<?=$attachement['href']?>" download>
                                                                <?= $attachement['value'] ?>
                                                            </a>
                                                            <div class="product-attachment__size"><?= $attachement['props'] ?></div>
                                                        </div>
                                                    </div>
                                                </li>
                                            <?php endforeach; ?>

                                        </ul>
                                    </div>
                                </div>
                            <?php else: ?>
                                <div class="info-table">
                                    <?php
                                        $url = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . $values['html'][0]['href'];
                                        echo file_get_contents( $url );
                                    ?>
                                </div>
                            <?php endif; ?>
                        </div>
                    <?php endforeach; ?>
                </div>

                <div class="control right">
                    <div class="control-button"></div>
                </div>
            </div>

        </section>

    </div>

    <template id="image-zoom-popup-template">

        <div class="popup">
            <div class="popup__body">
                <div class="popup__close"></div>
                <div class="popup__image-wrapper"></div>
            </div>
        </div>

    </template>

</body>
</html>