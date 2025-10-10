(function() {
  'use strict';

  var fxapi_token = Lampa.Storage.get('fxapi_token', '');
  var unic_id = Lampa.Storage.get('fxapi_uid', '');
  if (!unic_id) {
    unic_id = Lampa.Utils.uid(16);
    Lampa.Storage.set('fxapi_uid', unic_id);
  }
  
  var proxy_url = 'http://cors.cfhttp.top/';
  var api_url = 'http://filmixapp.vip/api/v2/';
  var dev_token = 'user_dev_apk=2.0.1&user_dev_id=' + unic_id + '&user_dev_name=Lampa&user_dev_os=11&user_dev_vendor=FXAPI&user_dev_token=';
  var modalopen = false;
  var ping_auth;

  function fxapi(component, _object) {
    var network = new Lampa.Reguest();
    var extract = {};
    var results = [];
    var object = _object;
    var wait_similars;
    var filter_items = {};
    var choice = {
      season: 0,
      voice: 0,
      voice_name: ''
    };

    if (!fxapi_token) {
      var user_code = '';
      var user_token = '';
	  modalopen = true;

      var modal = $('<div><div class="broadcast__text">' + Lampa.Lang.translate('modal_text') + '</div><div class="broadcast__device selector" style="text-align: center; background-color: darkslategrey; color: white;">' + Lampa.Lang.translate('modal_wait') + '...</div><br><div class="broadcast__scan"><div></div></div></div></div>');
		
		function openModal(){
			var contrl = Lampa.Controller.enabled().name
			Lampa.Modal.open({
	        title: '',
	        html: modal,
	        onBack: function onBack() {
	          Lampa.Modal.close();
	          clearInterval(ping_auth);
			  Lampa.Controller.toggle(contrl)
	        },
	        onSelect: function onSelect() {
	          Lampa.Utils.copyTextToClipboard(user_code, function() {
	            Lampa.Noty.show(Lampa.Lang.translate('copy_secuses'));
	          }, function() {
	            Lampa.Noty.show(Lampa.Lang.translate('copy_fail'));
	          });
	        }
	      });
		}

      ping_auth = setInterval(function() {
        network.silent(Lampa.Utils.addUrlComponent(api_url + 'user_profile', dev_token + user_token), function(json) {
          if (json && json.user_data) {
            Lampa.Modal.close();
            clearInterval(ping_auth);
            Lampa.Storage.set("fxapi_token", user_token);
            window.location.reload();
          }
        }, function(a, c) {});
      }, 2000);
		
      network.quiet(Lampa.Utils.addUrlComponent(api_url + 'token_request', dev_token), function(found) {
        if (found.status == 'ok') {
          user_token = found.code;
          user_code = found.user_code;
          modal.find('.selector').text(user_code);
		  if(!$('.modal').length) openModal()
        } else {
          Lampa.Noty.show(found);
        }
      }, function(a, c) {
        Lampa.Noty.show(network.errorDecode(a, c));
      });

      component.loading(false);
      return;
    }

    this.search = function(_object, sim) {
      if (wait_similars) this.find(sim[0].id);
    };
	
    function normalizeString(str) {
      return str.toLowerCase().replace(/[^a-zа-я0-9]/g, '');
    }

    this.searchByTitle = function(_object, query) {
      var _this = this;

      object = _object;
      var year = parseInt((object.movie.release_date || object.movie.first_air_date || '0000').slice(0, 4));
      var orig = object.movie.original_name || object.movie.original_title;
      var url = api_url + 'search';
      url = Lampa.Utils.addUrlComponent(url, 'story=' + encodeURIComponent(query));
      url = Lampa.Utils.addUrlComponent(url, dev_token + fxapi_token);
      network.clear();
      network.silent(url, function(json) {
        var cards = json.filter(function(c) {
          c.year = parseInt(c.alt_name.split('-').pop());
          return c.year > year - 2 && c.year < year + 2;
        });
        var card = cards.find(function(c) {
          return c.year == year && normalizeString(c.original_title) == normalizeString(orig);
        });

        if (!card && cards.length == 1) card = cards[0];
        if (card) _this.find(card.id);
        else if (json.length) {
          wait_similars = true;
          component.similars(json);
          component.loading(false);
        } else component.doesNotAnswer();
      }, function(a, c) {
        component.doesNotAnswer();
      });
    };

    this.find = function(filmix_id) {
      var url = proxy_url + api_url;

      end_search(filmix_id);

      function end_search(filmix_id) {
        network.clear();
        network.timeout(10000);
        network.silent(url + 'post/' + filmix_id + '?' + dev_token + fxapi_token, function(found) {
          if (found && Object.keys(found).length) {
            success(found);
            component.loading(false);
          } else component.doesNotAnswer();
        }, function(a, c) {
          component.doesNotAnswer();
        });
      }
    };

    this.extendChoice = function(saved) {
      Lampa.Arrays.extend(choice, saved, true);
    };

    this.reset = function() {
      component.reset();
      choice = {
        season: 0,
        voice: 0,
        voice_name: ''
      };
      extractData(results);
      filter();
      append(filtred());
    };

    this.filter = function(type, a, b) {
      choice[a.stype] = b.index;
      if (a.stype == 'voice') choice.voice_name = filter_items.voice[b.index];
      component.reset();
      extractData(results);
      filter();
      append(filtred());
    };

    this.destroy = function() {
      network.clear();
      results = null;
    };

    function success(json) {
      results = json;
      extractData(json);
      filter();
      append(filtred());
    }

    function extractData(data) {
      extract = {};
      var pl_links = data.player_links;

      if (pl_links.playlist && Object.keys(pl_links.playlist).length > 0) {
        var seas_num = 0;

        for (var season in pl_links.playlist) {
          var episode = pl_links.playlist[season];
          ++seas_num;
          var transl_id = 0;

          for (var voice in episode) {
            var episode_voice = episode[voice];
            ++transl_id;
            var items = [];

            for (var ID in episode_voice) {
              var file_episod = episode_voice[ID];
              var quality_eps = file_episod.qualities.filter(function(qualitys) {
                return qualitys <= window.fxapi.max_qualitie;
              });
              var max_quality = Math.max.apply(null, quality_eps);
              var stream_url = file_episod.link.replace('%s.mp4', max_quality + '.mp4');
              var s_e = stream_url.slice(0 - stream_url.length + stream_url.lastIndexOf('/'));
              var str_s_e = s_e.match(/s(\d+)e(\d+?)_\d+\.mp4/i);

              if (str_s_e) {
                var _seas_num = parseInt(str_s_e[1]);

                var _epis_num = parseInt(str_s_e[2]);

                items.push({
                  id: _seas_num + '_' + _epis_num,
                  comment: _epis_num + ' ' + Lampa.Lang.translate('torrent_serial_episode') + ' <i>' + ID + '</i>',
                  file: stream_url,
                  episode: _epis_num,
                  season: _seas_num,
                  quality: max_quality,
                  qualities: quality_eps,
                  translation: transl_id
                });
              }
            }

            if (!extract[transl_id]) extract[transl_id] = {
              json: [],
              file: ''
            };
            extract[transl_id].json.push({
              id: seas_num,
              comment: seas_num + ' ' + Lampa.Lang.translate('torrent_serial_season'),
              folder: items,
              translation: transl_id
            });
          }
        }
      } else if (pl_links.movie && pl_links.movie.length > 0) {
        var _transl_id = 0;

        for (var _ID in pl_links.movie) {
          var _file_episod = pl_links.movie[_ID];
          ++_transl_id;

          var _quality_eps = _file_episod.link.match(/.+\[(.+[\d])[,]+?\].+/i);
          if (_quality_eps) _quality_eps = _quality_eps[1].split(',').filter(function(quality_) {
            return quality_ <= window.fxapi.max_qualitie;
          });

          var _max_quality = Math.max.apply(null, _quality_eps);
          var file_url = _file_episod.link.replace(/\[(.+[\d])[,]+?\]/i, _max_quality);

          extract[_transl_id] = {
            file: file_url,
            translation: _file_episod.translation,
            quality: _max_quality,
            qualities: _quality_eps
          };
        }
      }
    }

    function getFile(element, max_quality) {
      var translat = extract[element.translation];
      var id = element.season + '_' + element.episode;
      var file = '';
      var quality = false;

      if (translat) {
        if (element.season)
          for (var i in translat.json) {
            var elem = translat.json[i];
            if (elem.folder)
              for (var f in elem.folder) {
                var folder = elem.folder[f];

                if (folder.id == id) {
                  file = folder.file;
                  break;
                }
              } else {
                if (elem.id == id) {
                  file = elem.file;
                  break;
                }
              }
          } else file = translat.file;
      }

      max_quality = parseInt(max_quality);

      if (file) {
        var link = file.slice(0, file.lastIndexOf('_')) + '_';
        var orin = file.split('?');
        orin = orin.length > 1 ? '?' + orin.slice(1).join('?') : '';

        if (file.split('_').pop().replace('.mp4', '') !== max_quality) {
          file = link + max_quality + '.mp4' + orin;
        }

        quality = {};
        var mass = [2160, 1440, 1080, 720, 480, 360];
        mass = mass.slice(mass.indexOf(max_quality));
        mass.forEach(function(n) {
          quality[n + 'p'] = link + n + '.mp4' + orin;
        });
        var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
        if (quality[preferably]) file = quality[preferably];
      }

      return {
        file: file,
        quality: quality
      };
    }

    function filter() {
      filter_items = {
        season: [],
        voice: [],
        voice_info: []
      };

      if (results.last_episode && results.last_episode.season) {
        var s = results.last_episode.season;

        while (s--) {
          filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + (results.last_episode.season - s));
        }
      }

      for (var Id in results.player_links.playlist) {
        var season = results.player_links.playlist[Id];
        var d = 0;

        for (var voic in season) {
          ++d;

          if (filter_items.voice.indexOf(voic) == -1) {
            filter_items.voice.push(voic);
            filter_items.voice_info.push({
              id: d
            });
          }
        }
      }

      if (choice.voice_name) {
        var inx = filter_items.voice.map(function(v) {
          return v.toLowerCase();
        }).indexOf(choice.voice_name.toLowerCase());
        if (inx == -1) choice.voice = 0;
        else if (inx !== choice.voice) {
          choice.voice = inx;
        }
      }

      component.filter(filter_items, choice);
    }

    function filtred() {
      var filtred = [];

      if (Object.keys(results.player_links.playlist).length) {
        for (var transl in extract) {
          var element = extract[transl];

          for (var season_id in element.json) {
            var episode = element.json[season_id];

            if (episode.id == choice.season + 1) {
              episode.folder.forEach(function(media) {
                if (media.translation == filter_items.voice_info[choice.voice].id) {
                  filtred.push({
                    episode: parseInt(media.episode),
                    season: media.season,
                    title: Lampa.Lang.translate('torrent_serial_episode') + ' ' + media.episode + (media.title ? ' - ' + media.title : ''),
                    quality: media.quality + 'p ',
                    translation: media.translation,
                    voice_name: filter_items.voice[choice.voice],
                    info: filter_items.voice[choice.voice]
                  });
                }
              });
            }
          }
        }
      } else if (Object.keys(results.player_links.movie).length) {
        for (var transl_id in extract) {
          var _element = extract[transl_id];
          filtred.push({
            title: _element.translation,
            quality: _element.quality + 'p ',
            qualitys: _element.qualities,
            translation: transl_id,
            voice_name: _element.translation
          });
        }
      }

      return filtred;
    }

    function toPlayElement(element) {
      var extra = getFile(element, element.quality);
      var play = {
        title: element.title,
        url: extra.file,
        quality: extra.quality,
        timeline: element.timeline,
        callback: element.mark
      };
      return play;
    }

    function append(items) {
      component.reset();
      component.draw(items, {
        similars: wait_similars,
        onEnter: function onEnter(item, html) {
          var extra = getFile(item, item.quality);

          if (extra.file) {
            var playlist = [];
            var first = toPlayElement(item);

            if (item.season) {
              items.forEach(function(elem) {
                playlist.push(toPlayElement(elem));
              });
            } else {
              playlist.push(first);
            }

            if (playlist.length > 1) first.playlist = playlist;
            Lampa.Player.play(first);
            Lampa.Player.playlist(playlist);
            item.mark();
          } else Lampa.Noty.show(Lampa.Lang.translate('online_nolink'));
        },
        onContextMenu: function onContextMenu(item, html, data, call) {
          call(getFile(item, item.quality));
        }
      });
    }
  }

  function component(object) {
    var network = new Lampa.Reguest();
    var scroll = new Lampa.Scroll({
      mask: true,
      over: true
    });
    var files = new Lampa.Explorer(object);
    var filter = new Lampa.Filter(object);
    var sources = {
      fxapi: fxapi
    };
    var last;
    var extended;
    var selected_id;
    var source;
    var balanser = 'fxapi';
    var initialized;
    var balanser_timer;
    var images = [];
    var filter_translate = {
      season: Lampa.Lang.translate('torrent_serial_season'),
      voice: Lampa.Lang.translate('torrent_parser_voice'),
      source: Lampa.Lang.translate('settings_rest_source')
    };

    this.initialize = function() {
      var _this = this;

      source = this.createSource();

      filter.onSearch = function(value) {
        Lampa.Activity.replace({
          search: value,
          clarification: true
        });
      };

      filter.onBack = function() {
        _this.start();
      };

      filter.render().find('.selector').on('hover:enter', function() {
        clearInterval(balanser_timer);
      });

      filter.onSelect = function(type, a, b) {
        if (type == 'filter') {
          if (a.reset) {
            if (extended) source.reset();
            else _this.start();
          } else {
            source.filter(type, a, b);
          }
        } else if (type == 'sort') {
          Lampa.Select.close();
        }
      };

      if (filter.addButtonBack) filter.addButtonBack();
      filter.render().find('.filter--sort').remove();
      files.appendFiles(scroll.render());
      files.appendHead(filter.render());
      scroll.body().addClass('torrent-list');
      scroll.minus(files.render().find('.explorer__files-head'));
      this.search();
    };

    this.createSource = function() {
      return new sources[balanser](this, object);
    };

    /**
     * Подготовка
     */


    this.create = function() {
      return this.render();
    };
    /**
     * Начать поиск
     */


    this.search = function() {
      this.activity.loader(true);
      this.find();
    };

    this.find = function() {
      if (source.searchByTitle) {
        this.extendChoice();
        source.searchByTitle(object, object.search || object.movie.original_title || object.movie.original_name || object.movie.title || object.movie.name);
      }
    };

    this.getChoice = function(for_balanser) {
      var data = Lampa.Storage.cache('online_choice_' + (for_balanser || balanser), 3000, {});
      var save = data[selected_id || object.movie.id] || {};
      Lampa.Arrays.extend(save, {
        season: 0,
        voice: 0,
        voice_name: '',
        voice_id: 0,
        episodes_view: {},
        movie_view: ''
      });
      return save;
    };

    this.extendChoice = function() {
      extended = true;
      source.extendChoice(this.getChoice());
    };

    this.saveChoice = function(choice, for_balanser) {
      var data = Lampa.Storage.cache('online_choice_' + (for_balanser || balanser), 3000, {});
      data[selected_id || object.movie.id] = choice;
      Lampa.Storage.set('online_choice_' + (for_balanser || balanser), data);
    };
    /**
     * Есть похожие карточки
     * @param {Object} json 
     */


    this.similars = function(json) {
      var _this3 = this;

      json.forEach(function(elem) {
        var info = [];
        var year = ((elem.start_date || elem.year || '') + '').slice(0, 4);
        if (elem.rating && elem.rating !== 'null' && elem.filmId) info.push(Lampa.Template.get('online_prestige_rate', {
          rate: elem.rating
        }, true));
        if (year) info.push(year);

        if (elem.countries && elem.countries.length) {
          info.push((elem.filmId ? elem.countries.map(function(c) {
            return c.country;
          }) : elem.countries).join(', '));
        }

        if (elem.categories && elem.categories.length) {
          info.push(elem.categories.slice(0, 4).join(', '));
        }

        var name = elem.title || elem.ru_title || elem.en_title || elem.nameRu || elem.nameEn;
        var orig = elem.orig_title || elem.nameEn || '';
        elem.title = name + (orig && orig !== name ? ' / ' + orig : '');
        elem.time = elem.filmLength || '';
        elem.info = info.join('<span class="online-prestige-split">●</span>');
        var item = Lampa.Template.get('online_prestige_folder', elem);
        item.on('hover:enter', function() {
          _this3.activity.loader(true);

          _this3.reset();

          object.search_date = year;
          selected_id = elem.id;

          _this3.extendChoice();

          if (source.search) {
            source.search(object, [elem]);
          } else {
            _this3.doesNotAnswer();
          }
        }).on('hover:focus', function(e) {
          last = e.target;
          scroll.update($(e.target), true);
        });
        scroll.append(item);
      });
    };

    this.clearImages = function() {
      images.forEach(function(img) {
        img.onerror = function() {};
        img.onload = function() {};
        img.src = '';
      });
      images = [];
    };
    /**
     * Очистить список файлов
     */


    this.reset = function() {
      last = false;
      clearInterval(balanser_timer);
      network.clear();
      this.clearImages();
      scroll.render().find('.empty').remove();
      scroll.clear();
    };
    /**
     * Загрузка
     */


    this.loading = function(status) {
      if (status) this.activity.loader(true);
      else {
        this.activity.loader(false);
        this.activity.toggle();
      }
    };
    /**
     * Построить фильтр
     */


    this.filter = function(filter_items, choice) {
      var _this4 = this;

      var select = [];

      var add = function add(type, title) {
        var need = _this4.getChoice();

        var items = filter_items[type];
        var subitems = [];
        var value = need[type];
        items.forEach(function(name, i) {
          subitems.push({
            title: name,
            selected: value == i,
            index: i
          });
        });
        select.push({
          title: title,
          subtitle: items[value],
          items: subitems,
          stype: type
        });
      };

      select.push({
        title: Lampa.Lang.translate('torrent_parser_reset'),
        reset: true
      });
      this.saveChoice(choice);
      if (filter_items.voice && filter_items.voice.length) add('voice', Lampa.Lang.translate('torrent_parser_voice'));
      if (filter_items.season && filter_items.season.length) add('season', Lampa.Lang.translate('torrent_serial_season'));
      filter.set('filter', select);
      this.selected(filter_items);
    };
    /**
     * Закрыть фильтр
     */


    this.closeFilter = function() {
      if ($('body').hasClass('selectbox--open')) Lampa.Select.close();
    };
    /**
     * Показать что выбрано в фильтре
     */


    this.selected = function(filter_items) {
      var need = this.getChoice(),
        select = [];

      for (var i in need) {
        if (filter_items[i] && filter_items[i].length) {
          if (i == 'voice') {
            select.push(filter_translate[i] + ': ' + filter_items[i][need[i]]);
          } else if (i !== 'source') {
            if (filter_items.season.length >= 1) {
              select.push(filter_translate.season + ': ' + filter_items[i][need[i]]);
            }
          }
        }
      }

      filter.chosen('filter', select);
      filter.chosen('sort', [balanser]);
    };

    this.getEpisodes = function(season, call) {
      var episodes = [];

      if (typeof object.movie.id == 'number' && object.movie.name) {
        var tmdburl = 'tv/' + object.movie.id + '/season/' + season + '?api_key=' + Lampa.TMDB.key() + '&language=' + Lampa.Storage.get('language', 'ru');
        var baseurl = Lampa.TMDB.api(tmdburl);
        network.timeout(1000 * 10);
        network["native"](baseurl, function(data) {
          episodes = data.episodes || [];
          call(episodes);
        }, function(a, c) {
          call(episodes);
        });
      } else call(episodes);
    };
    /**
     * Добавить элементы в список
     */


    this.append = function(item) {
      item.on('hover:focus', function(e) {
        last = e.target;
        scroll.update($(e.target), true);
      });
      scroll.append(item);
    };

    this.watched = function(set) {
      var file_id = Lampa.Utils.hash(object.movie.number_of_seasons ? object.movie.original_name : object.movie.original_title);
      var watched = Lampa.Storage.cache('online_watched_last', 5000, {});

      if (set) {
        if (!watched[file_id]) watched[file_id] = {};
        Lampa.Arrays.extend(watched[file_id], set, true);
        Lampa.Storage.set('online_watched_last', watched);
      } else {
        return watched[file_id];
      }
    };

    /**
     * Отрисовка файлов
     */


    this.draw = function(items) {
      var _this5 = this;

      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!items.length) return this.empty();
      this.getEpisodes(items[0].season, function(episodes) {
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        var serial = object.movie.name ? true : false;

        var choice = _this5.getChoice();

        var fully = window.innerWidth > 480;
        var scroll_to_element = false;
        var scroll_to_mark = false;
        items.forEach(function(element, index) {
          var episode = serial && episodes.length && !params.similars ? episodes.find(function(e) {
            return e.episode_number == element.episode;
          }) : false;
          var episode_num = element.episode || index + 1;
          var episode_last = choice.episodes_view[element.season];
          Lampa.Arrays.extend(element, {
            info: '',
            quality: '',
            time: Lampa.Utils.secondsToTime((episode ? episode.runtime : object.movie.runtime) * 60, true)
          });
          var hash_timeline = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title].join('') : object.movie.original_title);
          var hash_behold = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title, element.voice_name].join('') : object.movie.original_title + element.voice_name);
          var data = {
            hash_timeline: hash_timeline,
            hash_behold: hash_behold
          };
          var info = [];

          if (element.season) {
            element.translate_episode_end = _this5.getLastEpisode(items);
            element.translate_voice = element.voice_name;
          }

          element.timeline = Lampa.Timeline.view(hash_timeline);

          if (episode) {
            element.title = episode.name;
            if (element.info.length < 30 && episode.vote_average) info.push(Lampa.Template.get('online_prestige_rate', {
              rate: parseFloat(episode.vote_average + '').toFixed(1)
            }, true));
            if (episode.air_date && fully) info.push(Lampa.Utils.parseTime(episode.air_date).full);
          } else if (object.movie.release_date && fully) {
            info.push(Lampa.Utils.parseTime(object.movie.release_date).full);
          }

          if (!serial && object.movie.tagline && element.info.length < 30) info.push(object.movie.tagline);
          if (element.info) info.push(element.info);
          if (info.length) element.info = info.map(function(i) {
            return '<span>' + i + '</span>';
          }).join('<span class="online-prestige-split">●</span>');
          var html = Lampa.Template.get('online_prestige_full', element);
          var loader = html.find('.online-prestige__loader');
          var image = html.find('.online-prestige__img');

          if (!serial) {
            if (choice.movie_view == hash_behold) scroll_to_element = html;
          } else if (typeof episode_last !== 'undefined' && episode_last == episode_num) {
            scroll_to_element = html;
          }

          if (serial && !episode) {
            image.append('<div class="online-prestige__episode-number">' + ('0' + (element.episode || index + 1)).slice(-2) + '</div>');
            loader.remove();
          } else {
            var img = html.find('img')[0];

            img.onerror = function() {
              img.src = './img/img_broken.svg';
            };

            img.onload = function() {
              image.addClass('online-prestige__img--loaded');
              loader.remove();
              if (serial) image.append('<div class="online-prestige__episode-number">' + ('0' + (element.episode || index + 1)).slice(-2) + '</div>');
            };

            img.src = Lampa.TMDB.image('t/p/w300' + (episode ? episode.still_path : object.movie.backdrop_path));
            images.push(img);
          }

          html.find('.online-prestige__timeline').append(Lampa.Timeline.render(element.timeline));

          if (viewed.indexOf(hash_behold) !== -1) {
            scroll_to_mark = html;
            html.find('.online-prestige__img').append('<div class="online-prestige__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
          }

          element.mark = function() {
            viewed = Lampa.Storage.cache('online_view', 5000, []);

            if (viewed.indexOf(hash_behold) == -1) {
              viewed.push(hash_behold);
              Lampa.Storage.set('online_view', viewed);

              if (html.find('.online-prestige__viewed').length == 0) {
                html.find('.online-prestige__img').append('<div class="online-prestige__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
              }
            }

            choice = _this5.getChoice();

            if (!serial) {
              choice.movie_view = hash_behold;
            } else {
              choice.episodes_view[element.season] = episode_num;
            }

            _this5.saveChoice(choice);

            _this5.watched({
              balanser: balanser,
              balanser_name: Lampa.Utils.capitalizeFirstLetter(balanser),
              voice_id: choice.voice_id,
              voice_name: choice.voice_name || element.voice_name,
              episode: element.episode,
              season: element.season
            });
          };

          element.unmark = function() {
            viewed = Lampa.Storage.cache('online_view', 5000, []);

            if (viewed.indexOf(hash_behold) !== -1) {
              Lampa.Arrays.remove(viewed, hash_behold);
              Lampa.Storage.set('online_view', viewed);
              if (Lampa.Manifest.app_digital >= 177) Lampa.Storage.remove('online_view', hash_behold);
              html.find('.online-prestige__viewed').remove();
            }
          };

          element.timeclear = function() {
            element.timeline.percent = 0;
            element.timeline.time = 0;
            element.timeline.duration = 0;
            Lampa.Timeline.update(element.timeline);
          };

          html.on('hover:enter', function() {
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
            if (params.onEnter) params.onEnter(element, html, data);
          }).on('hover:focus', function(e) {
            last = e.target;
            if (params.onFocus) params.onFocus(element, html, data);
            scroll.update($(e.target), true);
          });
          if (params.onRender) params.onRender(element, html, data);

          _this5.contextMenu({
            html: html,
            element: element,
            onFile: function onFile(call) {
              if (params.onContextMenu) params.onContextMenu(element, html, data, call);
            },
            onClearAllMark: function onClearAllMark() {
              items.forEach(function(elem) {
                elem.unmark();
              });
            },
            onClearAllTime: function onClearAllTime() {
              items.forEach(function(elem) {
                elem.timeclear();
              });
            }
          });

          scroll.append(html);
        });

        if (serial && episodes.length > items.length && !params.similars) {
          var left = episodes.slice(items.length);
          left.forEach(function(episode) {
            var info = [];
            if (episode.vote_average) info.push(Lampa.Template.get('online_prestige_rate', {
              rate: parseFloat(episode.vote_average + '').toFixed(1)
            }, true));
            if (episode.air_date) info.push(Lampa.Utils.parseTime(episode.air_date).full);
            var air = new Date((episode.air_date + '').replace(/-/g, '/'));
            var now = Date.now();
            var day = Math.round((air.getTime() - now) / (24 * 60 * 60 * 1000));
            var txt = Lampa.Lang.translate('full_episode_days_left') + ': ' + day;
            var html = Lampa.Template.get('online_prestige_full', {
              time: Lampa.Utils.secondsToTime((episode ? episode.runtime : object.movie.runtime) * 60, true),
              info: info.length ? info.map(function(i) {
                return '<span>' + i + '</span>';
              }).join('<span class="online-prestige-split">●</span>') : '',
              title: episode.name,
              quality: day > 0 ? txt : ''
            });
            var loader = html.find('.online-prestige__loader');
            var image = html.find('.online-prestige__img');
            var season = items[0] ? items[0].season : 1;
            html.find('.online-prestige__timeline').append(Lampa.Timeline.render(Lampa.Timeline.view(Lampa.Utils.hash([season, episode.episode_number, object.movie.original_title].join('')))));
            var img = html.find('img')[0];

            if (episode.still_path) {
              img.onerror = function() {
                img.src = './img/img_broken.svg';
              };

              img.onload = function() {
                image.addClass('online-prestige__img--loaded');
                loader.remove();
                image.append('<div class="online-prestige__episode-number">' + ('0' + episode.episode_number).slice(-2) + '</div>');
              };

              img.src = Lampa.TMDB.image('t/p/w300' + episode.still_path);
              images.push(img);
            } else {
              loader.remove();
              image.append('<div class="online-prestige__episode-number">' + ('0' + episode.episode_number).slice(-2) + '</div>');
            }

            html.on('hover:focus', function(e) {
              last = e.target;
              scroll.update($(e.target), true);
            });
            scroll.append(html);
          });
        }

        if (scroll_to_element) {
          last = scroll_to_element[0];
        } else if (scroll_to_mark) {
          last = scroll_to_mark[0];
        }

        Lampa.Controller.enable('content');
      });
    };
    /**
     * Меню
     */


    this.contextMenu = function(params) {
      params.html.on('hover:long', function() {
        function show(extra) {
          var enabled = Lampa.Controller.enabled().name;
          var menu = [];

          if (Lampa.Platform.is('webos')) {
            menu.push({
              title: Lampa.Lang.translate('player_lauch') + ' - Webos',
              player: 'webos'
            });
          }

          if (Lampa.Platform.is('android')) {
            menu.push({
              title: Lampa.Lang.translate('player_lauch') + ' - Android',
              player: 'android'
            });
          }

          menu.push({
            title: Lampa.Lang.translate('player_lauch') + ' - Lampa',
            player: 'lampa'
          });
          menu.push({
            title: Lampa.Lang.translate('online_video'),
            separator: true
          });
          menu.push({
            title: Lampa.Lang.translate('torrent_parser_label_title'),
            mark: true
          });
          menu.push({
            title: Lampa.Lang.translate('torrent_parser_label_cancel_title'),
            unmark: true
          });
          menu.push({
            title: Lampa.Lang.translate('time_reset'),
            timeclear: true
          });

          if (extra) {
            menu.push({
              title: Lampa.Lang.translate('copy_link'),
              copylink: true
            });
          }

          menu.push({
            title: Lampa.Lang.translate('more'),
            separator: true
          });

          if (Lampa.Account.logged() && params.element && typeof params.element.season !== 'undefined' && params.element.translate_voice) {
            menu.push({
              title: Lampa.Lang.translate('online_voice_subscribe'),
              subscribe: true
            });
          }

          menu.push({
            title: Lampa.Lang.translate('online_clear_all_marks'),
            clearallmark: true
          });
          menu.push({
            title: Lampa.Lang.translate('online_clear_all_timecodes'),
            timeclearall: true
          });
          Lampa.Select.show({
            title: Lampa.Lang.translate('title_action'),
            items: menu,
            onBack: function onBack() {
              Lampa.Controller.toggle(enabled);
            },
            onSelect: function onSelect(a) {
              if (a.mark) params.element.mark();
              if (a.unmark) params.element.unmark();
              if (a.timeclear) params.element.timeclear();
              if (a.clearallmark) params.onClearAllMark();
              if (a.timeclearall) params.onClearAllTime();
              Lampa.Controller.toggle(enabled);

              if (a.player) {
                Lampa.Player.runas(a.player);
                params.html.trigger('hover:enter');
              }

              if (a.copylink) {
                if (extra.quality) {
                  var qual = [];

                  for (var i in extra.quality) {
                    qual.push({
                      title: i,
                      file: extra.quality[i]
                    });
                  }

                  Lampa.Select.show({
                    title: Lampa.Lang.translate('settings_server_links'),
                    items: qual,
                    onBack: function onBack() {
                      Lampa.Controller.toggle(enabled);
                    },
                    onSelect: function onSelect(b) {
                      Lampa.Utils.copyTextToClipboard(b.file, function() {
                        Lampa.Noty.show(Lampa.Lang.translate('copy_secuses'));
                      }, function() {
                        Lampa.Noty.show(Lampa.Lang.translate('copy_error'));
                      });
                    }
                  });
                } else {
                  Lampa.Utils.copyTextToClipboard(extra.file, function() {
                    Lampa.Noty.show(Lampa.Lang.translate('copy_secuses'));
                  }, function() {
                    Lampa.Noty.show(Lampa.Lang.translate('copy_error'));
                  });
                }
              }

              if (a.subscribe) {
                Lampa.Account.subscribeToTranslation({
                  card: object.movie,
                  season: params.element.season,
                  episode: params.element.translate_episode_end,
                  voice: params.element.translate_voice
                }, function() {
                  Lampa.Noty.show(Lampa.Lang.translate('online_voice_success'));
                }, function() {
                  Lampa.Noty.show(Lampa.Lang.translate('online_voice_error'));
                });
              }
            }
          });
        }

        params.onFile(show);
      }).on('hover:focus', function() {
        if (Lampa.Helper) Lampa.Helper.show('online_file', Lampa.Lang.translate('helper_online_file'), params.html);
      });
    };
    /**
     * Показать пустой результат
     */


    this.empty = function(msg) {
      var html = Lampa.Template.get('online_does_not_answer', {});
      html.find('.online-empty__buttons').remove();
      html.find('.online-empty__title').text(Lampa.Lang.translate('empty_title_two'));
      scroll.append(html);
      this.loading(false);
    };

    this.doesNotAnswer = function() {
      var _this6 = this;

      this.reset();
      var html = Lampa.Template.get('online_does_not_answer', {
        balanser: balanser
      });

      scroll.append(html);
      this.loading(false);
    };

    this.getLastEpisode = function(items) {
      var last_episode = 0;
      items.forEach(function(e) {
        if (typeof e.episode !== 'undefined') last_episode = Math.max(last_episode, parseInt(e.episode));
      });
      return last_episode;
    };
    /**
     * Начать навигацию по файлам
     */


    this.start = function() {
      if (Lampa.Activity.active().activity !== this.activity) return;

      if (!initialized) {
        initialized = true;
        this.initialize();
      }

      Lampa.Background.immediately(Lampa.Utils.cardImgBackgroundBlur(object.movie));
      Lampa.Controller.add('content', {
        toggle: function toggle() {
          Lampa.Controller.collectionSet(scroll.render(), files.render());
          Lampa.Controller.collectionFocus(last || false, scroll.render());
        },
        up: function up() {
          if (Navigator.canmove('up')) {
            Navigator.move('up');
          } else Lampa.Controller.toggle('head');
        },
        down: function down() {
          Navigator.move('down');
        },
        right: function right() {
          if (Navigator.canmove('right')) Navigator.move('right');
          else filter.show(Lampa.Lang.translate('title_filter'), 'filter');
        },
        left: function left() {
          if (Navigator.canmove('left')) Navigator.move('left');
          else Lampa.Controller.toggle('menu');
        },
        gone: function gone() {
          clearInterval(balanser_timer);
        },
        back: this.back
      });
      Lampa.Controller.toggle('content');
    };

    this.render = function() {
      return files.render();
    };

    this.back = function() {
      Lampa.Activity.backward();
    };

    this.pause = function() {};

    this.stop = function() {};

    this.destroy = function() {
      network.clear();
      this.clearImages();
      files.destroy();
      scroll.destroy();
      clearInterval(balanser_timer);
      if (source && source.destroy) source.destroy();
      if (modalopen) {modalopen = false; Lampa.Modal.close();}
	  clearInterval(ping_auth);
    };
  }

  function startPlugin() {
    window.online_filmix = true;
    var manifest = {
      type: 'video',
      version: '1.0.4',
      name: 'Онлайн - Filmix',
      description: 'Плагин для просмотра онлайн сериалов и фильмов',
      component: 'online_fxapi',
      onContextMenu: function onContextMenu(object) {
        return {
          name: Lampa.Lang.translate('online_watch'),
          description: ''
        };
      },
      onContextLauch: function onContextLauch(object) {
        resetTemplates();
        Lampa.Component.add('online_fxapi', component);
        Lampa.Activity.push({
          url: '',
          title: Lampa.Lang.translate('title_online'),
          component: 'online_fxapi',
          search: object.title,
          search_one: object.title,
          search_two: object.original_title,
          movie: object,
          page: 1
        });
      }
    };
    Lampa.Manifest.plugins = manifest;
    Lampa.Lang.add({
      online_watch: {
        ru: 'Смотреть онлайн',
        en: 'Watch online',
        ua: 'Дивитися онлайн',
        zh: '在线观看'
      },
      online_video: {
        ru: 'Видео',
        en: 'Video',
        ua: 'Відео',
        zh: '视频'
      },
      online_nolink: {
        ru: 'Не удалось извлечь ссылку',
        uk: 'Неможливо отримати посилання',
        en: 'Failed to fetch link',
        zh: '获取链接失败'
      },
      helper_online_file: {
        ru: 'Удерживайте клавишу "ОК" для вызова контекстного меню',
        uk: 'Утримуйте клавішу "ОК" для виклику контекстного меню',
        en: 'Hold the "OK" key to bring up the context menu',
        zh: '按住“确定”键调出上下文菜单'
      },
      title_online: {
        ru: 'Онлайн',
        uk: 'Онлайн',
        en: 'Online',
        zh: '在线的'
      },
      modal_text: {
        ru: 'Введите код на странице https://filmix.my/consoles',
        uk: 'Введіть код на сторінці https://filmix.my/consoles',
        en: 'Enter the code on the page https://filmix.my/consoles',
        zh: '在您的授权帐户中的 https://filmix.my/consoles'
      },
      modal_wait: {
        ru: 'Ожидаем код',
        uk: 'Очікуємо код',
        en: 'Waiting for the code',
        zh: '我们正在等待代码'
      },
      copy_secuses: {
        ru: 'Код скопирован в буфер обмена',
        uk: 'Код скопійовано в буфер обміну',
        en: 'Code copied to clipboard',
        zh: '代码复制到剪贴板'
      },
      copy_fail: {
        ru: 'Ошибка при копировании',
        uk: 'Помилка при копіюванні',
        en: 'Copy error',
        zh: '复制错误'
      },
      title_status: {
        ru: 'Статус',
        uk: 'Статус',
        en: 'Status',
        zh: '地位'
      },
      online_voice_subscribe: {
        ru: 'Подписаться на перевод',
        uk: 'Підписатися на переклад',
        en: 'Subscribe to translation',
        zh: '订阅翻译'
      },
      online_voice_success: {
        ru: 'Вы успешно подписались',
        uk: 'Ви успішно підписалися',
        en: 'You have successfully subscribed',
        zh: '您已成功订阅'
      },
      online_voice_error: {
        ru: 'Возникла ошибка',
        uk: 'Виникла помилка',
        en: 'An error has occurred',
        zh: '发生了错误'
      },
      online_clear_all_marks: {
        ru: 'Очистить все метки',
        uk: 'Очистити всі мітки',
        en: 'Clear all labels',
        zh: '清除所有标签'
      },
      online_clear_all_timecodes: {
        ru: 'Очистить все тайм-коды',
        uk: 'Очистити всі тайм-коди',
        en: 'Clear all timecodes',
        zh: '清除所有时间代码'
      },
      online_balanser_dont_work: {
        ru: 'Поиск не дал результатов',
        uk: 'Пошук не дав результатів',
        en: 'The search did not return any results',
        zh: '平衡器 未响应请求。'
      }
    });
    Lampa.Template.add('online_prestige_css', "\n        <style>\n        @charset 'UTF-8';.online-prestige{position:relative;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em;background-color:rgba(0,0,0,0.3);display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;will-change:transform}.online-prestige__body{padding:1.2em;line-height:1.3;-webkit-box-flex:1;-webkit-flex-grow:1;-moz-box-flex:1;-ms-flex-positive:1;flex-grow:1;position:relative}@media screen and (max-width:480px){.online-prestige__body{padding:.8em 1.2em}}.online-prestige__img{position:relative;width:13em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;min-height:8.2em}.online-prestige__img>img{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em;opacity:0;-webkit-transition:opacity .3s;-o-transition:opacity .3s;-moz-transition:opacity .3s;transition:opacity .3s}.online-prestige__img--loaded>img{opacity:1}@media screen and (max-width:480px){.online-prestige__img{width:7em;min-height:6em}}.online-prestige__folder{padding:1em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.online-prestige__folder>svg{width:4.4em !important;height:4.4em !important}.online-prestige__viewed{position:absolute;top:1em;left:1em;background:rgba(0,0,0,0.45);-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;padding:.25em;font-size:.76em}.online-prestige__viewed>svg{width:1.5em !important;height:1.5em !important}.online-prestige__episode-number{position:absolute;top:0;left:0;right:0;bottom:0;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;font-size:2em}.online-prestige__loader{position:absolute;top:50%;left:50%;width:2em;height:2em;margin-left:-1em;margin-top:-1em;background:url(./img/loader.svg) no-repeat center center;-webkit-background-size:contain;-moz-background-size:contain;-o-background-size:contain;background-size:contain}.online-prestige__head,.online-prestige__footer{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online-prestige__timeline{margin:.8em 0}.online-prestige__timeline>.time-line{display:block !important}.online-prestige__title{font-size:1.7em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical}@media screen and (max-width:480px){.online-prestige__title{font-size:1.4em}}.online-prestige__time{padding-left:2em}.online-prestige__info{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online-prestige__info>*{overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical}.online-prestige__quality{padding-left:1em;white-space:nowrap}.online-prestige__scan-file{position:absolute;bottom:0;left:0;right:0}.online-prestige__scan-file .broadcast__scan{margin:0}.online-prestige .online-prestige-split{font-size:.8em;margin:0 1em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.online-prestige.focus::after{content:'';position:absolute;top:-0.6em;left:-0.6em;right:-0.6em;bottom:-0.6em;-webkit-border-radius:.7em;-moz-border-radius:.7em;border-radius:.7em;border:solid .3em #fff;z-index:-1;pointer-events:none}.online-prestige+.online-prestige{margin-top:1.5em}.online-prestige--folder .online-prestige__footer{margin-top:.8em}.online-prestige-watched{padding:1em}.online-prestige-watched__icon>svg{width:1.5em;height:1.5em}.online-prestige-watched__body{padding-left:1em;padding-top:.1em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.online-prestige-watched__body>span+span::before{content:' ● ';vertical-align:top;display:inline-block;margin:0 .5em}.online-prestige-rate{display:-webkit-inline-box;display:-webkit-inline-flex;display:-moz-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online-prestige-rate>svg{width:1.3em !important;height:1.3em !important}.online-prestige-rate>span{font-weight:600;font-size:1.1em;padding-left:.7em}.online-empty{line-height:1.4}.online-empty__title{font-size:2em;margin-bottom:.9em}.online-empty__time{font-size:1.2em;font-weight:300;margin-bottom:1.6em}.online-empty__buttons{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.online-empty__buttons>*+*{margin-left:1em}.online-empty__button{background:rgba(0,0,0,0.3);font-size:1.2em;padding:.5em 1.2em;-webkit-border-radius:.2em;-moz-border-radius:.2em;border-radius:.2em;margin-bottom:2.4em}.online-empty__button.focus{background:#fff;color:black}.online-empty__templates .online-empty-template:nth-child(2){opacity:.5}.online-empty__templates .online-empty-template:nth-child(3){opacity:.2}.online-empty-template{background-color:rgba(255,255,255,0.3);padding:1em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em}.online-empty-template>*{background:rgba(0,0,0,0.3);-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em}.online-empty-template__ico{width:4em;height:4em;margin-right:2.4em}.online-empty-template__body{height:1.7em;width:70%}.online-empty-template+.online-empty-template{margin-top:1em}\n        </style>\n    ");
    $('body').append(Lampa.Template.get('online_prestige_css', {}, true));

    function resetTemplates() {
      Lampa.Template.add('online_prestige_full', "<div class=\"online-prestige online-prestige--full selector\">\n            <div class=\"online-prestige__img\">\n                <img alt=\"\">\n                <div class=\"online-prestige__loader\"></div>\n            </div>\n            <div class=\"online-prestige__body\">\n                <div class=\"online-prestige__head\">\n                    <div class=\"online-prestige__title\">{title}</div>\n                    <div class=\"online-prestige__time\">{time}</div>\n                </div>\n\n                <div class=\"online-prestige__timeline\"></div>\n\n                <div class=\"online-prestige__footer\">\n                    <div class=\"online-prestige__info\">{info}</div>\n                    <div class=\"online-prestige__quality\">{quality}</div>\n                </div>\n            </div>\n        </div>");
      Lampa.Template.add('online_does_not_answer', "<div class=\"online-empty\">\n            <div class=\"online-empty__title\" style=\"font-size: 2em; margin-bottom: .9em;\">\n                #{online_balanser_dont_work}\n            </div>\n          <div class=\"online-empty__templates\">\n                <div class=\"online-empty-template\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n                <div class=\"online-empty-template\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n                <div class=\"online-empty-template\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n            </div>\n        </div>");
      Lampa.Template.add('online_prestige_rate', "<div class=\"online-prestige-rate\">\n            <svg width=\"17\" height=\"16\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M8.39409 0.192139L10.99 5.30994L16.7882 6.20387L12.5475 10.4277L13.5819 15.9311L8.39409 13.2425L3.20626 15.9311L4.24065 10.4277L0 6.20387L5.79819 5.30994L8.39409 0.192139Z\" fill=\"#fff\"></path>\n            </svg>\n            <span>{rate}</span>\n        </div>");
      Lampa.Template.add('online_prestige_folder', "<div class=\"online-prestige online-prestige--folder selector\">\n            <div class=\"online-prestige__folder\">\n                <svg viewBox=\"0 0 128 112\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect y=\"20\" width=\"128\" height=\"92\" rx=\"13\" fill=\"white\"></rect>\n                    <path d=\"M29.9963 8H98.0037C96.0446 3.3021 91.4079 0 86 0H42C36.5921 0 31.9555 3.3021 29.9963 8Z\" fill=\"white\" fill-opacity=\"0.23\"></path>\n                    <rect x=\"11\" y=\"8\" width=\"106\" height=\"76\" rx=\"13\" fill=\"white\" fill-opacity=\"0.51\"></rect>\n                </svg>\n            </div>\n            <div class=\"online-prestige__body\">\n                <div class=\"online-prestige__head\">\n                    <div class=\"online-prestige__title\">{title}</div>\n                    <div class=\"online-prestige__time\">{time}</div>\n                </div>\n\n                <div class=\"online-prestige__footer\">\n                    <div class=\"online-prestige__info\">{info}</div>\n                </div>\n            </div>\n        </div>");
    }

    var button = "<div class=\"full-start__button selector view--online\" data-subtitle=\"Filmix v".concat(manifest.version, "\">\n        <svg width=\"135\" height=\"147\" viewBox=\"0 0 135 147\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M121.5 96.8823C139.5 86.49 139.5 60.5092 121.5 50.1169L41.25 3.78454C23.25 -6.60776 0.750004 6.38265 0.750001 27.1673L0.75 51.9742C4.70314 35.7475 23.6209 26.8138 39.0547 35.7701L94.8534 68.1505C110.252 77.0864 111.909 97.8693 99.8725 109.369L121.5 96.8823Z\" fill=\"currentColor\"/>\n            <path d=\"M63 84.9836C80.3333 94.991 80.3333 120.01 63 130.017L39.75 143.44C22.4167 153.448 0.749999 140.938 0.75 120.924L0.750001 94.0769C0.750002 74.0621 22.4167 61.5528 39.75 71.5602L63 84.9836Z\" fill=\"currentColor\"/>\n        </svg>\n\n        <span>#{title_online}</span>\n    </div>"); // нужна заглушка, а то при страте лампы говорит пусто

    Lampa.Component.add('online_fxapi', component); //то же самое

    resetTemplates();
    Lampa.Listener.follow('full', function(e) {
      if (e.type == 'complite') {
        var btn = $(Lampa.Lang.translate(button));
        btn.on('hover:enter', function() {
          resetTemplates();
          Lampa.Component.add('online_fxapi', component);
          Lampa.Activity.push({
            url: '',
            title: Lampa.Lang.translate('title_online'),
            component: 'online_fxapi',
            search: e.data.movie.title,
            search_one: e.data.movie.title,
            search_two: e.data.movie.original_title,
            movie: e.data.movie,
            page: 1
          });
        });
        e.object.activity.render().find('.view--torrent').after(btn);
      }
    });

    window.fxapi = {
      max_qualitie: 720,
      is_max_qualitie: false
    };

    function checkToken(token) {
      var network = new Lampa.Reguest();
      network.timeout(8000);
      network.silent(Lampa.Utils.addUrlComponent(api_url + 'user_profile', dev_token + token), function(json) {
        if (json) {
          if (json.user_data) {
            if (json.user_data.is_pro) window.fxapi.max_qualitie = 1080;
            if (json.user_data.is_pro_plus) window.fxapi.max_qualitie = 2160;
          } else {
            Lampa.Storage.set('fxapi_token', '');
            fxapi_token = '';
          }
        }
      }, function(a, c) {
        Lampa.Noty.show(network.errorDecode(a, c));
      });
    }

    var token = Lampa.Storage.get('fxapi_token', '');
    if (token)
      checkToken(token);

    if (Lampa.Manifest.app_digital >= 177) {
      Lampa.Storage.sync('online_choice_fxapi', 'object_object');
    }
  }

  if (!window.online_filmix && Lampa.Manifest.app_digital >= 155) startPlugin();

})();
