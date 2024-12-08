(function () {
    'use strict'

  function remove_comp() {                            					
	  
	  Lampa.Settings.listener.follow('open', function (e) {
            if (e.name == 'add_plugin') {
            // Используем более общий селектор для поиска элемента
             var component = $('.settings-param:has(.settings-param__name:contains("18+"))'); // Предположим, "18+" уникален
                if (component.length) {
                   component.remove();
                }
             }
          });
}
  
  if (window.appready) {
    remove_comp();
} else {
    Lampa.Listener.follow('app', function(e) {
        if (e.type == 'ready') {
            remove_comp();
        }
    });
}
              
})();
