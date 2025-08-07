(function () {
    'use strict';
  
   Lampa.Platform.tv();

   var icon_server_reload = '<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.4800000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4,12a1,1,0,0,1-2,0A9.983,9.983,0,0,1,18.242,4.206V2.758a1,1,0,1,1,2,0v4a1,1,0,0,1-1,1h-4a1,1,0,0,1,0-2h1.743A7.986,7.986,0,0,0,4,12Zm17-1a1,1,0,0,0-1,1A7.986,7.986,0,0,1,7.015,18.242H8.757a1,1,0,1,0,0-2h-4a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V19.794A9.984,9.984,0,0,0,22,12,1,1,0,0,0,21,11Z" fill="currentColor"></path></g></svg></div>';
		
   function reload() {
	
	    var reloadSVG = icon_server_reload
	    var reloadBUTT = '<div id="RELOAD" class="head__action selector redirect-screen">' + reloadSVG + '</div>';
	
	    $('#app > div.head > div > div.head__actions').append(reloadBUTT);
	    // $('#RELOAD').insertAfter('div[class="head__action selector open--settings"]');
	
	    $('#RELOAD').on('hover:enter hover:click hover:touch', function() {
		     location.reload();
	    });
     
  } 
  
  if(window.appready) reload();
	else {
		Lampa.Listener.follow('app', function(e) {
			if(e.type == 'ready') {
				reload();
			}
	  });
	}
	 
})();
