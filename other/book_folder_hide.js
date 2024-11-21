 (function () {
    'use strict';

 function bookmarks_folder() {       
		
		Lampa.Storage.listener.follow('change', function(event) {
            if (event.name == 'activity') {
                if (Lampa.Activity.active().component === 'bookmarks') {
                    $('.bookmarks-folder__inner').parent().remove();
                }
            }
        });
		
}

if (window.appready) bookmarks_folder();
       else {
           Lampa.Listener.follow('app', function(e) {
               if (e.type == 'ready') {
                  bookmarks_folder();
               }
            });
        }

})();
