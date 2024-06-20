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
  // Создаем и добавляем новый элемент <style>
  var styleElem = document.createElement('style');
  styleElem.type = 'text/css';

  // Определяем CSS-правила для разных размеров устройств
  var cssRules = `
    @media (max-width: 767px) {
      .new-interface-info__description {
        font-size: 16px !important;
      }
      .full-descr__text {
        font-size: 14px !important;
      }
    }
    @media (min-width: 768px) and (max-width: 1199px) {
      .new-interface-info__description {
        font-size: 24px !important;
      }
      .full-descr__text {
        font-size: 18px !important;
      }
    }
    @media (min-width: 1200px) {
      .new-interface-info__description {
        font-size: 32px !important;
      }
      .full-descr__text {
        font-size: 22px !important;
      }
    }
  `;

  // Добавляем CSS-правила в элемент <style>
  styleElem.textContent = cssRules;

  // Добавляем элемент <style> в DOM
  document.head.appendChild(styleElem);

  function setFontSize() {
    $(".new-interface-info__description, .full-descr__text").each(function() {
      $(this).css({
        "font-size": ""  // Сбрасываем ранее установленный размер шрифта
      });
    });
  }

  setFontSize();

  // Регистрируем обработчик события, чтобы обновлять стиль при изменениях
  $(document).on("DOMSubtreeModified", ".new-interface-info__description, .full-descr__text", setFontSize);
});

});

   


})();
