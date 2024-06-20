(function () {
    'use strict';
    Lampa.Platform.tv();


/*$(document).ready(function() {
  // Создаем и добавляем новый элемент <style>
  var styleElem = document.createElement('style');
  styleElem.type = 'text/css';
  styleElem.textContent = `
    .full-descr__text {
      font-size: 18px;
    }
  `;
  document.head.appendChild(styleElem);

  function setFontSize() {
    $(".new-interface-info__description").each(function() {
      $(this).css({
        "font-size": "38px"
      });
    });
  }

  setFontSize();

  // Регистрируем обработчик события, чтобы обновлять стиль при изменениях
  $(document).on("DOMSubtreeModified", ".new-interface-info__description", setFontSize);
});
*/
   $(document).ready(function() {
  function setFontSize() {
    $(".new-interface-info__description, .full-descr__text").each(function() {
      $(this).css({
        "font-size": ""  // Сбрасываем ранее установленный размер шрифта
      });
    });

    // Применяем стили в зависимости от типа устройства
    if (Lampa.Platform.screen('mobile')) {
      $(".new-interface-info__description").css({
        "font-size": "32px !important"
      });
      $(".full-descr__text").css({
        "font-size": "32px !important"
      });
    } else {
      $(".new-interface-info__description").css({
        "font-size": "18px !important"
      });
      $(".full-descr__text").css({
        "font-size": "18px !important"
      });
    }
  }

  setFontSize();

  // Регистрируем обработчик события, чтобы обновлять стиль при изменениях
  $(document).on("DOMSubtreeModified", ".new-interface-info__description, .full-descr__text", setFontSize);
});


})();
