(function () {
    'use strict';
	
        var initMarker = 0;
	
      function hideIT(){

                document.addEventListener('DOMSubtreeModified', function removeAD(event){
		  var cardElements = document.getElementsByClassName('card');
		  if(cardElements.length > 0){
			if (initMarker == 0) {
			  initMarker = 1 // Флаг
			  setTimeout(function(){
 				  $('.selectbox-item__lock').parent().css('display', 'none');
				  $('.settings-param-title').last().css('display', 'none');
			  }, 50)
			  setTimeout(function(){
				  initMarker = 0 // Снимаем флаг
			  }, 500)
			}
		  }
		}, false);
		
		var myCardInterval = setInterval(function(){
			if (document.querySelector('.card') !== null) {
				$('.card').on('hover:long', function () {
						setTimeout(function(){	
							$('.selectbox-item__lock').parent().css('display', 'none');
							$('.settings-param-title').last().css('display', 'none');
						},50)
				})
				clearInterval(myCardInterval);
			 }
		}, 100);
		var myTextBoxInterval = setInterval(function(){
			if (document.querySelector('.card__textbox') !== null) {
				$('.card__textbox').parent().parent().remove();
				clearInterval(myTextBoxInterval);
			}
		}, 100);
	}
	
function cub_off() {

	 setTimeout(function(){
              $('.open--feed').remove();
              $('.open--premium').remove();
	      $('.open--notice').remove();
          }, 1000);

	  Lampa.Settings.listener.follow('open', function (e) {
             if (e.name == 'account') {
	        setTimeout(function(){
		    $('.settings--account-premium').remove()
		    $('div > span:contains("CUB Premium")').remove()
		},0);
             }
          });
	
	  Lampa.Listener.follow('full', function(e) {
                if (e.type == 'complite') {
		  $('.button--book').on('hover:enter', function(){
		    setTimeout(function(){	
			$('.selectbox-item__lock').parent().css('display', 'none');
			$('.settings-param-title').last().css('display', 'none');
		    },0)
		  });	  
                   setTimeout(function(){
			$('.button--subscribe').remove();
		   },0);
                }
          })   
  
          Lampa.Storage.listener.follow('change', function (event) {
               if (event.name == 'activity') {
	              if (Lampa.Activity.active().component === 'bookmarks') {
					$('.register:nth-child(4)').hide();
					$('.register:nth-child(5)').hide();
					$('.register:nth-child(6)').hide();
					$('.register:nth-child(7)').hide();
					$('.register:nth-child(8)').hide();
		       }
		       setTimeout(function(){
			hideIT();
		       }, 200)
                }
          });

}	
if(window.appready) cub_off();
	else {
		Lampa.Listener.follow('app', function(e) {
			if(e.type == 'ready') {
				cub_off(); hideIT();
				$("[data-action=feed]").eq(0).remove();
                                $("[data-action=subscribes]").eq(0).remove();
				
			}
		});
	}

})();
