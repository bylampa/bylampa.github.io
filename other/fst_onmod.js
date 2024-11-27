(function () {
    'use strict';

function button() {
 Lampa.Listener.follow('full', function(e) {
  if (e.type == 'complite') {
    setTimeout(function() {
     $('.view--online_mod').each(function() {
    
        var $onmodButton = $(this);
        var $parent = $onmodButton.parent();
        var $firstChild = $parent.children().first();
            
        // Переместить элементы .view--torrent перед .button--book
       // $parent.find('.view--torrent').insertBefore($parent.find('.button--book'));
            
        if (!$onmodButton.is($firstChild)) {
          $onmodButton.prependTo($parent);
        }
      });
      var $viewTorrent = $('.view--torrent');
      if ($viewTorrent.length > 0) {
        $viewTorrent.insertBefore($('.button--book'));

        // Проверяем, есть ли на странице больше одного элемента '.view--torrent'
        // и удаляем лишние
        if ($viewTorrent.length > 1) {
          $viewTorrent.slice(1).remove();
        }
      }
     Lampa.Controller.toggle('full_start');
    }, 10);
  }
 });
}

if (window.appready) button();
       else {
           Lampa.Listener.follow('app', function(e) {
               if (e.type == 'ready') {
                  button();
               }
            });
        }

})();
