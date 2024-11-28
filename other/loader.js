(function () {
    'use strict';

function loader_start() {

// Создаем новый элемент <style>
var style = document.createElement('style');
style.type = 'text/css';

// Добавляем CSS-код в элемент <style> в формате обычной строки
style.appendChild(document.createTextNode(
    '.activity__loader { ' +
    'position: absolute; ' +
    'top: 0; ' +
    'left: 0; ' +
    'width: 100%; ' +
    'height: 100%; ' +
    'display: none; ' +
    'background: url(http://bylampa.online/img/loader.svg) no-repeat 50% 50%; ' +
    '}'
));

// Добавляем элемент <style> в <head> документа
document.head.appendChild(style);

}

if (window.appready) loader_start();
       else {
           Lampa.Listener.follow('app', function(e) {
               if (e.type == 'ready') {
                  loader_start();
               }
            });
        }

})();
