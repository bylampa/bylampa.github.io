(function () {
    'use strict';

function button() {
 Lampa.Listener.follow('full', function(e) {
  if (e.type == 'complite') {
    setTimeout(function() {
     // $('.view--online_mod').each(function() {
        $('.view--online').each(function() {
        var $onmodButton = $(this);
        var $parent = $onmodButton.parent();
        var $firstChild = $parent.children().first();
            
         // Переместить .view--torrent в конец
        $parent.find('.view--torrent').appendTo($parent);
            
        if (!$onmodButton.is($firstChild)) {
          $onmodButton.prependTo($parent);
        }
      });
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
