(function () {
    'use strict'

  function black_set_cont() {                            					
	  if (Lampa.Storage.get('black_style') == true) {						
		    $('.settings__content').css({
             'background': '#000'
        });
	  }							
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
