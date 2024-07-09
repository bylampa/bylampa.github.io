(function () {
    'use strict';
    Lampa.Platform.tv();

   Lampa.Listener.follow('full', function(e) {
      if (e.type == 'complite') {
          if ($('.view--torrent').length > 1) $('.view--torrent')[1].hide();
       setTimeout(function(){
           $('.view--torrent').insertBefore($('.button--play'));  
           //$(".view--torrent", Lampa.Activity.active().activity.render()).empty().append('&nbsp;&nbsp;Торренты');
          Lampa.Controller.toggle('full_start');
       },100);
     }
  })
})();
