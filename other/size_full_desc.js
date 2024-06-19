(function () {
    'use strict';
    Lampa.Platform.tv();
   
// Создаем новый элемент <style>
var styleElem = document.createElement('style');
styleElem.type = 'text/css';

// Добавляем CSS-правила
styleElem.textContent = `
  .new-interface-info__description {
    font-size: 18px;
  }
  .full-descr__text {
    font-size: 18px;
  }
`;

// Добавляем элемент <style> в DOM
document.head.appendChild(styleElem);
    

})();
