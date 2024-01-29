(function () {
    'use strict';
    
    function WeatherInterface() {
        var html;
        var network = new Lampa.Reguest();

        this.create = function () {
            html = $('<div class="weather-widget">' +
                    '<div class="weather-temp" id="weather-temp"> </div>' +
                    '<div class="weather-condition" id="weather-condition"></div>' +
                    '</div>');
        };

        this.getWeatherData = function (position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            var API_KEY = "46a5d8546cc340f69d9123207242801";
			var url = 'http://api.weatherapi.com/v1/current.json?key=46a5d8546cc340f69d9123207242801&q=' +  lat + ',' + lon + '&lang=ru&aqi=no';

            network.clear();
            network.timeout(5000);
            network.silent(url, processWeatherData, processError);
        };

        function processWeatherData(result) {
            var data1 = result.location;
            var data2 = result.current;
            var temp = Math.floor(data2.temp_c); // Температура
				console.log("Погода", "Температура: " + temp)
            var condition = data2.condition.text;// Обстановка
				console.log("Погода", "Обстановка: " + condition)

            $('#weather-temp').text(temp + '°');
            $('#weather-condition').text(condition).toggleClass('long-text', condition.length > 10);
        }

        function processError() {
            console.log('Error retrieving weather data');
        }

        this.getWeatherByIP = function () {
            $.get("http://ip-api.com/json", function (locationData) {
                console.log("Погода", "Город: " + locationData.city);
                var coords = locationData.lat + ',' + locationData.lon;
                var position = {
                    coords: {
                        latitude: parseFloat(locationData.lat),
                        longitude: parseFloat(locationData.lon)
                    }
                };
                console.log("Погода", "Долгота: " + position.coords.latitude + ", " + "Широта: " + position.coords.longitude)
				this.getWeatherData(position);
            }
                .bind(this));
        };

        this.getWeather = function () {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    this.getWeatherData.bind(this),
                    this.getWeatherByIP.bind(this));
            } else {
                this.getWeatherByIP();
            }
        };

        this.render = function () {
            return html;
        };

        this.destroy = function () {
            if (html) {
                html.remove();
                html = null;
            }
        };
    }

    var weatherInterface = new WeatherInterface();
    var isTimeVisible = true;

    $(document).ready(function () {
	setTimeout(function(){
        // Создаем интерфейс погоды
        weatherInterface.create();
        var weatherWidget = weatherInterface.render();
        $('.head__time').after(weatherWidget);

        // Функция для переключения между отображением времени и виджета погоды
        function toggleDisplay() {
            if (isTimeVisible) {
                $('.head__time').hide();
                $('.weather-widget').show();
            } else {
                $('.head__time').show();
                $('.weather-widget').hide();
            }
            isTimeVisible = !isTimeVisible;
        }

        // Устанавливаем интервал для переключения между временем и погодой каждые 10 секунд
        setInterval(toggleDisplay, 10000);

        // Получаем начальные данные о погоде
        weatherInterface.getWeather();

        // Скрываем виджет погоды при загрузке страницы
        $('.weather-widget').hide();
		var width_element = document.querySelector('.head__time');
		console.log(width_element.offsetWidth);
		$('.weather-widget').css('width', width_element.offsetWidth + 'px');
		$('.head__time').css('width', width_element.offsetWidth + 'px');
    },5000)
	});
	
})();
