(function () {
    'use strict';
    Lampa.Platform.tv();

  Lampa.Listener.follow('full', function(e) {
  if (e.type == 'complite') {
    setTimeout(function() {
      var $viewTorrent = $('.view--torrent');
      if ($viewTorrent.length > 0) {
        $viewTorrent.insertBefore($('.button--play'));

        // Проверяем, есть ли на странице больше одного элемента '.view--torrent'
        // и удаляем лишние
        if ($viewTorrent.length > 1) {
          $viewTorrent.slice(1).remove();
        }
      }
      
      Lampa.Controller.toggle('full_start');
    }, 100);
  }
});


})();
