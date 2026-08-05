/* QMahyar.github.io — bilingual (EN / FA), everything live from the GitHub API.
   To curate: edit CONFIG (projects) and I18N (text) below. No HTML edits needed.
   1. Language     2. Typewriter   3. Clock   4. Metrics   5. Language bars
   6. Recent       7. Auto projects 8. Starred 9. Grep filter 10. Palette
   11. Activity heatmap
*/

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ═══════════════════════ CONFIG — edit me ══════════════════════ */

  var CONFIG = {
    user: "QMahyar",

    /* repos hidden from ~/projects (by exact name) */
    exclude: ["QMahyar", "QMahyar.github.io", "Zaraban_Robot"],
    hideForks: true,

    /* repos shown with ✦ + highlight bullets (by exact name) */
    featured: ["Telegram-Cli", "TeleManager", "Cloudflare-Scanner"],
    highlights: {
      "Telegram-Cli": [
        "unified sync + offline search across all accounts",
        "flood-aware cross-account broadcasts",
        "schema-driven raw invoke gateway — new TL methods before any command"
      ],
      "TeleManager": [
        "login, import & export secured session backups",
        "dialog discovery with local metadata cache",
        "guarded action queues + recurring schedules"
      ],
      "Cloudflare-Scanner": [
        "scans from your own network — ranks by real performance",
        "bundles xray-core for realistic validation",
        "live results + batch apply to configs",
        "Windows · Linux · macOS · Termux builds"
      ]
    },

    /* description overrides — English */
    describe: {
      "TeleManager": "Local-first session manager for your own Telegram accounts — a local web app, nothing leaves your machine."
    },

    /* description overrides — Persian (falls back to English, then GitHub) */
    describeFa: {
      "Telegram-Cli": "همهی حسابهای تلگرامت در یک ترمینال — با MTProto، درست مثل یک کاربر واقعی.",
      "TeleManager": "مدیریت نشستهای محلی حسابهای تلگرامت — یک برنامهی وب محلی که هیچ چیزی از دستگاهت خارج نمیشود.",
      "Q-Manager": "برنامهی دسکتاپ چندپلتفرمی برای خودکارسازی بازی گرگینه در تلگرام — مدیریت چند حساب، تشخیص مرحله و اجرای خودکار.",
      "Cloudflare-Scanner": "اندپوینتهای سالم Warp کلادفلر و آیپیهای پروکسی تمیز را پیدا کن — سریع، رایگان، بدون تنظیم.",
      "cli-maker": "تولیدکنندهی CLI — از روی مستندات API، ابزارهای خط فرمان Go میسازد با کش محلی SQLite و دستورات ترکیبی.",
      "pi-9router": "افزونهی pi — درگاه چندارائهدهنده برای ابزارهای چت، تصویر، گفتار، جستجو و بازیابی.",
      "pi-exa-search": "افزونهی pi — جستجوی معنایی وب و بازیابی صفحه با چرخش کلیدها و نکات برجسته.",
      "pi-termux": "ابزار pi برای کلیدهای اضافهی Termux — لایوت‌ها، مرجع و ماکروها.",
      "wezterm-config": "تنظیمات شخصی WezTerm برای ویندوز — همان پالت رنگی که این سایت از آن ساخته شده."
    },

    /* extra links: { "<repo>": { label, url } } — label "releases" is translated; npm is automatic */
    links: {
      "TeleManager": { label: "releases", url: "https://github.com/QMahyar/TeleManager/releases/latest" },
      "Cloudflare-Scanner": { label: "releases", url: "https://github.com/QMahyar/Cloudflare-Scanner/releases/latest" }
    },

    /* group order + keyword rules (matched against name, topics, description) */
    groups: [
      { name: "Telegram & Messaging", nameFa: "تلگرام و پیامرسان", match: ["telegram", "mtproto", "telethon", "werewolf", "broadcast", "session"] },
      { name: "Networking & Cloud",   nameFa: "شبکه و ابر",       match: ["cloudflare", "warp", "vpn", "xray", "network", "scanner", "privacy"] },
      { name: "Developer Tools",      nameFa: "ابزارهای توسعه",   match: ["pi-", "cli", "extension", "generator", "9router", "exa", "search", "npm"] },
      { name: "Apps & Configs",       nameFa: "اپها و تنظیمات",   match: [] } /* fallback group */
    ],

    starredLimit: 8,
    excludeStarred: []
  };

  /* ═══════════════════════ I18N — edit me ════════════════════════ */

  var I18N = {
    en: {
      navAbout: "~/about", navProjects: "~/projects", navStack: "~/stack",
      navRecent: "~/recent", navStarred: "~/starred", navContact: "~/contact",
      secAbout: "~/about", secProjects: "~/projects", secStack: "~/stack",
      secRecent: "~/recent", secStarred: "~/starred", secContact: "~/contact",
      paletteHint: "press <kbd>/</kbd> for commands",
      name: "Hi, I&rsquo;m Mahyar.",
      lede: "Developer & security enthusiast from Iran. I build tools for Telegram, networking, and developer workflows — mostly in Go and TypeScript.",
      aboutP1: "I write practical tooling for Telegram and networking — MTProto CLIs, account managers, Cloudflare edge scanners — plus developer tools and terminal setups. Most of my work is in the open: if it&rsquo;s below and doesn&rsquo;t say <em>fork</em>, it&rsquo;s mine.",
      aboutP2: "Currently building <a href=\"https://github.com/QMahyar/Telegram-Cli\" target=\"_blank\" rel=\"noopener\">Telegram-Cli</a> — a schema-driven MTProto gateway that treats every Telegram account you own as one fleet.",
      metricRepos: "repos", metricFollowers: "followers", metricFollowing: "following", metricSince: "on github since",
      subheadLangs: "language breakdown",
      filterPlaceholder: "name, language, keyword…",
      filterLoading: "loading projects…",
      projectsLoading: "fetching from the GitHub API…",
      stackLanguages: "languages", stackPlatforms: "platforms & tools", stackAreas: "areas",
      chipWindows: "Windows / WSL", chipNetwork: "Network tooling", chipAutomation: "Automation",
      chipCli: "CLI design", chipLocal: "Local-first apps",
      recentNote: "recently pushed — loaded live from the GitHub API",
      lastPush: "last push",
      contactCode: "code", contactTelegram: "telegram", contactTwitter: "twitter",
      contactTip: "tip: press <kbd>/</kbd> or <kbd>Ctrl</kbd>+<kbd>K</kbd> anywhere on this page for commands",
      footerSource: "site source",
      langBtn: "فارسی",
      statusActive: "active", statusArchived: "archived",
      releases: "releases",
      activityLess: "less", activityMore: "more",
      projectsCount: function (n) { return n + " projects"; },
      projectsMatched: function (a, b) { return a + " / " + b + " matched"; },
      starredNote: function (shown, total) {
        return "repos i've starred on github — live · " +
          (total ? "top " + shown + " of " + total + " starred" : shown + " starred");
      },
      activityTip: function(count, date) {
        return count + " contribution" + (count !== 1 ? "s" : "") + " on " + date;
      }
    },
    fa: {
      navAbout: "~/درباره", navProjects: "~/پروژهها", navStack: "~/تخصصها",
      navRecent: "~/اخیراً", navStarred: "~/ستارهشده", navContact: "~/تماس",
      secAbout: "~/درباره", secProjects: "~/پروژهها", secStack: "~/تخصصها",
      secRecent: "~/اخیراً", secStarred: "~/ستارهشده", secContact: "~/تماس",
      paletteHint: "برای دستورات <kbd>/</kbd> را بزن",
      name: "سلام، من مهیارم.",
      lede: "توسعه‌دهنده و علاقه‌مند به امنیت، اهل ایران. ابزارهایی برای تلگرام، شبکه و محیط کار توسعه‌دهنده می‌سازم — عمدتاً با Go و TypeScript.",
      aboutP1: "ابزارهای کاربردی برای تلگرام و شبکه می‌سازم — کلاینتهای MTProto، مدیریت حسابها، اسکنرهای Cloudflare — به‌علاوهی ابزارهای توسعه و تنظیمات ترمینال. بیشتر کارهام متن‌بازه: اگر پایین نوشته و <em>fork</em> نیست، مال خودمه.",
      aboutP2: "الان روی <a href=\"https://github.com/QMahyar/Telegram-Cli\" target=\"_blank\" rel=\"noopener\">Telegram-Cli</a> کار می‌کنم — یک درگاه MTProto مبتنی بر اسکیما که همهی حسابهای تلگرامت رو به‌عنوان یک ناوگان واحد می‌بینه.",
      metricRepos: "پروژه", metricFollowers: "دنبال‌کننده", metricFollowing: "دنبال‌شده", metricSince: "عضو گیتهاب از",
      subheadLangs: "تفکیک زبانها",
      filterPlaceholder: "نام، زبان، کلمهی کلیدی…",
      filterLoading: "در حال بارگذاری…",
      projectsLoading: "در حال دریافت از API گیتهاب…",
      stackLanguages: "زبانها", stackPlatforms: "پلتفرمها و ابزارها", stackAreas: "حوزهها",
      chipWindows: "ویندوز / WSL", chipNetwork: "ابزارهای شبکه", chipAutomation: "اتوماسیون",
      chipCli: "طراحی CLI", chipLocal: "برنامههای محلی",
      recentNote: "آخرین به‌روزرسانی — دریافت زنده از API گیتهاب",
      lastPush: "آخرین پوش",
      contactCode: "کد", contactTelegram: "تلگرام", contactTwitter: "توییتر",
      contactTip: "نکته: برای دستورات، کلید <kbd>/</kbd> یا <kbd>Ctrl</kbd>+<kbd>K</kbd> را هر جای صفحه بزنید",
      footerSource: "منبع سایت",
      langBtn: "EN",
      statusActive: "فعال", statusArchived: "بایگانی‌شده",
      releases: "نسخهها",
      activityLess: "کمتر", activityMore: "بیشتر",
      projectsCount: function (n) { return faD(n) + " پروژه"; },
      projectsMatched: function (a, b) { return faD(a) + " از " + faD(b) + " پیدا شد"; },
      starredNote: function (shown, total) {
        return "پروژههای ستاره‌دارم در گیتهاب — زنده · " +
          (total ? faD(shown) + " مورد از " + faD(total) + " مورد" : faD(shown) + " مورد ستاره‌دار");
      },
      activityTip: function(count, date) {
        return faD(count) + " مشارکت در " + date;
      }
    }
  };

  /* ═══════════════════════ language state ════════════════════════ */

  function faD(s) { return String(s).replace(/[0-9]/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹"[d]; }); }
  function num(lang, s) { return lang === "fa" ? faD(s) : String(s); }

  var LANG = "en";
  try {
    var saved = localStorage.getItem("lang");
    LANG = saved === "fa" || saved === "en" ? saved
      : (navigator.language || "").toLowerCase().indexOf("fa") === 0 ? "fa" : "en";
  } catch (e) { LANG = "en"; }

  function t(key) { return I18N[LANG][key]; }

  /* data kept for re-render when the language changes */
  var lastRepos = null;
  var lastStarred = null;
  var lastRecent = null;
  var lastMetrics = null;
  var lastActivity = null;

  /* ═══════════════════════ 1. apply language ═════════════════════ */

  function applyLang() {
    document.documentElement.lang = LANG;
    document.documentElement.dir = LANG === "fa" ? "rtl" : "ltr";
    document.title = LANG === "fa"
      ? "مهیار — توسعهدهنده و علاقهمند به امنیت"
      : "Mahyar — Developer & Security Enthusiast";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (I18N[LANG][k] !== undefined) el.textContent = I18N[LANG][k];
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-html");
      if (I18N[LANG][k] !== undefined) el.innerHTML = I18N[LANG][k];
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-ph");
      if (I18N[LANG][k] !== undefined) el.placeholder = I18N[LANG][k];
    });

    /* paths render as ~/… even inside RTL */
    document.querySelectorAll(".path").forEach(function (el) { el.dir = "ltr"; });

    var lb = document.getElementById("lang-btn");
    if (lb) lb.textContent = t("langBtn");

    renderMetrics(lastMetrics);
    renderProjects(lastRepos);
    renderRecent(lastRecent);
    renderStarred(lastStarred);
    renderActivity(lastActivity);
    applyFilter(filterInput ? filterInput.value : "");
  }

  var langBtn = document.getElementById("lang-btn");
  if (langBtn) langBtn.addEventListener("click", function () {
    LANG = LANG === "en" ? "fa" : "en";
    try { localStorage.setItem("lang", LANG); } catch (e) { /* ignore */ }
    applyLang();
  });

  /* ═══════════════════════ 2. Typewriter (always EN, LTR terminal) ═══════════ */

  var twEl = document.getElementById("typewriter");
  var cursor = document.getElementById("cursor");

  var script = [
    { p: "$ whoami", out: "Mahyar — Developer & Security Enthusiast · Iran", cls: "" },
    { p: "$ ls ~/projects | wc -l", out: "…", cls: "acc", id: "tw-repos" },
    { p: "$ cat ~/interests.txt", out: "telegram · networking · cli tools · automation", cls: "dim" }
  ];

  function typewriterDone() { if (cursor) cursor.classList.add("done"); }

  if (twEl) {
    if (reduceMotion) {
      var frag = document.createDocumentFragment();
      script.forEach(function (line) {
        var p = document.createElement("span");
        p.className = "line prompt-line";
        p.textContent = line.p + "\n";
        var o = document.createElement("span");
        o.className = "line out" + (line.cls ? " " + line.cls : "");
        o.textContent = line.out + "\n";
        if (line.id) o.id = line.id;
        frag.appendChild(p);
        frag.appendChild(o);
      });
      twEl.appendChild(frag);
      typewriterDone();
    } else {
      var li = 0, running = true;

      function tick() {
        if (!running || li >= script.length) { typewriterDone(); return; }
        var line = script[li];
        var node = document.createElement("span");
        node.className = "line prompt-line";
        var cmd = document.createElement("span");
        cmd.className = "cmd";
        cmd.textContent = line.p.charAt(0);
        node.appendChild(cmd);
        twEl.appendChild(node);
        var pos = 1;
        var t = setInterval(function () {
          if (!running) { clearInterval(t); return; }
          if (pos < line.p.length) {
            cmd.textContent = line.p.substring(0, pos + 1);
            pos++;
          } else {
            clearInterval(t);
            setTimeout(function () {
              if (!running) return;
              var out = document.createElement("span");
              out.className = "line out" + (line.cls ? " " + line.cls : "");
              out.textContent = line.out;
              if (line.id) out.id = line.id;
              twEl.appendChild(out);
              li++;
              setTimeout(tick, 420);
            }, 260);
          }
        }, 38);
      }
      setTimeout(tick, 350);
    }
  }

  /* ═══════════════════════ 3. Terminal clock ═════════════════════ */

  var clock = document.getElementById("clock");
  if (clock) {
    function tickClock() {
      var d = new Date();
      var p2 = function (n) { return String(n).padStart(2, "0"); };
      clock.textContent = p2(d.getHours()) + ":" + p2(d.getMinutes()) + ":" + p2(d.getSeconds());
    }
    tickClock();
    setInterval(tickClock, 1000);
  }

  /* ═══════════════════════ helpers ══════════════════════════════ */

  function api(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error("api " + r.status);
      return r.json();
    });
  }

  function relTime(lang, iso) {
    var then = new Date(iso).getTime();
    if (isNaN(then)) return lang === "fa" ? "اخیراً" : "recently";
    var s = Math.max(1, Math.floor((Date.now() - then) / 1000));
    if (s < 60) return lang === "fa" ? "همین الان" : "just now";
    var m = Math.floor(s / 60);
    var h = Math.floor(m / 60);
    var d = Math.floor(h / 24);
    var mo = Math.floor(d / 30);
    if (lang === "fa") {
      if (m < 60) return faD(m) + " دقیقه پیش";
      if (h < 24) return faD(h) + " ساعت پیش";
      if (d < 30) return faD(d) + " روز پیش";
      if (mo < 12) return faD(mo) + " ماه پیش";
      return faD(Math.floor(mo / 12)) + " سال پیش";
    }
    if (m < 60) return m + "m ago";
    if (h < 24) return h + "h ago";
    if (d < 30) return d + "d ago";
    if (mo < 12) return mo + "mo ago";
    return Math.floor(mo / 12) + "y ago";
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function setText(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function formatDate(iso) {
    var d = new Date(iso);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
  }

  /* ═══════════════════════ 4. Metrics ═══════════════════════════ */

  var FALLBACK_METRICS = { repos: 12, followers: 7, following: 14, joined: "2017" };

  function renderMetrics(m) {
    if (!m) return;
    lastMetrics = m;
    setText("m-repos", num(LANG, m.repos));
    setText("m-followers", num(LANG, m.followers));
    setText("m-following", num(LANG, m.following));
    setText("m-joined", num(LANG, m.joined));
  }

  /* ═══════════════════════ 5. Language bars ═════════════════════ */

  var FALLBACK_LANGS = [
    { name: "TypeScript", count: 4, color: "#4D8FFF" },
    { name: "Go", count: 3, color: "#79EAEA" },
    { name: "HTML", count: 1, color: "#FFEE58" },
    { name: "Python", count: 1, color: "#E040D0" },
    { name: "Lua", count: 1, color: "#FF5561" }
  ];

  var LANG_COLORS = {
    go: "#79EAEA", typescript: "#4D8FFF", python: "#FFEE58", lua: "#E040D0",
    html: "#FF5561", shell: "#23F00F", javascript: "#FFEE58", c: "#8A8A8A",
    rust: "#FF5561", csharp: "#E040D0"
  };
  var LANG_CLASS = { go: "tag-go", typescript: "tag-ts", python: "tag-py", lua: "tag-lua" };

  function renderBars(langs) {
    var host = document.getElementById("langbars");
    if (!host) return;
    var total = langs.reduce(function (a, l) { return a + l.count; }, 0);
    if (!total) return;
    var sorted = langs.slice().sort(function (a, b) { return b.count - a.count; });
    host.innerHTML = "";
    sorted.forEach(function (l) {
      var pct = Math.round((l.count / total) * 100);
      var row = document.createElement("div");
      row.className = "bar";
      row.innerHTML =
        '<span class="bar-label">' + esc(l.name) + "</span>" +
        '<div class="bar-track"><div class="bar-fill" style="width:0%;background:' + l.color + '"></div></div>' +
        '<span class="bar-pct">' + num(LANG, pct) + "%</span>";
      host.appendChild(row);
      /* animate the bar fill */
      requestAnimationFrame(function() {
        var fill = row.querySelector(".bar-fill");
        if (fill) fill.style.width = pct + "%";
      });
    });
  }

  /* ═══════════════════════ 6. Recent ════════════════════════════ */

  var FALLBACK_RECENT = [
    { name: "Telegram-Cli", url: "https://github.com/QMahyar/Telegram-Cli", when: null },
    { name: "cli-maker", url: "https://github.com/QMahyar/cli-maker", when: null },
    { name: "Cloudflare-Scanner", url: "https://github.com/QMahyar/Cloudflare-Scanner", when: null },
    { name: "pi-9router", url: "https://github.com/QMahyar/pi-9router", when: null },
    { name: "pi-exa-search", url: "https://github.com/QMahyar/pi-exa-search", when: null }
  ];

  function renderRecent(repos) {
    if (!repos) return;
    lastRecent = repos;
    var host = document.getElementById("recent-list");
    if (!host || !repos.length) return;
    host.innerHTML = "";
    repos.slice(0, 5).forEach(function (r) {
      var when = r.when != null ? r.when : relTime(LANG, r.pushed_at);
      var li = document.createElement("li");
      li.innerHTML =
        '<a href="' + esc(r.url) + '" target="_blank" rel="noopener">' + esc(r.name) + "</a>" +
        '<span class="when">' + esc(when) + "</span>";
      host.appendChild(li);
    });
  }

  /* ═══════════════════════ 7. Auto projects ═════════════════════ */

  function decorate(r) {
    if (r.pre) return r;

    var name = r.name;
    var desc = LANG === "fa" && CONFIG.describeFa[name]
      ? CONFIG.describeFa[name]
      : (CONFIG.describe[name] || r.description || "");
    var tags = (name + " " + (r.language || "") + " " + (r.topics || []).join(" ") + " " + (r.description || "")).toLowerCase();

    var groupName = null, groupFa = null;
    for (var i = 0; i < CONFIG.groups.length; i++) {
      var g = CONFIG.groups[i];
      if (g.match.some(function (k) { return tags.indexOf(k) !== -1; })) { groupName = g.name; groupFa = g.nameFa || g.name; break; }
    }
    if (!groupName) { groupName = CONFIG.groups[CONFIG.groups.length - 1].name; groupFa = CONFIG.groups[CONFIG.groups.length - 1].nameFa; }

    var link = null;
    if (r.homepage && r.homepage.indexOf("npmjs.com") !== -1) link = { label: "npm", url: r.homepage };
    if (CONFIG.links[name]) link = CONFIG.links[name];

    return {
      name: name,
      desc: desc,
      lang: r.language || "",
      stars: r.stargazers_count || 0,
      archived: !!r.archived,
      url: r.html_url,
      group: groupName,
      groupFa: groupFa,
      featured: CONFIG.featured.indexOf(name) !== -1,
      highlights: CONFIG.highlights[name] || [],
      link: link,
      tags: tags,
      pushed: new Date(r.pushed_at || 0).getTime()
    };
  }

  function compare(a, b) {
    var fi = function (r) {
      var i = CONFIG.featured.indexOf(r.name);
      return i === -1 ? 99 : i;
    };
    var d = fi(a) - fi(b);
    if (d) return d;
    d = b.stars - a.stars;
    if (d) return d;
    return b.pushed - a.pushed;
  }

  function langTag(lang) {
    var key = (lang || "").toLowerCase();
    if (LANG_CLASS[key]) return '<span class="tag ' + LANG_CLASS[key] + '">' + esc(lang) + "</span>";
    if (key) return '<span class="tag" style="color:var(--cyan);border-color:rgba(121,234,234,.4)">' + esc(lang) + "</span>";
    return "";
  }

  function renderProjects(repos) {
    if (!repos) return;
    lastRepos = repos;
    var host = document.getElementById("projects-list");
    if (!host) return;

    var items = repos
      .filter(function (r) { return CONFIG.hideForks ? !r.fork : true; })
      .filter(function (r) { return CONFIG.exclude.indexOf(r.name) === -1; })
      .map(decorate)
      .sort(compare);
    host.innerHTML = "";

    var groups = {};
    CONFIG.groups.forEach(function (g) {
      var wrap = document.createElement("div");
      wrap.className = "project-group";
      wrap.dataset.group = g.name;
      var h3 = document.createElement("h3");
      h3.textContent = LANG === "fa" ? (g.nameFa || g.name) : g.name;
      wrap.appendChild(h3);
      host.appendChild(wrap);
      groups[g.name] = wrap;
    });

    items.forEach(function (r) {
      var art = document.createElement("article");
      art.className = "project" + (r.featured ? " featured" : "");
      art.dataset.name = r.name.toLowerCase();
      art.dataset.tags = r.tags;

      var hl = "";
      if (r.highlights.length) {
        hl = '<ul class="highlights">' +
          r.highlights.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("") +
          "</ul>";
      }
      var linkLabel = r.link && r.link.label === "releases" ? t("releases") : (r.link ? r.link.label : null);
      var ln = r.link ? '<p class="project-links"><a href="' + esc(r.link.url) + '" target="_blank" rel="noopener">' +
        esc(linkLabel) + " →</a></p>" : "";
      var st = r.stars > 0 ? '<span class="stars">★ ' + num(LANG, r.stars) + "</span>" : "";
      var st2 = r.archived
        ? '<span class="status status-archived">' + esc(t("statusArchived")) + "</span>"
        : '<span class="status status-active">' + esc(t("statusActive")) + "</span>";

      art.innerHTML =
        '<div class="project-main">' +
        "<h4>" + (r.featured ? "✦ " : "") +
        '<a href="' + esc(r.url) + '" target="_blank" rel="noopener">' + esc(r.name) + "</a></h4>" +
        "<p>" + esc(r.desc) + "</p>" + hl + ln +
        "</div>" +
        '<div class="project-meta">' + langTag(r.lang) + st + st2 + "</div>";

      groups[r.group].appendChild(art);
    });

    Object.keys(groups).forEach(function (name) {
      if (!groups[name].querySelector(".project")) groups[name].remove();
    });

    setText("tw-repos", items.length);
    setText("filter-count", t("projectsCount")(items.length));
    initFilter();
  }

  /* ═══════════════════════ 8. Starred ═══════════════════════════ */

  var FALLBACK_STARRED = [
    { full_name: "anomalyco/opencode", html_url: "https://github.com/anomalyco/opencode", stargazers_count: 193344, language: "TypeScript", description: "" },
    { full_name: "ripienaar/free-for-dev", html_url: "https://github.com/ripienaar/free-for-dev", stargazers_count: 131106, language: "HTML", description: "" },
    { full_name: "gorhill/uBlock", html_url: "https://github.com/gorhill/uBlock", stargazers_count: 66728, language: "JavaScript", description: "" },
    { full_name: "decolua/9router", html_url: "https://github.com/decolua/9router", stargazers_count: 24662, language: "JavaScript", description: "" },
    { full_name: "xai-org/grok-build", html_url: "https://github.com/xai-org/grok-build", stargazers_count: 24124, language: "Rust", description: "" }
  ];

  function renderStarred(list) {
    if (!list) return;
    lastStarred = list;
    var sec = document.getElementById("starred");
    var host = document.getElementById("starred-list");
    if (!sec || !host) return;

    var filtered = list.filter(function (r) {
      return CONFIG.excludeStarred.indexOf(r.full_name) === -1;
    });
    if (!filtered.length) return;

    var top = filtered.slice(0, CONFIG.starredLimit);
    sec.hidden = false;
    host.innerHTML = "";

    top.forEach(function (r) {
      var parts = r.full_name.split("/");
      var li = document.createElement("li");
      li.innerHTML =
        '<div class="starred-main">' +
        '<a href="' + esc(r.html_url) + '" target="_blank" rel="noopener">' + esc(parts[1]) + "</a> " +
        '<span class="owner">' + esc(parts[0]) + "</span>" +
        (r.description ? '<p class="starred-desc">' + esc(r.description) + "</p>" : "") +
        "</div>" +
        '<div class="starred-meta">' + langTag(r.language) +
        '<span class="stars">★ ' + num(LANG, r.stargazers_count) + "</span></div>";
      host.appendChild(li);
    });

    setText("starred-note", t("starredNote")(top.length, filtered.length));
  }

  /* ═══════════════════════ 9. Grep filter ═══════════════════════ */

  var filterInput = document.getElementById("filter");
  var filterCount = document.getElementById("filter-count");
  var projects = [];
  var groups = [];

  function initFilter() {
    projects = Array.prototype.slice.call(document.querySelectorAll("#projects-list .project"));
    groups = Array.prototype.slice.call(document.querySelectorAll("#projects-list .project-group"));
    applyFilter(filterInput ? filterInput.value : "");
  }

  function applyFilter(q) {
    q = (q || "").trim().toLowerCase();
    var shown = 0;
    projects.forEach(function (p) {
      var hit = !q || p.textContent.toLowerCase().indexOf(q) !== -1;
      p.style.display = hit ? "" : "none";
      if (hit) shown++;
    });
    groups.forEach(function (g) {
      var any = Array.prototype.some.call(g.querySelectorAll(".project"),
        function (p) { return p.style.display !== "none"; });
      g.style.display = any ? "" : "none";
    });
    if (filterCount) filterCount.textContent = q
      ? t("projectsMatched")(shown, projects.length)
      : t("projectsCount")(projects.length);
  }

  if (filterInput) filterInput.addEventListener("input", function () { applyFilter(filterInput.value); });

  /* ═══════════════════════ 10. Command palette ══════════════════ */

  var overlay = document.getElementById("palette");
  var input = document.getElementById("palette-input");
  var out = document.getElementById("palette-out");
  var hintBtn = document.getElementById("palette-hint");
  var lastFocused = null;
  var history = [];
  var histIdx = -1;

  var SECTION_IDS = {
    about: "#about", projects: "#projects", stack: "#stack",
    recent: "#recent", starred: "#starred", contact: "#contact"
  };

  function outLine(text, cls) {
    var span = document.createElement("span");
    span.className = "line " + (cls || "out");
    span.textContent = text;
    out.appendChild(span);
    out.scrollTop = out.scrollHeight;
  }

  function runCommand(raw) {
    var cmd = raw.trim();
    outLine("$ " + cmd, "prompt-line");
    if (!cmd) return;

    var args = cmd.split(/\s+/);
    var head = args[0].toLowerCase();

    if (head === "help" || head === "?") {
      outLine("commands: help · whoami · ls · goto <section> · about · projects · stack · recent · starred · contact · github · telegram · twitter · clear · exit", "dim");
      return;
    }
    if (head === "clear") { out.innerHTML = ""; return; }
    if (head === "exit" || head === "quit" || head === "q") { closePalette(); return; }
    if (head === "whoami") { outLine("Mahyar — Developer & Security Enthusiast · Iran", "acc"); return; }
    if (head === "ls") {
      var n = document.getElementById("m-repos");
      var p = document.getElementById("filter-count");
      outLine("repos: " + (n ? n.textContent : "?") + " · " + (p ? p.textContent : ""), "acc");
      return;
    }

    if (head === "goto" || SECTION_IDS[head]) {
      var target = SECTION_IDS[head] || SECTION_IDS[args[1]];
      if (target) {
        var sec = document.querySelector(target);
        if (sec && sec.hidden) { outLine("no such section (hidden)", "dim"); return; }
        closePalette();
        if (sec) sec.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        return;
      }
    }

    var links = {
      github: "https://github.com/QMahyar",
      telegram: "https://t.me/Qstickers",
      twitter: "https://x.com/Mahyartdb"
    };
    if (links[head]) { window.open(links[head], "_blank", "noopener"); return; }

    outLine("command not found: " + head + " — try 'help'", "err");
  }

  function openPalette() {
    if (!overlay) return;
    lastFocused = document.activeElement;
    overlay.hidden = false;
    input.value = "";
    histIdx = history.length;
    out.innerHTML = "";
    outLine("type 'help' for commands · esc to exit", "dim");
    input.focus();
  }

  function closePalette() {
    if (!overlay) return;
    overlay.hidden = true;
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function keydown(e) {
    var tag = (document.activeElement && document.activeElement.tagName) || "";
    var typing = tag === "INPUT" || tag === "TEXTAREA";

    if (!typing && (e.key === "/" || (e.ctrlKey && (e.key === "k" || e.key === "K")))) {
      e.preventDefault();
      openPalette();
      return;
    }
    if (overlay.hidden) return;

    if (e.key === "Escape") { e.preventDefault(); closePalette(); return; }

    if (e.key === "Enter") {
      e.preventDefault();
      var v = input.value.trim();
      if (v) history.push(v);
      histIdx = history.length;
      runCommand(v);
      return;
    }

    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      if (!history.length) return;
      e.preventDefault();
      if (e.key === "ArrowUp") histIdx = Math.max(0, histIdx - 1);
      else histIdx = Math.min(history.length, histIdx + 1);
      input.value = history[histIdx] || "";
      input.setSelectionRange(input.value.length, input.value.length);
    }
  }

  document.addEventListener("keydown", keydown);
  if (hintBtn) hintBtn.addEventListener("click", openPalette);
  if (overlay) overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closePalette();
  });

  /* ═══════════════════════ 11. Activity heatmap ═════════════════ */

  function renderActivity(events) {
    var host = document.getElementById("activity-grid");
    if (!host) return;

    if (!events || !events.length) {
      /* generate placeholder grid */
      var frag = document.createDocumentFragment();
      for (var i = 0; i < 84; i++) {
        var cell = document.createElement("span");
        cell.className = "activity-cell";
        cell.dataset.level = "0";
        frag.appendChild(cell);
      }
      host.innerHTML = "";
      host.appendChild(frag);
      return;
    }

    lastActivity = events;

    /* count events per day */
    var dayCounts = {};
    var earliest = Date.now();
    var DAY_MS = 86400000;

    events.forEach(function (ev) {
      var d = ev.created_at ? new Date(ev.created_at) : null;
      if (!d || isNaN(d.getTime())) return;
      var key = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
      dayCounts[key] = (dayCounts[key] || 0) + 1;
      if (d.getTime() < earliest) earliest = d.getTime();
    });

    /* build last ~16 weeks (112 days) ending today */
    var today = new Date();
    today.setHours(23, 59, 59, 999);
    var endMs = today.getTime();
    var weeks = 16;
    var totalDays = weeks * 7;
    var startMs = endMs - (totalDays - 1) * DAY_MS;

    /* find max for scaling */
    var maxCount = 1;
    Object.keys(dayCounts).forEach(function (k) {
      if (dayCounts[k] > maxCount) maxCount = dayCounts[k];
    });

    function level(count) {
      if (!count) return 0;
      var ratio = count / maxCount;
      if (ratio <= 0.25) return 1;
      if (ratio <= 0.5) return 2;
      if (ratio <= 0.75) return 3;
      return 4;
    }

    var frag = document.createDocumentFragment();
    for (var i = 0; i < totalDays; i++) {
      var cellDate = new Date(startMs + i * DAY_MS);
      var key = cellDate.getFullYear() + "-" + String(cellDate.getMonth() + 1).padStart(2, "0") + "-" + String(cellDate.getDate()).padStart(2, "0");
      var count = dayCounts[key] || 0;
      var lv = level(count);

      var cell = document.createElement("span");
      cell.className = "activity-cell";
      cell.dataset.level = String(lv);

      if (count > 0) {
        cell.dataset.tip = t("activityTip")(count, formatDate(cellDate.toISOString()));
      }

      frag.appendChild(cell);
    }

    host.innerHTML = "";
    host.appendChild(frag);
  }

  /* ═══════════════════════ boot ═════════════════════════════════ */

  var base = "https://api.github.com";

  /* static fallback projects (same shape as decorated items) */
  var FALLBACK_PROJECTS = [
    { pre: true, name: "Telegram-Cli", desc: "Every account you own in one terminal — MTProto, spoken as a real user.", lang: "Go", stars: 0, archived: false, url: "https://github.com/QMahyar/Telegram-Cli", group: "Telegram & Messaging", groupFa: "تلگرام و پیامرسان", featured: true, highlights: CONFIG.highlights["Telegram-Cli"], link: null, tags: "telegram-cli go telegram mtproto cli", pushed: 0 },
    { pre: true, name: "TeleManager", desc: "Local-first session manager for your own Telegram accounts — a local web app, nothing leaves your machine.", lang: "TypeScript", stars: 1, archived: false, url: "https://github.com/QMahyar/TeleManager", group: "Telegram & Messaging", groupFa: "تلگرام و پیامرسان", featured: true, highlights: CONFIG.highlights.TeleManager, link: CONFIG.links.TeleManager, tags: "telemanager typescript telegram sessions manager web", pushed: 0 },
    { pre: true, name: "Q-Manager", desc: "Cross-platform desktop app for Telegram Werewolf game automation — multi-account management, phase detection, action automation.", lang: "TypeScript", stars: 1, archived: false, url: "https://github.com/QMahyar/Q-Manager", group: "Telegram & Messaging", groupFa: "تلگرام و پیامرسان", featured: false, highlights: [], link: null, tags: "q-manager typescript telegram werewolf desktop electron", pushed: 0 },
    { pre: true, name: "Cloudflare-Scanner", desc: "Find working Cloudflare Warp endpoints and clean proxy IPs — fast, free, no setup.", lang: "Go", stars: 10, archived: false, url: "https://github.com/QMahyar/Cloudflare-Scanner", group: "Networking & Cloud", groupFa: "شبکه و ابر", featured: true, highlights: CONFIG.highlights["Cloudflare-Scanner"], link: CONFIG.links["Cloudflare-Scanner"], tags: "cloudflare-scanner go cloudflare warp xray network ip scanner", pushed: 0 },
    { pre: true, name: "cli-maker", desc: "CLI generator — produces Go CLIs from API docs with local SQLite caching and compound commands.", lang: "Go", stars: 0, archived: false, url: "https://github.com/QMahyar/cli-maker", group: "Developer Tools", groupFa: "ابزارهای توسعه", featured: false, highlights: [], link: null, tags: "cli-maker go cli generator sqlite", pushed: 0 },
    { pre: true, name: "pi-9router", desc: "pi extension — multi-provider gateway for chat, image, speech, search & fetch tools.", lang: "TypeScript", stars: 0, archived: false, url: "https://github.com/QMahyar/pi-9router", group: "Developer Tools", groupFa: "ابزارهای توسعه", featured: false, highlights: [], link: { label: "npm", url: "https://www.npmjs.com/package/@qmahyar/pi-9router" }, tags: "pi-9router typescript pi extension gateway npm", pushed: 0 },
    { pre: true, name: "pi-exa-search", desc: "pi extension — semantic web search & page fetch with multi-key rotation and highlights.", lang: "TypeScript", stars: 0, archived: false, url: "https://github.com/QMahyar/pi-exa-search", group: "Developer Tools", groupFa: "ابزارهای توسعه", featured: false, highlights: [], link: { label: "npm", url: "https://www.npmjs.com/package/@qmahyar/pi-exa-search" }, tags: "pi-exa-search typescript pi extension search npm", pushed: 0 },
    { pre: true, name: "pi-termux", desc: "pi skill for Termux extra keys — layout configs, reference, macros.", lang: "", stars: 1, archived: false, url: "https://github.com/QMahyar/pi-termux", group: "Developer Tools", groupFa: "ابزارهای توسعه", featured: false, highlights: [], link: null, tags: "pi-termux pi termux skill keys", pushed: 0 },
    { pre: true, name: "wezterm-config", desc: "Personal WezTerm configuration for Windows — the palette this site is built from.", lang: "Lua", stars: 1, archived: false, url: "https://github.com/QMahyar/wezterm-config", group: "Apps & Configs", groupFa: "اپها و تنظیمات", featured: false, highlights: [], link: null, tags: "wezterm-config lua wezterm terminal config windows", pushed: 0 }
  ];

  /* initial render (fallback data), then live fetches replace it */
  applyLang();
  renderMetrics(FALLBACK_METRICS);
  renderProjects(FALLBACK_PROJECTS);
  renderRecent(FALLBACK_RECENT.map(function (r) {
    return { name: r.name, url: r.url, when: relTime(LANG, null), pushed_at: null };
  }));
  renderStarred(FALLBACK_STARRED);
  renderActivity(null);

  api(base + "/users/" + CONFIG.user)
    .then(function (u) {
      renderMetrics({
        repos: u.public_repos,
        followers: u.followers,
        following: u.following,
        joined: String(new Date(u.created_at).getFullYear())
      });
    })
    .catch(function () { /* keep fallback */ });

  api(base + "/users/" + CONFIG.user + "/repos?per_page=100")
    .then(function (repos) {
      var own = repos.filter(function (r) { return !r.fork; });
      var byLang = {};
      own.forEach(function (r) {
        var lang = r.language || "other";
        byLang[lang] = (byLang[lang] || 0) + 1;
      });
      var langs = Object.keys(byLang).map(function (name) {
        return { name: name, count: byLang[name], color: LANG_COLORS[name.toLowerCase()] || "#8A8A8A" };
      });
      var recent = own
        .filter(function (r) {
          return r.pushed_at && r.name !== "QMahyar" && r.name !== "QMahyar.github.io";
        })
        .sort(function (a, b) { return new Date(b.pushed_at) - new Date(a.pushed_at); })
        .slice(0, 5);
      renderBars(langs);
      renderRecent(recent);
      renderMetrics({ repos: own.length, followers: lastMetrics.followers, following: lastMetrics.following, joined: lastMetrics.joined });
      renderProjects(own);
    })
    .catch(function () { renderBars(FALLBACK_LANGS); });

  api(base + "/users/" + CONFIG.user + "/starred?per_page=100")
    .then(renderStarred)
    .catch(function () { /* fallback already rendered */ });

  /* fetch activity events for heatmap */
  api(base + "/users/" + CONFIG.user + "/events?per_page=100")
    .then(function (events) {
      renderActivity(events);
    })
    .catch(function () { renderActivity(null); });
})();
