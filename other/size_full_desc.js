(function () {
    'use strict';
    Lampa.Platform.tv();
   
/*// Создаем новый элемент <style>
   var styleEl = document.createElement("style");
   styleEl.setAttribute("type", "text/css");

// Добавляем CSS-правила
  styleEl.innerHTML = `
  .full-descr__text {
    font-size: 18px;
  }
  .new-interface-info__description {
    font-size: 18px;
  }
`;

// Добавляем элемент <style> в DOM
document.head.appendChild(styleEl);*/

    // Получаем элементы по селекторам
var fullDescrText = $(".full-descr__text");
var newInterfaceInfoDescription = $(".new-interface-info__description");

// Устанавливаем CSS-стили для этих элементов
fullDescrText.css({
  "font-size": "18px"
});

newInterfaceInfoDescription.css({
  "font-size": "18px"
});

})();
