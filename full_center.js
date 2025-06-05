(function() {
	'use strict';

var backend = 'http://212.113.103.137:7777';

var check_timer = setInterval(function(){
              if(typeof Lampa !== 'undefined'){
                  clearInterval(check_timer);
                  loadPlugin('full_center.js');
              }
   },200);



function loadPlugin(pluginName) {

    var xhr = new XMLHttpRequest();

    // Указываем метод и URL для загрузки плагина
    xhr.open('POST', backend + '/loadPlugin', true);
    xhr.setRequestHeader('Content-Type', 'application/json'); // Установка заголовка для JSON

    // Определяем, что делать при получении ответа от сервера
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Здесь приходит содержимое плагина, которое можно загрузить через Lampa.Utils.putScriptAsync
            var pluginUrl = URL.createObjectURL(new Blob([xhr.responseText], { type: 'application/javascript' }));

            // Используем putScriptAsync для загрузки плагина
            Lampa.Utils.putScriptAsync([pluginUrl], function () {
               // console.log("Плагин загружен успешно: " + pluginName); // Успешная загрузка плагина
               // Lampa.Noty.show("Плагин загружен успешно: " + pluginName);
            });
        } else {
           // console.error('Ошибка загрузки плагина:', xhr.statusText);
           // Lampa.Noty.show("Ошибка загрузки плагина: " + xhr.responseText);
           location.reload();
        }
    };

    // Обработка ошибки сети
    xhr.onerror = function() {
        console.error('Ошибка сети при загрузке плагина');
        Lampa.Noty.show("Ошибка сети загрузки плагина!");
    };

    // Проверяем, есть ли у клиента ваше приложение
    var isMyApp = Lampa.Manifest ? Lampa.Manifest.origin : 'unknown'; // Устанавливаем origin

    // Подготавливаем данные для отправки
    var requestData = {
        origin: isMyApp,
        pluginName: pluginName // Устанавливаем имя плагина
    };

    // Отправляем данные в теле запроса
    xhr.send(JSON.stringify(requestData));
}


})();
