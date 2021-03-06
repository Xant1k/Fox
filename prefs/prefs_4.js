// Полное отключение кэширования. Анализируя время загрузки страницы, можно узнать, посещал ли
// пользователь этот сайт. Если посещал - часть файлов будет взята из кэша, что отразится на времени.
// Еще проще и надежнее определяется наличие файлов в кэше по значениям заголовков If-Modified-Since
// и If-None-Match (https://en.wikipedia.org/wiki/HTTP_ETag), которые также могут быть использованы
// и для прямого трекинга (отдавая пользователям файл с уникальным Last-Modified и/или ETag).
// http://kb.mozillazine.org/Browser.cache.memory.enable
user_pref("browser.cache.memory.enable", false);
// http://kb.mozillazine.org/Browser.cache.memory.capacity
user_pref("browser.cache.memory.capacity", 0);
user_pref("media.cache_size", 0);
// https://bugzilla.mozilla.org/show_bug.cgi?id=1371882
// https://hg.mozilla.org/releases/mozilla-release/rev/0b219d49822a
// https://hg.mozilla.org/releases/mozilla-release/file/48668c5c603e7ef7a722d4376dea0100baec0a9b/modules/libpref/init/all.js#l332
user_pref("media.memory_cache_max_size", 0);
// https://bugzilla.mozilla.org/show_bug.cgi?id=1371882
// https://hg.mozilla.org/releases/mozilla-release/rev/fe82587013c0
user_pref("media.memory_caches_combined_limit_kb", 0);
user_pref("image.cache.size", 0);

// Позволяет устанавливать неподписанные аддоны.
// https://wiki.mozilla.org/Addons/Extension_Signing
user_pref("xpinstall.signatures.required", false);

// Запрещает браузеру держать кэш сертификатов промежуточных сертификационных центров
// (intermediate CAs) на диске (кэш в памяти все еще останется). Этот кэш может быть использован
// для фингерпринтинга.
// Включение этой настройки может сломать самые разные места как в самом браузере, так и в аддонах.
// http://www.ghacks.net/2017/02/22/firefox-fingerprinting-using-intermediate-ca-caching/
// http://www.ghacks.net/2017/02/12/ghacks-net-firefox-user-js-config-0-11-is-out/#li-comment-4137086
// https://bugzilla.mozilla.org/show_bug.cgi?id=1334485
// https://bugzilla.mozilla.org/show_bug.cgi?id=1216882
// https://bugzilla.mozilla.org/show_bug.cgi?id=629558
user_pref("security.nocertdb", true);

// Отключает встроенный просмотрщик PDF, в котором частенько находят уязвимости.
// https://habrahabr.ru/company/eset/blog/264619/
// https://blog.mozilla.org/security/2015/08/06/firefox-exploit-found-in-the-wild/
// https://news.ycombinator.com/item?id=10021376
//
// UPD: В связи с введением sandbox level 3 в Firefox 57 (убедиться можно в about:support#sandbox),
// который запрещает контент-процессам не только писать, но и читать файлы пользователя, PDF.js
// теперь безопаснее 3rd-party PDF-просмотрщиков. Поэтому перенесено в четвертую категорию.
// Отключайте только если думаете, что ваш способ просмотра PDF еще надежнее.
// https://www.mozilla.org/en-US/firefox/57.0/releasenotes/#changed
// http://www.morbo.org/2017/11/linux-sandboxing-improvements-in.html
// https://bugzilla.mozilla.org/show_bug.cgi?id=1308400
// https://wiki.mozilla.org/Security/Sandbox
user_pref("pdfjs.disabled", true);
user_pref("pdfjs.enableWebGL", false);

// Полностью отключает WebGL.
// https://www.contextis.com/resources/blog/webgl-new-dimension-browser-exploitation/
user_pref("webgl.disabled", true);
user_pref("webgl.force-enabled", false);
user_pref("webgl.disable-wgl", true);
user_pref("webgl.webgl2-compat-mode", false);
user_pref("webgl.enable-webgl2", false);

