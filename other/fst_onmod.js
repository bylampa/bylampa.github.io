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

        if (!$onmodButton.is($firstChild)) {
          $onmodButton.prependTo($parent);
        }
      });
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
