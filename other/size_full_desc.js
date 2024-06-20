(function () {
    'use strict';
    Lampa.Platform.tv();


$(document).ready(function() {
  // Создаем и добавляем новый элемент <style>
  var styleElem = document.createElement('style');
  styleElem.type = 'text/css';
  styleElem.textContent = `
    .full-descr__text {
      font-size: 1.6em;
    }
    .items-line__title {
      font-size: 2.0em;
      margin-top 20px;
    }
  `;
  document.head.appendChild(styleElem);

  function setFontSize() {
    $(".new-interface-info__description").each(function() {
      $(this).css({
        "font-size": "1.6em",
        "width": "110%",
        //"margin-top": "-20px"
      });
    });
    $(".new-interface-info__details").each(function() {
      $(this).css({  
        "font-size": "1.4em"
      });
    });
  }

  setFontSize();

  // Регистрируем обработчик события, чтобы обновлять стиль при изменениях
  $(document).on("DOMSubtreeModified", ".new-interface-info__description", setFontSize);
});


  

})();
