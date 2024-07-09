(function () {
    'use strict';
    Lampa.Platform.tv();

  Lampa.Listener.follow('full', function(e) {
  if (e.type == 'complite') {
    setTimeout(function() {
      $('.view--torrent').insertBefore($('.button--play'));

      // Проверяем, есть ли на странице больше одного элемента '.view--torrent'
      // и удаляем лишние
      var $viewTorrents = $('.view--torrent');
      if ($viewTorrents.length > 1) {
        $viewTorrents.slice(1).remove();
      }

      Lampa.Controller.toggle('full_start');
    }, 100);
  }
});

})();