// Отключает попытки страниц развернуть себя на весь экран и соответствующую кнопку в HTML5-плеерах.
// https://developer.mozilla.org/en-US/docs/DOM/Using_fullscreen_mode
user_pref("full-screen-api.enabled", false);
// Отключает Pointer Lock API.
// https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API
// https://bugzilla.mozilla.org/show_bug.cgi?id=1273351
user_pref("full-screen-api.pointer-lock.enabled", false);
user_pref("pointer-lock-api.prefixed.enabled", false);

// Включает спуфинг различных свойств, как DOM, так и CSS, по которым можно фингерпринтить
// пользователя (screenX, screenY, screen.width, screen.height, etc - полный список см. в исходниках
// тестов по ссылкам ниже).
// https://bugzilla.mozilla.org/show_bug.cgi?id=418986
// https://hg.mozilla.org/releases/mozilla-release/file/3dcde73ca237dd579e1599f635f3cc994afc1346/dom/base/test/chrome/bug418986-1.js
// https://hg.mozilla.org/releases/mozilla-release/file/3dcde73ca237dd579e1599f635f3cc994afc1346/layout/style/test/chrome/bug418986-2.js
// https://hg.mozilla.org/releases/mozilla-release/file/3dcde73ca237dd579e1599f635f3cc994afc1346/dom/events/test/bug418986-3.js
user_pref("privacy.resistFingerprinting", true);

// Отключает применение к посещенным ссылкам стилей с селектором :visited, что предотвращает
// возможность выяснить, какие URL есть у пользователя в истории браузера. Главную уязвимость с
// использованием для этого getComputedStyle() закрыли, однако есть и некоторые другие способы
// (см. последние комментарии в багзилле), хоть и сложные в эксплуатации, но в принципе возможные.
// https://bugzilla.mozilla.org/show_bug.cgi?id=147777
// https://blog.mozilla.org/security/2010/03/31/plugging-the-css-history-leak/
// http://dbaron.org/mozilla/visited-privacy
user_pref("layout.css.visited_links_enabled", false);

// Отключает автоматическое копирование выделенного текста в буфер обмена (только для Linux-билдов).
// http://kb.mozillazine.org/Clipboard.autocopy
user_pref("clipboard.autocopy", false);

// Удалять cookies после выхода из браузера.
// Preferences -> Privacy -> Accept cookies from sites -> Keep until: I close Firefox
// http://kb.mozillazine.org/Network.cookie.lifetimePolicy
// https://hg.mozilla.org/releases/mozilla-esr45/file/2786beb35a3825b68651e2bf22ce06b84ff31ee3/modules/libpref/init/all.js#l1859
// https://hg.mozilla.org/releases/mozilla-esr45/file/4bd5a188c4236c4d14f9e859aa0ba243480af9bc/extensions/cookie/nsCookiePermission.cpp#l252
// https://hg.mozilla.org/releases/mozilla-esr45/file/4bd5a188c4236c4d14f9e859aa0ba243480af9bc/netwerk/cookie/nsICookieService.idl#l86
user_pref("network.cookie.lifetimePolicy", 2);

// Запрещает cookies полностью. Ломает многие сайты, поэтому рекомендуется не отключать полностью, а
// контролировать и чистить соответствующими аддонами.
// Preferences -> Privacy -> Accept cookies from sites
// http://kb.mozillazine.org/Network.cookie.cookieBehavior
// https://hg.mozilla.org/releases/mozilla-esr45/file/2786beb35a3825b68651e2bf22ce06b84ff31ee3/modules/libpref/init/all.js#l1854
// https://hg.mozilla.org/releases/mozilla-esr45/file/4bd5a188c4236c4d14f9e859aa0ba243480af9bc/netwerk/cookie/nsCookieService.cpp#l3794
// https://hg.mozilla.org/releases/mozilla-esr45/file/4bd5a188c4236c4d14f9e859aa0ba243480af9bc/netwerk/cookie/nsICookieService.idl#l77
user_pref("network.cookie.cookieBehavior", 2);

