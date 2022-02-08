<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
    <title>Изменить аттрибуты серии</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</head>

<body>

<main>

    <form class="m-5" action="/edit-tabs.php" method="post">
        <div class="form-group mb-3">
            <label for="seria-id">Введите номер серии продукта:</label>
            <input type="text" class="form-control" id="seria-id" aria-describedby="seria-id" name="seria-id">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</main>

</body>
</html>