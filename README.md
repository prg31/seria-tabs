# seria-tabs

##Установка и запуск
 
Для установки для разработки:
````
npm run i
npm run watch
````
Production сборка
````
npm run prod
````
Для установки на production при копировании кода из репозитория
никаких npm команд не требуется.

Далее нужно установить миграцию из папки /migrations и заполнить ee,
открыв скрипт /edit-pages.php в браузере.  

Чтобы получить пользовательский шаблон табов, нужно запустить:
````
(new ProductTabAttributes($connection))->getProductTabs($seria_id, $info_list)
````
**$connection** - MYSQLI соединение ( new mysqli(...) )  
**$seria_id** - id серии  
**$info_list** - в шаблоне заменяет значения списка информации о 
серии из базы данных на $info_list. Массив. Ключи не важны

### Внимание!!!
При запуске программы с пустой базой данных возможны ошибки JS
в шаблоне пользователя!

##Разработка
Особых тонкостей нет, но стоит обратить внимание, что все стили, 
скрипты, svg в стилях и т.д. подключаются 
относительно папки **/build**, куда они попадюд после сборки из 
папки **/src**.