// Отключает Indexed DB API, позволяющий скриптам хранить информацию в БД SQLite на компьютере
// пользователя. Объем Indexed DB может значительно превышать объем DOM Storage.
// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
//
// "IndexedDB is completely disabled in private browsing mode."
//     -- https://wiki.mozilla.org/Security/Reviews/Firefox4/IndexedDB_Security_Review
// Проверить это  можно на примере из MDN, здесь: https://mdn.github.io/to-do-notifications/index.html
// В обычном окне пример покажет "Database initialised.", в приватном - "Error loading database.", плюс
// сообщения "TypeError: db is undefined" в консоли.
//
// Также в обычном окне использование Indexed DB сайтом можно увидеть через Page Info -> Permissions
// (но _не_ в about:permissions) -> Maintain Offline Storage и очистить там же. Block, равно как и Ask,
// почему-то не работает для отдельных сайтов (протестировано в Fx39). В about:permissions -> All Sites,
// Block _работает_ - при его выборе просто выставляется dom.indexedDB.enabled в false.
//
// Физически Indexed DB находится в профиле, по такому пути: storage/default/<домен>/idb/
// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria#Where_is_the_data_stored
//
// _Не_ очищается при Clear Recent History/Clear All History (Ctrl+Shift+Del)
//   -- https://bugzilla.mozilla.org/show_bug.cgi?id=1047098
//
// UPD: Начиная с Firefox 35 отключение Indexed DB может сломать многие аддоны:
// 	https://www.ghacks.net/2015/01/16/fix-add-ons-not-working-in-firefox-35/
// 	https://adblockplus.org/forum/viewtopic.php?t=27375&start=15
// UPD: Вышеописанный баг исправили, теперь эта настройка действует только на страницы, и браузер
//      с аддонами не ломает -- https://bugzilla.mozilla.org/show_bug.cgi?id=1079355
// UPD: Но ломает WebIDE (увидеть можно если выключить Indexed DB, перезапустить браузер и
//      попытаться открыть WebIDE - ошибки будут видны как в нем самом, так и в Browser Console).
// UPD: Использование Indexed DB включили в один из популярных фреймворков и эта настройка стала
//      ломать все больше и больше сайтов.
// UPD: Теперь отключение Indexed DB может ломать Web Extensions
//        -- https://bugzilla.mozilla.org/show_bug.cgi?id=1335919
user_pref("dom.indexedDB.enabled", false);
user_pref("dom.indexedDB.experimental", false);

// Отключает DOM Storage (и Local Storage, и Session Storage). Ломает многие сайты, поэтому
// рекомендуется не отключать полностью, а контролировать и чистить соответствующими аддонами.
// Хранится в файле webappsstore.sqlite в профиле.
// Очищается только при выборе Clear All History в Ctrl+Shift+Del, _не_ Clear Recent History
//   -- https://bugzilla.mozilla.org/show_bug.cgi?id=527667
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
user_pref("dom.storage.enabled", false);

// Запрещает менеджеру пермишнов сохранять их на диск. Все пермишны выданные пользователем
// различным сайтам (View Page Info -> Permissions) становятся временными, до закрытия браузера.
// https://hg.mozilla.org/releases/mozilla-release/file/d47195ec274d20ed53ff0eb0ea2f72f7168f6ad9/extensions/cookie/nsPermissionManager.cpp#l931
user_pref("permissions.memory_only", true);

// Отключает загружаемые сайтами шрифты. Несколько повышает безопасность за счет исключения
// уязвимостей в парсере шрифтов. Ломает кнопки uBlock. В качестве не ломающей кнопки замены
// можно добавить правило "no-remote-fonts: * true" (без кавычек) в My rules самого uBlock.
// Оно же включается чекбоксом Settings -> Block remote fonts в более новых версиях uBlock.
// Также в uBlock можно сделать белый список сайтов, которым разрешено загружать шрифты.
user_pref("gfx.downloadable_fonts.enabled", false);
user_pref("gfx.downloadable_fonts.woff2.enabled", false);

