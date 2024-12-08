(function () {
    'use strict'

  function black_set_cont() {                            					
	  Lampa.Settings.listener.follow('open', function (e) {
		  if (e.name == 'main') {
		      setTimeout(function() {
			  $('div[data-component="add_sisi_plugin"]').remove();
			      e.body.find('[data-component="add_sisi_plugin"]').remove();
		      }, 1000)
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
