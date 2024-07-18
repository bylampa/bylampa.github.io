(function() {
	'use strict';

         function mainSet() {
    // Массив с CSS-файлами для разных цветов
    var CSS_FILES = {
        red_stroke: 'https://bylampa.github.io/themes/red_stroke.css',
        pink_stroke: 'https://bylampa.github.io/themes/pink_stroke.css',
        orange_stroke: 'https://bylampa.github.io/themes/orange_stroke.css',
        green_stroke: 'https://bylampa.github.io/themes/green_stroke.css',
        dark_blue_stroke: 'https://bylampa.github.io/themes/dark_blue_stroke.css',
        violet_stroke: 'https://bylampa.github.io/themes/violet_stroke.css',
        immersive_garden: 'https://bylampa.github.io/themes/immersive_garden.css',
        copenhagen: 'https://bylampa.github.io/themes/copenhagen.css',
        authentic_brief: 'https://bylampa.github.io/themes/authentic_brief.css'
    };

    function changeInterfaceColor(cssFile) {
        // Удаляем наши CSS-файлы, кроме стандартного
        $('link[rel="stylesheet"][href^="https://bylampa.github.io/themes/"]').remove();

        // Загрузка нового CSS-файла, если он задан
        if (cssFile) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = cssFile;
            document.head.appendChild(link);
        }
    }

    // Получение ранее сохраненного значения из хранилища
    var savedColor = localStorage.getItem('interfaceColor') || 'no';

    // Применяем сохраненный цвет интерфейса сразу после загрузки приложения
    changeInterfaceColor(savedColor !== 'no' ? CSS_FILES[savedColor] : null);

    Lampa.SettingsApi.addParam({
        component: 'interface',
        param: {
            name: 'Color_interface',
            type: 'select',
            values: {
                no: 'Стандартная',
                red_stroke: 'С красной обводкой',
                pink_stroke: 'С розовой обводкой',
                orange_stroke: 'С оранжевой обводкой',
                green_stroke: 'С зеленой обводкой',
                dark_blue_stroke: 'С синей обводкой',
                violet_stroke: 'С фиолетовой обводкой',
                immersive_garden: 'Immersive Garden',
                copenhagen: 'Copenhagen',
                authentic_brief: 'Authentic Brief'
            },
            default: 'no'
        },
        field: {
            name: 'Цветовая схема',
            description: 'Нажмите для выбора'
        },
        onChange: function(value) {
            // Сохранение выбранного цвета в хранилище
            localStorage.setItem('interfaceColor', value);

            // Загрузка нового CSS-файла, если выбран цвет, отличный от "Стандартная"
            changeInterfaceColor(value !== 'no' ? CSS_FILES[value] : null);
        },
        onRender: function(item) {
            setTimeout(function() {
                $('div[data-name="Color_interface"]').insertAfter('div[data-name="interface_size"]');
            }, 0);
        }
    });
}

if (window.appready) {
    mainSet();
} else {
    Lampa.Listener.follow('app', function(e) {
        // если приложение прогрузилось
        if (e.type == 'ready') {
            mainSet();
        }
    });
}

})();
