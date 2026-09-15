(function () {
  'use strict';

  var PLUGIN_FLAG = 'rezka_comment_plugin';
  var COMPONENT = 'rezka_comment';
  var BUTTON_CLASS = 'rezka-comment--button';
  var STYLE_ID = 'rezka-comment-style';

  var CACHE_KEY = 'rezka_comment_cache_v2';
  var CACHE_TTL = 24 * 60 * 60 * 1000;
  var CACHE_LIMIT = 40;
  var REQUEST_TIMEOUT = 15000;

  var DEFAULT_HOST = 'https://rezka.ag';
  var DEFAULT_PROXY = 'https://worker-patient-dream-26d8.bdvburik.workers.dev:8443/';

  var network = null;
  var busy = false;
  var modal_open = false;

  function getNetwork() {
    if (!network) network = new Lampa.Reguest();
    return network;
  }

  function stopBusy() {
    busy = false;
    Lampa.Loading.stop();
  }

  function fail(message) {
    stopBusy();
    if (message) Lampa.Noty.show(message);
  }

  function getSettings() {
    var host = String(Lampa.Storage.get('rezka_comment_host', DEFAULT_HOST) || DEFAULT_HOST).trim();
    var cookie = String(Lampa.Storage.get('rezka_comment_cookie', '') || '').trim();
    var proxy = String(Lampa.Storage.get('rezka_comment_proxy', DEFAULT_PROXY) || DEFAULT_PROXY).trim();

    host = host.replace(/\/+$/, '');
    if (host && !/^https?:\/\//i.test(host)) host = 'https://' + host;
    if (!host) host = DEFAULT_HOST;

    if (proxy && proxy.charAt(proxy.length - 1) !== '/') proxy += '/';

    return { host: host, cookie: cookie, proxy: proxy };
  }

  function buildUrl(target, referer) {
    var s = getSettings();
    var url = s.proxy;

    if (s.cookie) url += 'param/Cookie=' + encodeURIComponent(s.cookie) + '/';
    if (referer) url += 'param/Referer=' + encodeURIComponent(referer) + '/';

    return url + target;
  }

  function isChallenge(html) {
    if (!html) return false;
    return html.indexOf('Проверяем, что вы не бот') !== -1 || html.indexOf('Anubis') !== -1;
  }

  function request(url, onSuccess, onError) {
    var net = getNetwork();

    net.timeout(REQUEST_TIMEOUT);
    net.native(
      url,
      function (data) {
        var text = typeof data === 'string' ? data : String(data || '');

        if (isChallenge(text)) {
          onError('challenge');
          return;
        }

        onSuccess(text);
      },
      function (err, code) {
        onError(code ? 'HTTP ' + code : 'network');
      },
      false,
      { dataType: 'text' }
    );
  }

  function parseHTML(html) {
    try {
      if (typeof DOMParser !== 'undefined') {
        return new DOMParser().parseFromString(html, 'text/html');
      }
    } catch (e) {}

    var holder = document.createElement('div');
    holder.innerHTML = html;
    return holder;
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function cleanTitle(str) {
    return String(str || '')
      .replace(/[\s.,:;’'`!?]+/g, ' ')
      .trim();
  }

  function normalizeTitle(str) {
    return cleanTitle(
      String(str || '')
        .toLowerCase()
        .replace(/[\-\u2010-\u2015\u2E3A\u2E3B\uFE58\uFE63\uFF0D]+/g, '-')
        .replace(/ё/g, 'е')
    );
  }

  function readCache(key) {
    var all = Lampa.Storage.get(CACHE_KEY, '{}') || {};
    var item = all[key];

    if (!item || !item.time || !item.html) return null;
    if (Date.now() - item.time > CACHE_TTL) return null;

    return item;
  }

  function writeCache(key, html, title) {
    var all = Lampa.Storage.get(CACHE_KEY, '{}') || {};
    var keys = [];
    var i;

    all[key] = { time: Date.now(), html: html, title: title || '' };

    for (i in all) {
      if (Object.prototype.hasOwnProperty.call(all, i)) {
        if (!all[i] || !all[i].time || Date.now() - all[i].time > CACHE_TTL) delete all[i];
        else keys.push(i);
      }
    }

    if (keys.length > CACHE_LIMIT) {
      keys.sort(function (a, b) {
        return all[a].time - all[b].time;
      });

      for (i = 0; i < keys.length - CACHE_LIMIT; i++) delete all[keys[i]];
    }

    Lampa.Storage.set(CACHE_KEY, all);
  }

  function sanitize(root) {
    var junk = root.querySelectorAll('script, iframe, style, link, .actions, .share-link');
    var nodes;
    var el;
    var attrs;
    var name;
    var i;
    var j;

    for (i = 0; i < junk.length; i++) {
      if (junk[i].parentNode) junk[i].parentNode.removeChild(junk[i]);
    }

    nodes = root.querySelectorAll('*');

    for (i = 0; i < nodes.length; i++) {
      el = nodes[i];
      attrs = el.attributes;

      var onclick = el.getAttribute ? el.getAttribute('onclick') : null;
      if (onclick) {
        var found = onclick.match(/ShowOrHide\(\s*['"]([^'"]+)['"]/);
        if (found) el.setAttribute('data-spoiler', found[1]);
      }

      for (j = attrs.length - 1; j >= 0; j--) {
        name = attrs[j].name;

        if (name.indexOf('on') === 0) el.removeAttribute(name);
        else if (name === 'href' && /^\s*javascript:/i.test(attrs[j].value)) el.removeAttribute(name);
      }

      if (el.tagName === 'IMG') {
        var lazy = el.getAttribute('data-src');
        if (lazy && !el.getAttribute('src')) el.setAttribute('src', lazy);
      }
    }
  }

  function hasClass(el, name) {
    return (' ' + String((el && el.className) || '') + ' ').indexOf(' ' + name + ' ') !== -1;
  }

  function closestSpoilerTitle(el, root) {
    var node = el;

    while (node && node !== root) {
      if (hasClass(node, 'title_spoiler')) return node;
      node = node.parentNode;
    }

    return el;
  }

  function contains(parent, child) {
    var node = child;

    while (node) {
      if (node === parent) return true;
      node = node.parentNode;
    }

    return false;
  }

  function findSpoilerBody(toggle, id, root) {
    var body = null;
    var doc = root.ownerDocument || root;

    if (id) {
      try {
        body = root.querySelector('[id="' + id + '"]');
        if (!body && doc.querySelector) body = doc.querySelector('[id="' + id + '"]');
      } catch (e) {
        body = null;
      }
    }

    if (body && !contains(toggle, body)) return body;

    var start = toggle;
    var hops = 0;

    while (start && start !== root && hops < 4) {
      var next = start.nextElementSibling;

      while (next) {
        if (hasClass(next, 'text_spoiler') || String(next.className || '').indexOf('spoiler') !== -1) return next;
        if (next.getAttribute && next.getAttribute('data-sp-body')) return null;
        next = next.nextElementSibling;
      }

      start = start.parentNode;
      hops++;
    }

    return null;
  }

  function prepareSpoilers(root) {
    var raw = root.querySelectorAll('[data-spoiler], .title_spoiler');
    var seq = 0;
    var i;

    for (i = 0; i < raw.length; i++) {
      var el = raw[i];

      if (!el || !el.parentNode) continue;

      var id = el.getAttribute('data-spoiler');
      var toggle = closestSpoilerTitle(el, root);

      if (toggle.getAttribute('data-sp')) {
        if (el !== toggle) el.removeAttribute('data-spoiler');
        continue;
      }

      var body = findSpoilerBody(toggle, id, root);

      if (!body || body.getAttribute('data-sp-body')) {
        if (toggle.parentNode) toggle.parentNode.removeChild(toggle);
        continue;
      }

      seq++;

      var key = 'sp' + seq;
      var label = String(toggle.textContent || '').replace(/\s+/g, ' ').trim();

      if (!label || label.length > 40) label = 'Спойлер';

      toggle.className = 'rc-spoiler';
      toggle.setAttribute('data-sp', key);
      toggle.removeAttribute('data-spoiler');
      toggle.removeAttribute('id');
      toggle.innerHTML = escapeHtml(label);

      body.className = String(body.className || '') + ' rc-spoiler-body';
      body.setAttribute('data-sp-body', key);
      body.removeAttribute('id');
      body.setAttribute('style', 'display:none');
    }
  }

  function text(node, selector) {
    var found = node.querySelector(selector);
    if (!found) return '';
    return (found.innerText || found.textContent || '').trim();
  }

  function commentHtml(item) {
    var img = item.querySelector('.ava img');
    var avatar = img ? img.getAttribute('src') || img.getAttribute('data-src') || '' : '';
    var user = text(item, '.name, .b-comment__user') || 'Без имени';
    var date = text(item, '.date, .b-comment__time');
    var body = item.querySelector('.message .text, .text');
    var html = body ? body.innerHTML : '';
    var spoiler = html.indexOf('rc-spoiler') !== -1;

    return (
      '<div class="rc-item selector' + (spoiler ? ' rc-item--spoiler' : '') + '">' +
      (avatar ? '<div class="rc-ava"><img src="' + escapeHtml(avatar) + '" alt=""></div>' : '') +
      '<div class="rc-card">' +
      '<div class="rc-head"><span class="rc-name">' +
      escapeHtml(user) +
      '</span><span class="rc-date">' +
      escapeHtml(date) +
      '</span>' +
      (spoiler ? '<span class="rc-hint">OK — показать спойлер</span>' : '') +
      '</div>' +
      '<div class="rc-text">' +
      html +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  function treeHtml(list, depth) {
    var out = '';
    var children = list.children;
    var level = depth || 0;
    var i;
    var li;
    var nested;

    if (level > 6) return '';

    for (i = 0; i < children.length; i++) {
      li = children[i];
      if (!li.tagName || li.tagName !== 'LI') continue;

      out += '<div class="rc-branch"' + (level ? ' style="margin-left:1.2em"' : '') + '>';
      out += commentHtml(li);

      nested = li.querySelector('ol.comments-tree-list');
      if (nested) out += treeHtml(nested, level + 1);

      out += '</div>';
    }

    return out;
  }

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;

    var style = document.createElement('style');

    style.id = STYLE_ID;
    style.textContent = [
      '.rc-wrap{text-align:left}',
      '.rc-branch{margin:0}',
      '.rc-item{display:flex;margin:0 0 .6em 0;padding:.1em;border-radius:.4em}',
      '.rc-item.focus{background:rgba(255,255,255,.12)}',
      '.rc-ava{margin-right:.7em;flex-shrink:0}',
      '.rc-ava img{width:2.6em;height:2.6em;border-radius:.3em;object-fit:cover}',
      '.rc-card{background:#1b1b1b;border:1px solid #2a2a2a;border-radius:.4em;padding:.5em .8em;flex-grow:1;min-width:0}',
      '.rc-head{display:flex;justify-content:space-between;margin-bottom:.3em}',
      '.rc-name{font-weight:600;color:#fff}',
      '.rc-date{opacity:.6;font-size:.8em;padding-left:1em;flex-shrink:0}',
      '.rc-text{color:#ddd;line-height:1.45;word-wrap:break-word;overflow-wrap:break-word}',
      '.rc-text img{max-width:100%;height:auto}',
      '.rc-spoiler{display:inline-block;background:#3a3a3a;border:1px solid #555;border-radius:.3em;padding:0 .5em;margin:0 .2em;color:#fff;cursor:pointer}',
      '.rc-spoiler:before{content:"\\1F441 "}',
      '.rc-spoiler-body{color:#ffd98a}',
      '.rc-item.focus .rc-spoiler{background:#5a5a5a}',
      '.rc-hint{opacity:.5;font-size:.8em;margin-left:.4em}'
    ].join('');

    document.head.appendChild(style);
  }

  function closeModal() {
    if (!modal_open) return;

    modal_open = false;
    Lampa.Modal.close();
    Lampa.Controller.toggle('content');
  }

  function openModal(html, title) {
    stopBusy();
    injectStyle();

    var body = $('<div class="rc-wrap"></div>');

    body.html(html);

    function reveal(scope) {
      if (!scope || !scope.length) return false;

      var bodies = scope.find('.rc-spoiler-body');

      if (!bodies.length) return false;

      bodies.css('display', 'inline').removeClass('rc-spoiler-body');
      scope.find('.rc-spoiler').remove();
      scope.find('.rc-hint').remove();
      scope.removeClass('rc-item--spoiler');

      return true;
    }

    function revealOne(toggle) {
      var key = toggle.attr('data-sp');
      var target = key ? body.find('[data-sp-body="' + key + '"]') : null;

      if (!target || !target.length) return reveal(toggle.closest('.rc-item'));

      target.css('display', 'inline').removeClass('rc-spoiler-body');
      toggle.remove();

      var item = target.closest('.rc-item');

      if (item.length && !item.find('.rc-spoiler').length) {
        item.find('.rc-hint').remove();
        item.removeClass('rc-item--spoiler');
      }

      return true;
    }

    body.find('.rc-item').each(function () {
      var item = $(this);

      item.on('hover:enter', function () {
        reveal(item);
      });

      item.on('click', function (e) {
        if (e && e.target && $(e.target).hasClass('rc-spoiler')) return;

        reveal(item);
      });
    });

    body.find('.rc-spoiler').each(function () {
      var toggle = $(this);

      toggle.on('click hover:enter', function (e) {
        revealOne(toggle);

        if (e && e.stopPropagation) e.stopPropagation();

        return false;
      });
    });

    modal_open = true;

    Lampa.Modal.open({
      title: title || Lampa.Lang.translate('title_comments'),
      html: body,
      size: 'large',
      mask: true,
      onSelect: function (element) {
        var node = $(element);

        if (node.hasClass('rc-spoiler')) revealOne(node);
        else reveal(node.hasClass('rc-item') ? node : node.closest('.rc-item'));
      },
      onBack: closeModal
    });
  }

  function loadComments(id, pageUrl, title, cacheKey) {
    var target =
      getSettings().host +
      '/ajax/get_comments/?t=' +
      Date.now() +
      '&news_id=' +
      (id || '1') +
      '&cstart=1&type=0&comment_id=0&skin=hdrezka';

    request(
      buildUrl(target, pageUrl),
      function (raw) {
        var json;

        try {
          json = typeof raw === 'string' ? JSON.parse(raw) : raw;
        } catch (e) {
          fail('Не удалось разобрать ответ Rezka');
          return;
        }

        if (!json || !json.comments) {
          fail('Комментарии отсутствуют');
          return;
        }

        var dom = parseHTML(json.comments);
        var root = dom.querySelector('ol.comments-tree-list, .comments-tree-list');

        if (!root) {
          fail('Комментарии отсутствуют');
          return;
        }

        sanitize(dom.body || dom);
        prepareSpoilers(dom.body || dom);

        var html = treeHtml(root, 0);

        if (!html) {
          fail('Комментарии отсутствуют');
          return;
        }

        if (cacheKey) writeCache(cacheKey, html, title);

        openModal(html, title);
      },
      function (reason) {
        if (reason === 'challenge') fail('Защита от ботов на Rezka. Укажите Cookie в настройках плагина.');
        else fail('Не удалось загрузить комментарии (' + reason + ')');
      }
    );
  }

  function pickBest(items, titles, year) {
    var best = null;
    var best_score = -1;
    var i;
    var j;

    for (i = 0; i < items.length; i++) {
      var link = items[i].querySelector('.b-content__inline_item-link');
      if (!link) continue;

      var name = normalizeTitle(text(link, 'a') || (link.innerText || link.textContent || ''));
      var info = (link.innerText || link.textContent || '') + '';
      var score = 0;

      for (j = 0; j < titles.length; j++) {
        if (!titles[j]) continue;
        if (name === titles[j]) {
          score += 10;
          break;
        }
        if (name.indexOf(titles[j]) !== -1 || titles[j].indexOf(name) !== -1) {
          score += 4;
          break;
        }
      }

      if (year && info.indexOf(String(year)) !== -1) score += 5;

      score += (items.length - i) / (items.length * 10);

      if (score > best_score) {
        best_score = score;
        best = items[i];
      }
    }

    return best_score > 0 ? best : null;
  }

  function searchRezka(queries, index, titles, year, cacheKey) {
    if (index >= queries.length) {
      fail('Фильм или сериал не найден на Rezka');
      return;
    }

    var query = queries[index];
    var target =
      getSettings().host +
      '/search/?do=search&subaction=search&q=' +
      encodeURIComponent(query + (year ? ' ' + year : ''));

    request(
      buildUrl(target),
      function (html) {
        var dom = parseHTML(html);
        var items = dom.querySelectorAll('.b-content__inline_item');
        var best = items.length ? pickBest(items, titles, year) : null;

        if (!best) {
          searchRezka(queries, index + 1, titles, year, cacheKey);
          return;
        }

        var link = best.querySelector('.b-content__inline_item-link a') || best.querySelector('.b-content__inline_item-link');
        var name = link ? (link.innerText || link.textContent || '').trim() : '';
        var href = link ? link.getAttribute('href') || '' : '';

        loadComments(best.getAttribute('data-id'), href, name, cacheKey);
      },
      function (reason) {
        if (reason === 'challenge') {
          fail('Защита от ботов на Rezka. Укажите Cookie в настройках плагина.');
          return;
        }

        if (index + 1 < queries.length) searchRezka(queries, index + 1, titles, year, cacheKey);
        else fail('Ошибка поиска на Rezka (' + reason + ')');
      }
    );
  }

  function openComments(movie, method) {
    if (busy) return;

    busy = true;
    Lampa.Loading.start(function () {
      getNetwork().clear();
      stopBusy();
    });

    var year = '';

    if (movie.release_date) year = String(movie.release_date).slice(0, 4);
    else if (movie.first_air_date) year = String(movie.first_air_date).slice(0, 4);

    var cacheKey = (method === 'tv' ? 'tv_' : 'mv_') + movie.id;
    var cached = readCache(cacheKey);

    if (cached) {
      openModal(cached.html, cached.title);
      return;
    }

    var queries = [];
    var titles = [];
    var raw = [movie.original_title, movie.original_name, movie.title, movie.name];
    var i;

    for (i = 0; i < raw.length; i++) {
      if (!raw[i]) continue;

      var clean = cleanTitle(raw[i]);
      var norm = normalizeTitle(raw[i]);

      if (clean && queries.indexOf(clean) === -1) queries.push(clean);
      if (norm && titles.indexOf(norm) === -1) titles.push(norm);
    }

    if (!queries.length) {
      fail('Нет названия для поиска');
      return;
    }

    searchRezka(queries, 0, titles, year, cacheKey);
  }

  function addSettings() {
    if (!Lampa.SettingsApi || typeof Lampa.SettingsApi.addComponent !== 'function') return;

    Lampa.SettingsApi.addComponent({
      component: COMPONENT,
      name: 'Rezka Comments',
      icon:
        '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'
    });

    Lampa.SettingsApi.addParam({
      component: COMPONENT,
      param: { name: 'rezka_comment_host', type: 'input', values: '', placeholder: DEFAULT_HOST, 'default': DEFAULT_HOST },
      field: { name: 'Зеркало hdrezka', description: 'Адрес зеркала, например https://hdrezka.me' }
    });

    Lampa.SettingsApi.addParam({
      component: COMPONENT,
      param: { name: 'rezka_comment_cookie', type: 'input', values: '', placeholder: 'вставьте cookie', 'default': '' },
      field: { name: 'Cookie авторизации', description: 'Cookie из браузера для обхода защиты (Anubis / PHPSESSID)' }
    });

    Lampa.SettingsApi.addParam({
      component: COMPONENT,
      param: { name: 'rezka_comment_proxy', type: 'input', values: '', placeholder: DEFAULT_PROXY, 'default': DEFAULT_PROXY },
      field: { name: 'CORS прокси', description: 'Адрес прокси, слэш на конце добавится сам' }
    });

    Lampa.SettingsApi.addParam({
      component: COMPONENT,
      param: { name: 'rezka_comment_clear', type: 'button' },
      field: { name: 'Очистить кеш комментариев', description: 'Комментарии хранятся сутки' },
      onChange: function () {
        Lampa.Storage.set(CACHE_KEY, {});
        Lampa.Noty.show('Кеш комментариев очищен');
      }
    });
  }

  var BUTTON_HTML =
    '<div class="full-start__button selector ' +
    BUTTON_CLASS +
    '">' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 356.484 356.484" width="512" height="512">' +
    '<path d="M293.984 7.23H62.5C28.037 7.23 0 35.268 0 69.731v142.78c0 34.463 28.037 62.5 62.5 62.5l147.443.001 70.581 70.58a12.492 12.492 0 0 0 13.622 2.709 12.496 12.496 0 0 0 7.717-11.547v-62.237c30.759-3.885 54.621-30.211 54.621-62.006V69.731c0-34.463-28.037-62.501-62.5-62.501zm37.5 205.282c0 20.678-16.822 37.5-37.5 37.5h-4.621c-6.903 0-12.5 5.598-12.5 12.5v44.064l-52.903-52.903a12.493 12.493 0 0 0-8.839-3.661H62.5c-20.678 0-37.5-16.822-37.5-37.5V69.732c0-20.678 16.822-37.5 37.5-37.5h231.484c20.678 0 37.5 16.822 37.5 37.5v142.78z" fill="currentColor"/>' +
    '</svg>' +
    '<span>#{title_comments}</span>' +
    '</div>';

  function addButton(render, movie, method) {
    if (!render || !render.length) return;
    if (render.find('.' + BUTTON_CLASS).length) return;

    var btn = $(Lampa.Lang.translate(BUTTON_HTML));

    btn.on('hover:enter', function () {
      openComments(movie, method);
    });

    render.append(btn);
  }

  function startPlugin() {
    window[PLUGIN_FLAG] = true;

    Lampa.Lang.add({
      title_comments: {
        ru: 'Комментарии',
        uk: 'Коментарі',
        en: 'Comments',
        zh: '评论'
      }
    });

    addSettings();

    Lampa.Listener.follow('full', function (e) {
      if (e.type !== 'complite') return;

      var root = e.object.activity.render();
      var holder = root.find('.full-start-new__buttons');

      if (!holder.length) holder = root.find('.full-start__buttons');

      addButton(holder, e.data.movie, e.object.method);
    });

    Lampa.Listener.follow('app', function (e) {
      if (e.type === 'destroy' && network) network.clear();
    });
  }

  if (!window[PLUGIN_FLAG]) startPlugin();
})();
