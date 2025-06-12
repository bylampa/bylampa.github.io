(function () {
  'use strict';

 function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor) {
      throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

// Класс для управления временем
var Time = /*#PURE*/function () {
    function Time() {
        _classCallCheck(this, Time);
        
        this.time_offset = 0; // Здесь можно установить сдвиг времени, если необходимо
        this.time_start = Date.now(); // Устанавливаем текущее время как начальное
        this.updates = [];

        // Устанавливаем интервал для обновления
        setInterval(() => {
            this.updates.forEach(call => {
                call(this.left());
            });
        }, 1000 * 10); // 10 секунд
    }

    _createClass(Time, [{
        key: "get",
        value: function get() {
            // Возвращаем текущее время с учетом временного смещения
            return Date.now() + this.time_offset;
        }
    }, {
        key: "left",
        value: function left(add_hours = 0) {
            // Считаем оставшееся время до события
            return this.time_start + (add_hours ? 1000 * 60 * 60 * add_hours : 0) - this.get();
        }
    }, {
        key: "addUpdate",
        value: function addUpdate(call) {
            this.updates.push(call);
        }
    }, {
        key: "removeUpdate",
        value: function removeUpdate(call) {
            const index = this.updates.indexOf(call);
            if (index > -1) {
                this.updates.splice(index, 1); // Удаляем функцию обратного вызова из массива
            }
        }
    }]);

    return Time;
}();

// Создаем экземпляр класса Time
var Time$1 = new Time();

// Класс для статистики
var Stat = /*#PURE*/function () {
    function Stat() {
        _classCallCheck(this, Stat);
        
        this.ready_index = {};
    }

    _createClass(Stat, [{
        key: "send",
        value: function send(index) {
            // Простая функция для обработки статистики без внешнего API
            if (this.ready_index[index]) return; // Игнорируем повторные вызовы
            this.ready_index[index] = true; // Отмечаем индекс как обработанный
            console.log(`Статистика отправлена для индекса: ${index}`);
        }
    }]);

    return Stat;
}();

// Создаем экземпляр класса Stat
var Stat$1 = new Stat();

// Функция для генерации случайного числа
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var Card = /*#PURE*/function () {
    function Card(params) {
        _classCallCheck(this, Card);
        this.params = params;
        this.startTime = Date.now();
    }

    _createClass(Card, [{
        key: "create",
        value: function create() {
            var _this = this;

            this.card = $("<div class=\"card selector layer--visible layer--render card--small card--wide\">\n                <div class=\"cardview\" style=\"margin-bottom: 1em;\">\n                    <img class=\"card__img\">\n                    <div class=\"cardpromo\">\n                        <div class=\"cardpromo-title\"></div>\n                        <div class=\"cardpromo-text\"></div>\n                    </div>\n                </div>\n                <div class=\"cardtitle\">".concat(Lampa.Lang.translate('broadcast_final_title'), "</div>\n                <div class=\"card__age\">2025</div>\n            </div>"))[0];
            
            this.img = this.card.querySelector('.card__img') || {};
            this.card.querySelector('.card__promo-title').innerText = '';
            this.card.querySelector('.card__promo-text').innerText = '';
            
            // Устанавливаем обработчики событий
            this.card.addEventListener('hover:enter', function () {
                var timeLeft = Time$1.left();
                if (timeLeft < -(1000 * 60 * 60 * Defined.hours)) {
                    Lampa.Bell.push({ text: Lampa.Lang.translate('broadcast_final_end') });
                } else if (timeLeft <= 0) {
                    // Начинаем воспроизведение
                    var channel = {
                        url: Lampa.Utils.protocol() + 'cdn.streamka.in/live/a7b3kzq1/playlist.m3u8',
                        name: Lampa.Lang.translate('broadcast_final_title'),
                        group: Lampa.Lang.translate('title_now_watch'),
                        icons: [],
                        position: 0,
                        total: 1
                    };
                    Lampa.Player.programReady({ channel: channel, position: 0, total: 1 });
                    Lampa.Bell.push({ text: Lampa.Lang.translate('ad') });
                } else {
                    Lampa.Bell.push({ text: Lampa.Lang.translate('broadcast_final_start_not_yet') });
                }
            });

            // Другие обработчики событий
            this.card.addEventListener('hover:focus', function () {
                if (_this.onFocus) _this.onFocus(_this.card, {});
            });
            this.card.addEventListener('hover:touch', function () {
                if (_this.onTouch) _this.onTouch(_this.card, {});
            });

            // Обновляем видимость, изображение и время
            this.visible();
            this.image();
            this.timeLeft = this.updateTimeLeft.bind(this);
            Time$1.addUpdate(this.timeLeft);
            this.updateTimeLeft(Time$1.left());
        }
    }, {
        key: "updateTimeLeft",
        value: function updateTimeLeft(seconds_left) {
            this.card.querySelector('.card__promo-text').innerText = seconds_left > 1000 ? 
                Lampa.Lang.translate('title_left') + ': ' + Lampa.Utils.secondsToTimeHuman(seconds_left / 1000) : Lampa.Lang.translate(seconds_left < -(1000 * 60 * 60 * Defined.hours) ? 'broadcast_final_end' : 'broadcast_final_started');
        }
    }, {
        key: "image",
        value: function image() {
            var _this2 = this;

            this.img.onload = function () {
                _this2.card.classList.add('img--loaded');
            };

            this.img.onerror = function () {
                _this2.img.src = './img/img_broken.svg'; // Замените путь к изображению при ошибке загрузки
            };
        }
    }, {
        key: "visible",
        value: function visible() {
            this.img.src = Lampa.Utils.protocol() + Lampa.Manifest.cub_domain + Defined.poster; // Устанавливаем изображение карточки
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this.img.onerror = function () {}; // Убираем обработчик ошибок
            this.img.onload = function () {}; // Убираем обработчик загрузки
            this.img.src = ''; // Очищаем изображение
            this.card.remove(); // Удаляем элемент карточки из DOM
            this.card = null; // Освобождаем память
            this.img = null; // Освобождаем память
            Time$1.removeUpdate(this.timeLeft); // Удаляем обновления времени
        }
    }, {
        key: "render",
        value: function render(js) {
            return js ? this.card : $(this.card); // Возвращаем карточку в нужном формате
        }
    }]);

    return Card;
}();

function startPlugin() {
    window.broadcast_plugin_ready = true;
    Lampa.Lang.add({
      broadcast_final_title: {
        ru: 'F1 Гран-при Испании',
        uk: 'F1 Гран-прі Іспанії',
        be: 'F1 Гран-пры Іспаніі',
        en: 'F1 Spanish Grand Prix'
      },
      broadcast_final_program: {
        ru: 'Нет программы',
        uk: 'Немає програми',
        be: 'Няма праграмы',
        en: 'No program'
      },
      broadcast_final_bell_60: {
        ru: 'До начала трансляции осталось 60 минут.',
        uk: 'До початку трансляції залишилось 60 хвилин.',
        be: 'Да пачатку трансляцыі засталося 60 хвілін.',
        en: '60 minutes left until the broadcast starts.'
      },
      broadcast_final_bell_10: {
        ru: 'До начала трансляции осталось 10 минут.',
        uk: 'До початку трансляції залишилось 10 хвилин.',
        be: 'Да пачатку трансляцыі засталося 10 хвілін.',
        en: '10 minutes left until the broadcast starts.'
      },
      broadcast_final_start_not_yet: {
        ru: 'Трансляция еще не началась. Пожалуйста, подождите.',
        uk: 'Трансляція ще не почалася. Будь ласка, зачекайте.',
        be: 'Трансляцыя яшчэ не пачалася. Калі ласка, пачакайце.',
        en: 'The broadcast has not started yet. Please wait.'
      },
      broadcast_final_started: {
        ru: 'Трансляция началась! Присоединяйтесь к просмотру.',
        uk: 'Трансляція почалася! Приєднуйтесь до перегляду.',
        be: 'Трансляцыя пачалася! Далучайцеся да прагляду.',
        en: 'The broadcast has started! Join the viewing.'
      },
      broadcast_final_end: {
        ru: 'Трансляция завершена.',
        uk: 'Трансляція завершена.',
        be: 'Трансляцыя завершана.',
        en: 'The broadcast has ended.'
      }
    });

  Lampa.Listener.follow('line', function (e) {
    if (e.type == 'create' && e.data.title == Lampa.Lang.translate('title_now_watch') && Time$1.left(Defined.hours + 4) > 0) {
        // Создаем новую карточку
        Lampa.Arrays.insert(e.data.results, 0, {
            cardClass: function cardClass() {
                return new Card({});
            }
        });
    }
});

var noti_60 = false;
var noti_10 = false;

Time$1.addUpdate(function (seconds_left) {
    var minutesLeft = Math.floor(seconds_left / 60000);

    if (minutesLeft < 60 && minutesLeft >= 50) {
        if (!noti_60) {
            noti_60 = true;
            Lampa.Bell.push({
                text: Lampa.Lang.translate('broadcast_final_bell_60') // Уведомление за 60 минут
            });
        }
    } else if (minutesLeft < 10 && minutesLeft >= 5) {
        if (!noti_10) {
            noti_10 = true;
            Lampa.Bell.push({
                text: Lampa.Lang.translate('broadcast_final_bell_10') // Уведомление за 10 минут
            });
        }
    } else if (minutesLeft >= 60) {
        noti_60 = false; // Сбрасываем уведомление за 60 минут
        noti_10 = false; // Сбрасываем уведомление за 10 минут
    }
});

}

  if (!window.broadcast_plugin_ready) startPlugin();

})();
