(function () {
    'use strict';
    Lampa.Platform.tv();
   
// Создаем новый элемент <style>
   var styleEl = document.createElement("style");
   styleEl.setAttribute("type", "text/css");

// Добавляем CSS-правила
  styleEl.innerHTML = '
  .full-descr__text {
    font-size: 18px;
  }
';

// Добавляем элемент <style> в DOM
document.head.appendChild(styleEl);

})();
