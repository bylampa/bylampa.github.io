(function () {
    'use strict';
    Lampa.Platform.tv();
   
// Создаем новый элемент <style>
   var styleElem = document.createElement("style");
   styleElem.setAttribute("type", "text/css");

// Добавляем CSS-правила
  styleElem.innerHTML = `
  .full-descr__text {
    font-size: 18px;
  }
  .new-interface-info__description {
    font-size: 18px;
  }
`;

// Добавляем элемент <style> в DOM
document.head.appendChild(styleElem);

    

})();
