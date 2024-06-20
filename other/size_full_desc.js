(function () {
    'use strict';
    Lampa.Platform.tv();

function startPlugin() {

$(".new-interface-info__description").css({"font-size": "18px"});
    
// Создаем новый элемент <style>
var styleElem = document.createElement('style');
styleElem.type = 'text/css';

// Добавляем CSS-правила
styleElem.textContent = `
  .full-descr__text {
    font-size: 18px;
  }
`;

// Добавляем элемент <style> в DOM
document.head.appendChild(styleElem);
}
   if (window.appready) { 
       startPlugin();
   }
   else {
        Lampa.Listener.follow('app', function(e) {
            // если приложение прогрузилось
            if (e.type == 'ready') {
                startPlugin();
            }
        });
    } 

})();
