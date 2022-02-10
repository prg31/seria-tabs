<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
    <title>Изменить аттрибуты серии</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script src="/build/js/manager/editTabs.js"></script>

    <script>
        const seriaId = <?= $seria_id ?>;
    </script>

    <style>

        .img-thumbnail{
            width: 100px;
            height: 100px;
            object-fit: contain
        }
        
        form{
            background-color: #FFFFFF;
        }

    </style>
</head>

<body>

<div class="bg-secondary">

<!--    --><?php //var_dump($sortedAttrs); die(); ?>

    <div class="m-5">

        <h1 class="text-white mb-5">Редактирование общих аттрибутов для товаров серии <?= $seria_id ?></h1>
        <h2 class="text-white">Обзор:</h2>

        <form class="mb-5 p-3 border rounded"
              action="/edit-tabs.php?method=setTitle"
              data-flushinputs="false">

            <h3>Название серии</h3>

            <div class="form-group">
                <label for="title">Изменить название серии:</label>
                <input type="text" class="form-control mb-3 mt-3" id="title" aria-describedby="title" name="title" value="<?= $sortedAttrs['Обзор']['title'][0]['value'] ?? null ?>">
            </div>

            <button type="submit" class="btn btn-primary">Сохранить</button>
        </form>

        <form class="mb-5 p-3 border rounded" enctype="multipart/form-data"
              action="/edit-tabs.php?method=uploadImages"
              data-flushinputs="true">

            <h3>Картинки серии</h3>

            <div class="form-group">
                <label for="images[]">Добавить новую картинку:</label>
                <input type="file" accept="image/png,image/jpeg" multiple class="form-control mb-3 mt-3" id="images[]" aria-describedby="images[]">
            </div>

            <button type="submit" class="btn btn-primary">Добавить картинки</button>

            <p class="mt-3 mb-0">Загруженные картинки товара</p>
            <table class="table m-0" id="images-table">
                <thead>
                <tr>
                    <th scope="col">Картинка</th>
                    <th scope="col">Действие</th>
                </tr>
                </thead>
                <tbody>
                <?php if ( isset($sortedAttrs['Обзор']['image']) ): ?>
                    <?php foreach ($sortedAttrs['Обзор']['image'] as $image ): ?>
                        <tr id="attribute-<?= $image['id'] ?>">
                            <td>
                                <img class="img-thumbnail" src="<?= $image['href'] ?>" alt="">
                            </td>
                            <td>
                                <a class="text-danger delete-attribute"
                                   href="" data-id="<?= $image['id'] ?>"
                                   data-action="deleteWithFile" data-type="image"
                                >
                                    Удалить
                                </a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
                </tbody>
            </table>
        </form>

        <form class="mb-5 p-3 border rounded"
              action="/edit-tabs.php?method=setPrice"
              data-flushinputs="false">
            <h3>Цена серии</h3>

            <div class="form-group">
                <label for="price">Введите цену серии:</label>
                <input type="text" class="form-control mb-3 mt-3" id="price" aria-describedby="price" name="price" value="<?= $sortedAttrs['Обзор']['price'][0]['value'] ?? null ?>">
            </div>

            <button type="submit" class="btn btn-primary">Сохранить</button>
        </form>

        <form class="mb-5 p-3 border rounded"
              action="/edit-tabs.php?method=addInfo"
              data-flushinputs="true">
            <h3>Информация о серии</h3>

            <div class="form-group">
                <label for="info">Введите строку:</label>
                <input type="text" class="form-control mb-3 mt-3" id="info" aria-describedby="info" name="info">
            </div>

            <button type="submit" class="btn btn-primary">Добавить строку</button>

            <p class="mt-3 mb-0">Загруженная информация о серии</p>
            <table class="table m-0" id="info-table">
                <thead>
                <tr>
                    <th scope="col">Строка</th>
                    <th scope="col">Действие</th>
                </tr>
                </thead>
                <tbody>
                <?php if ( isset($sortedAttrs['Обзор']['info']) ): ?>
                    <?php foreach ($sortedAttrs['Обзор']['info'] as $row ): ?>
                        <tr id="attribute-<?= $row['id'] ?>">
                            <td>
                                <?= $row['value'] ?>
                            </td>
                            <td><a class="text-danger delete-attribute" href="" data-id="<?= $row['id'] ?>" data-action="deleteAttribute">Удалить</a></td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
                </tbody>
            </table>
        </form>

        <form class="mb-5 p-3 border rounded"
              action="/edit-tabs.php?method=uploadAttachment"
              data-flushinputs="true">
            <h3>Материалы</h3>
            <div class="form-group">
                <label for="attachment-file">Прикрепите файл:</label>
                <input type="file" class="form-control mb-3 mt-3" id="attachment-file" aria-describedby="attachment-file" name="attachment-file">
            </div>

            <div class="form-group">
                <label for="attachments-name">Имя файла:</label>
                <input type="text" class="form-control mb-3 mt-3" id="attachments-name" aria-describedby="attachments-name" name="attachments-name">
            </div>

            <div class="form-group">
                <label for="attachments-type">Тип файла</label>
                <select class="form-control mb-3 mt-3" id="attachments-type" name="attachments-type">
                    <option>pdf</option>
                    <option>dwg</option>
                    <option>3d</option>
                </select>
            </div>

            <button type="submit" class="btn btn-primary">Добавить файл</button>

            <p class="mt-3 mb-0">Загруженная информация о материалах</p>
            <table class="table m-0" id="attachments-table">
                <thead>
                <tr>
                    <th scope="col">Название файла</th>
                    <th scope="col">Тип</th>
                    <th scope="col">Размер</th>
                    <th scope="col">Действие</th>
                </tr>
                </thead>
                <tbody>
                <?php if ( isset($sortedAttrs['Обзор']['attachement']) ): ?>
                    <?php foreach ($sortedAttrs['Обзор']['attachement'] as $attachement ): ?>
                        <tr id="attribute-<?= $attachement['id'] ?>">
                            <td>
                                <a href="<?= $attachement['href'] ?>" download> <?= $attachement['value'] ?> </a>
                            </td>
                            <td><?= $attachement['type'] ?></td>
                            <td><?= $attachement['props'] ?></td>
                            <td><a class="text-danger delete-attribute" href="" data-id="<?= $attachement['id'] ?>" data-action="deleteWithFile" data-type="attachment">Удалить</a></td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
                </tbody>
            </table>
        </form>

        <form class="mb-5 p-3 border rounded"
              action="/edit-tabs.php?method=uploadInfoTable"
              data-flushinputs="true">
            <h3>Информационные таблицы</h3>
            <p>Загружает html таблицу и создает для нее новую вкладку</p>
            <div class="form-group">
                <label for="table-file">Прикрепите html файл с таблицей:</label>
                <input type="file" class="form-control mb-3 mt-3" id="table-file" accept="text/html" aria-describedby="table-file" name="table-file">
            </div>

            <div class="form-group">
                <label for="table-name">Имя вкладки:</label>
                <input type="text" class="form-control mb-3 mt-3" id="table-name" aria-describedby="table-name" name="table-name">
            </div>

            <button type="submit" class="btn btn-primary">Добавить таблицу</button>

            <p class="mt-3 mb-0">Загруженная информация о материалах</p>
            <table class="table m-0" id="attachments-table">
                <thead>
                <tr>
                    <th scope="col">Имя вкладки</th>
                    <th scope="col">Действие</th>
                </tr>
                </thead>
                <tbody>
                    <?php foreach ($sortedAttrs as $tableName => $tableProps ): ?>
                        <?php if ( $tableName !== 'Обзор' ): ?>
                            <tr id="attribute-<?= $tableProps['html'][0]['id'] ?>">
                                <td>
                                    <a href="<?= $tableProps['html'][0]['href'] ?>" download> <?= $tableName ?> </a>
                                </td>
                                <td>
                                    <a class="text-danger delete-attribute"
                                       href="" data-id="<?= $tableProps['html'][0]['id'] ?>"
                                       data-action="deleteWithFile" data-type="html"
                                    >
                                        Удалить
                                    </a>
                                </td>
                            </tr>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </form>
    </div>
</div>

</body>
</html>