(function () {
    'use strict';
    Lampa.Platform.tv();

   Lampa.Listener.follow('full', function(e) {
      if (e.type == 'complite') {
       setTimeout(function(){
           $('.view--torrent').insertBefore($('.button--play'));
             if ($('.view--torrent').length > 1) $('.view--torrent')[1].hide();
           $(".view--torrent", Lampa.Activity.active().activity.render()).empty().append('&nbsp;&nbsp;Торренты');
          Lampa.Controller.toggle('full_start');
       },100);
     }
  })
})();
