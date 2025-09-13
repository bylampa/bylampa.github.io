(function () {
    'use strict';

    /*Lampa.Platform.tv();

    window.lampa_settings.disable_features.trailers = true;
    */

    Lampa.Listener.follow('full', function (e) {
        if (e.type == 'complite') {
            e.object.activity.render().find('.view--trailer').remove();
        }
    });


})();
