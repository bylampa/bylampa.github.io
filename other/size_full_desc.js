(function () {
    'use strict';
    Lampa.Platform.tv();

function startPlugin() {

$(document).ready(function() {
  function setFontSize() {
    $(".new-interface-info__description").each(function() {
      $(this).css({
        "font-size": "18px"
      });
    });
  }

  setFontSize();

  // Регистрируем обработчик события, чтобы обновлять стиль при изменениях
  $(document).on("DOMSubtreeModified", ".new-interface-info__description", setFontSize);
});

    
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
    } */

})();
