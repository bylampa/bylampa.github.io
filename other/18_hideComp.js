(function () {
    'use strict'

  function black_set_cont() {                            					
	  Lampa.Settings.listener.follow('open', function (e) {
		  if (e.name == 'add_plugin') {
		      setTimeout(function() {
			  $('div[data-component="add_sisi_plugin"]').remove();
		      }, 0)
		  }
    });		
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