// Отключает использование указанных сайтами шрифтов (Preferences -> Content -> Advanced ->
// Allow pages to choose their own fonts, instead of my selections above). Будут использоваться
// указанные пользователем в Preferences -> Content. Предотвращает фингерпринтинг через
// анализ установленных шрифтов: https://www.browserleaks.com/fonts
user_pref("browser.display.use_document_fonts", 0);

// Маскировка браузера под версию 52.3 ESR и самую распространённую платформу. Не забываем обновлять
// по мере выхода очередных ESR.
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Gecko_user_agent_string_reference
// https://developer.mozilla.org/en-US/docs/Web/API/NavigatorID
// https://www.w3.org/html/wg/drafts/html/master/webappapis.html#the-navigator-object
// window.navigator.appName
user_pref("general.appname.override", "Netscape");
// window.navigator.appVersion
user_pref("general.appversion.override", "5.0 (Windows)");
// window.navigator.oscpu
user_pref("general.oscpu.override", "Windows NT 6.1; WOW64");
// window.navigator.platform
user_pref("general.platform.override", "Win32");
// HTTP User-Agent, window.navigator.userAgent
user_pref("general.useragent.override", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0");
// window.navigator.buildID
user_pref("general.buildID.override", "20170815141045");

// Устанавливает HTTP-заголовок Accept-Language, а также DOM-свойств window.navigator.languages
// и window.navigator.language в дефолтные для en-US локали значения. Q-values указывать не нужно -
// они вычисляются автоматически, а если заданы - игнорируются.
// https://tools.ietf.org/html/rfc2616#section-14.4
// https://hg.mozilla.org/releases/mozilla-esr38/file/008aa6494f90/netwerk/protocol/http/nsHttpHandler.cpp#l1345
// https://hg.mozilla.org/releases/mozilla-esr38/file/231a8c61b49f/modules/libpref/nsPrefBranch.cpp#l213
// https://hg.mozilla.org/releases/mozilla-esr38/file/008aa6494f90/netwerk/protocol/http/nsHttpHandler.cpp#l1573
user_pref("intl.accept_languages", "en-US, en");
// Вопреки своему названию и устаревшей информации в KB MozillaZine, general.useragent.locale уже
// не влияет на Accept-Language[1], а в основном передается в служебных URL из about:config,
// куда ее значение подставляется вместо %LOCALE%. Но кроме этого оно еще ошибочно используется
// в запросах некоторых поисковых движков[2][3] и, возможно, где-то еще, так что проще будет
// изначально установить именно en-US билд Firefox.
// [1]: https://bugzilla.mozilla.org/show_bug.cgi?id=448743#c5
// [2]: https://bugzilla.mozilla.org/show_bug.cgi?id=670450
// [3]: https://bugzilla.mozilla.org/show_bug.cgi?id=670451
user_pref("general.useragent.locale", "en-US");
// Использовать локаль из general.useragent.locale, а не установленную в ОС.
user_pref("intl.locale.matchOS", false);
// https://bugzilla.mozilla.org/show_bug.cgi?id=1379420
// https://hg.mozilla.org/releases/mozilla-release/rev/fe0297d33e87
user_pref("intl.regional_prefs.use_os_locales", false);
// Отключает возможность определения локали через Date.toLocaleString() - будет использоваться
// всегда американская. Применяется только после перезапуска браузера. Проверить можно так:
// LANG=ru_RU.UTF-8 firefox
// (new Date(Date.now())).toLocaleString()
// https://bugzilla.mozilla.org/show_bug.cgi?id=867501
user_pref("javascript.use_us_english_locale", true);

// Кроме того, на основе анализа истории уязвимостей в Firefox, разработчиками Tor Browser был
// сформирован список возможностей, в реализации которых всплывает больше всего уязвимостей.
// Для повышения безопасности предлагается реализовать средство для выборочного отключения
// проблемных возможностей путем предоставления пользователю кнопки для выбора уровня
// безопасности.
// Первый уровень подразумевает отключение opentype в коде отображения шрифтов.
// https://wiki.mozilla.org/SVGOpenTypeFonts
user_pref("gfx.font_rendering.opentype_svg.enabled", false);
// Отключает потенциально уязвимый парсер MathML.
// https://bugzilla.mozilla.org/show_bug.cgi?id=1173199
// https://www.torproject.org/projects/torbrowser/design/#other-security
user_pref("mathml.disabled", true);
// Отключает потенциально уязвимый парсер SVG.
// https://bugzilla.mozilla.org/show_bug.cgi?id=1216893
// https://hg.mozilla.org/releases/mozilla-release/rev/0d48c28cc547
// https://www.torproject.org/projects/torbrowser/design/#other-security
user_pref("svg.disabled", true);
// Второй уровень - отключение WebAudio и asm.js.
user_pref("javascript.options.ion", false);
// https://www.mozilla.org/en-US/security/advisories/mfsa2015-29/
// https://www.mozilla.org/en-US/security/advisories/mfsa2015-50/
// https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-2712
user_pref("javascript.options.asmjs", false);
// Отключает WebAssembly.
// https://hacks.mozilla.org/2016/03/a-webassembly-milestone/
user_pref("javascript.options.wasm", false);
user_pref("javascript.options.wasm_baselinejit", false);
user_pref("javascript.options.wasm_ionjit", false);
// Настройки media.webaudio.enabled больше не существует, поэтому только так.
user_pref("noscript.forbidMedia", true);
// Третий уровень - отключение JIT-компилятора, SVG и обработку JavaScript только для HTTPS.
user_pref("javascript.options.baselinejit", false);
user_pref("gfx.font_rendering.graphite.enabled", false);
// Наивысший уровень - отключение внешних шрифтов, JavaScript и всех кодеков.
// Отключение внешних шрифтов. На выбор одна из настроек:
user_pref("gfx.downloadable_fonts.enabled", false);
user_pref("noscript.forbidFonts", true);
// Отключает Media Source Extensions. Ломает некоторые кодеки на YouTube.
user_pref("media.mediasource.enabled", false);
user_pref("media.mediasource.mp4.enabled", false);
user_pref("media.mediasource.webm.enabled", false);
user_pref("media.mediasource.webm.audio.enabled", false);
// Отключает поддержку соответствующих форматов/кодеков.
user_pref("media.mp4.enabled", false);
user_pref("media.ogg.enabled", false);
user_pref("media.opus.enabled", false);
user_pref("media.webm.enabled", false);
user_pref("media.raw.enabled", false);
user_pref("media.wave.enabled", false);
user_pref("media.apple.mp3.enabled", false);
user_pref("media.apple.mp4.enabled", false);
user_pref("media.windows-media-foundation.use-dxva", false);
user_pref("media.wmf.enabled", false);
user_pref("media.wmf.low-latency.enabled", false);
user_pref("media.wmf.vp9.enabled", false);
user_pref("media.wmf.amd.vp9.enabled", false);
user_pref("media.flac.enabled", false);
user_pref("media.ogg.flac.enabled", false);
user_pref("media.directshow.enabled", false);
user_pref("media.ffmpeg.enabled", false);
user_pref("media.gmp.decoder.enabled", false);
user_pref("media.ffvpx.enabled", false);
user_pref("media.hardware-video-decoding.enabled", false);
user_pref("media.hardware-video-decoding.force-enabled", false);
// Полное отключение JavaScript
user_pref("noscript.global", false);

// Отключает периодическую загрузку списка вредоносных расширений с AMO.
// https://addons.mozilla.org/firefox/blocked/
// http://kb.mozillazine.org/Extensions.blocklist.enabled
// https://support.mozilla.org/en-US/kb/how-stop-firefox-making-automatic-connections#w_blocklist-updating
// UPD: Начиная с Firefox 43, blocklist содержит не только список вредоносных расширений, но и
// информацию об отозванных сертификатах, поэтому отключать его не рекомендуется.
// https://bugzilla.mozilla.org/show_bug.cgi?id=1016555
// https://wiki.mozilla.org/CA:RevocationPlan#OneCRL
// https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/
user_pref("extensions.blocklist.enabled", false);
user_pref("extensions.blocklist.url", "");
user_pref("extensions.blocklist.detailsURL", "");
user_pref("extensions.blocklist.itemURL", "");

// Начиная с Firefox 47, распространение blocklist и отозванных сертификатов постепенно переходит на
// новый бэкэнд под названием Kinto.
// https://wiki.mozilla.org/Firefox/Go_Faster#III:_Kinto
// https://wiki.mozilla.org/Firefox/Kinto
// Переименованы в Firefox 49: https://hg.mozilla.org/releases/mozilla-release/rev/c6c57d394549
// https://hg.mozilla.org/releases/mozilla-release/file/c6c57d394549/toolkit/mozapps/extensions/nsBlocklistService.js#l633
user_pref("services.blocklist.update_enabled", false);
// https://hg.mozilla.org/releases/mozilla-release/file/c6c57d394549/services/common/blocklist-updater.js
user_pref("services.settings.server", "data:application/json,{\"data\":[]}");
user_pref("services.blocklist.changes.path", "");

// Отключает проверку на отзыв сертификата через OCSP-сервер при установке шифрованного соединения.
// https://support.mozilla.org/en-US/kb/how-stop-firefox-making-automatic-connections#w_secure-website-certificates
user_pref("security.OCSP.enabled", 0);
user_pref("security.OCSP.require", false);

// Отключает автоматическое обновление тем оформления.
user_pref("lightweightThemes.update.enabled", false);

// Отключает автоматическую установку обновлений аддонов.
// https://bugzilla.mozilla.org/show_bug.cgi?id=701987
// https://support.mozilla.org/en-US/kb/how-stop-firefox-making-automatic-connections#w_auto-update-checking
user_pref("extensions.update.autoUpdateDefault", false);
// Отключает периодическую проверку обновлений аддонов.
user_pref("extensions.update.enabled", false);
// Полностью отключает возможность обновления аддонов с AMO, даже путем ручного нажатия
// "Check for Updates" в Add-ons Manager.
user_pref("extensions.update.url", "");
user_pref("extensions.update.background.url", "");
user_pref("extensions.systemAddon.update.url", "");

// Отключает периодические проверки обновлений браузера.
// https://developer.mozilla.org/en-US/Firefox/Enterprise_deployment
// https://support.mozilla.org/en-US/kb/how-stop-firefox-making-automatic-connections#w_auto-update-checking
// https://hg.mozilla.org/releases/mozilla-esr52/file/2ebcec6798551c83e5a3566c862a040750fa128a/browser/app/profile/firefox.js#l78
// Обнулять app.update.url в user.js при помощи user_pref() бесполезно - берется дефолтное значение
// (его можно изменить через mozilla.cfg - см. раздел Enterprise deployment выше).
// https://hg.mozilla.org/releases/mozilla-esr52/file/2ebcec6798551c83e5a3566c862a040750fa128a/toolkit/mozapps/update/nsUpdateService.js#l3242
user_pref("app.update.auto", false);
// "Whether or not app updates are enabled"
user_pref("app.update.enabled", false);
// "Whether or not to attempt using the service for updates."
user_pref("app.update.service.enabled", false);
// "At startup, should we check to see if the installation
//  date is older than some threshold"
// https://bugzilla.mozilla.org/show_bug.cgi?id=885641#c61
user_pref("app.update.checkInstallTime", false);
// "If set to true, the Update Service will present no UI for any event."
user_pref("app.update.silent", false);
// "If set to true, the Update Service will apply updates in the background
//  when it finishes downloading them."
user_pref("app.update.staging.enabled", false);
// "If set to true, the hamburger button will show badges for update events."
// https://bugzilla.mozilla.org/show_bug.cgi?id=1080406
user_pref("app.update.badge", false);
