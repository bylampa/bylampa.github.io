(function () {
    'use strict'

  function black_set_cont() {                            					
	  
	  Lampa.Settings.listener.follow('open', function (e) {
    if (e.name == 'add_plugin') {
       // const interval = setInterval(function() {
            // Используем более общий селектор для поиска элемента
            const component = $('.settings-param:has(.settings-param__name:contains("18+"))'); // Предположим, "18+" уникален
            if (component.length) {
                component.remove();
               // clearInterval(interval); // Остановить повторные попытки
            }
      //  }, 100); // Проверка каждые 100 мс
    }
});
  }
  
  if (window.appready) {
    black_set_cont();
} else {
    Lampa.Listener.follow('app', function(e) {
        if (e.type == 'ready') {
            black_set_cont();
        }
    });
}
              
})();
