/* QMahyar.github.io — everything is fetched live from the GitHub API.
   To curate, edit the CONFIG block below — no HTML edits needed.
   1. Typewriter   2. Clock   3. Metrics   4. Language bars
   5. Recent       6. Auto projects   7. Starred   8. Grep filter
   9. Command palette
*/

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ═══════════════════════ CONFIG — edit me ══════════════════════ */

  var CONFIG = {
    user: "QMahyar",

    /* repos hidden from ~/projects (by exact name) */
    exclude: ["QMahyar", "QMahyar.github.io"],
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

    /* optional description overrides (falls back to the repo description) */
    describe: {
      "TeleManager": "Local-first session manager for your own Telegram accounts — a local web app, nothing leaves your machine."
    },

    /* extra links: { "<repo>": { label, url } } — npm links are added automatically */
    links: {
      "TeleManager": { label: "releases", url: "https://github.com/QMahyar/TeleManager/releases/latest" },
      "Cloudflare-Scanner": { label: "releases", url: "https://github.com/QMahyar/Cloudflare-Scanner/releases/latest" }
    },

    /* group order + keyword rules (matched against name, topics, description) */
    groups: [
      { name: "Telegram & Messaging", match: ["telegram", "mtproto", "telethon", "werewolf", "broadcast", "session"] },
      { name: "Networking & Cloud",   match: ["cloudflare", "warp", "vpn", "xray", "network", "scanner", "privacy"] },
      { name: "Developer Tools",      match: ["pi-", "cli", "extension", "generator", "9router", "exa", "search", "npm"] },
      { name: "Apps & Configs",       match: [] } /* fallback group */
    ],

    starredLimit: 8,          /* rows in ~/starred */
    excludeStarred: []        /* e.g. "owner/name" */
  };

  /* ═══════════════════════ 1. Typewriter ═════════════════════════ */

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

  /* ═══════════════════════ 2. Terminal clock ═════════════════════ */

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

  function fetchAll(url) {
    var out = [];
    return api(url).then(function (page) {
      out = out.concat(page);
      return out;
    });
  }

  function relTime(iso) {
    var then = new Date(iso).getTime();
    if (isNaN(then)) return "recently";
    var s = Math.max(1, Math.floor((Date.now() - then) / 1000));
    if (s < 60) return "just now";
    var m = Math.floor(s / 60);   if (m < 60)  return m + "m ago";
    var h = Math.floor(m / 60);   if (h < 24)  return h + "h ago";
    var d = Math.floor(h / 24);   if (d < 30)  return d + "d ago";
    var mo = Math.floor(d / 30);  if (mo < 12) return mo + "mo ago";
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

  /* ═══════════════════════ 3. Metrics ═══════════════════════════ */

  var FALLBACK = {
    repos: 12, followers: 7, following: 14, joined: "2017",
    langs: [
      { name: "TypeScript", count: 4, color: "#4D8FFF" },
      { name: "Go", count: 3, color: "#79EAEA" },
      { name: "HTML", count: 1, color: "#FFEE58" },
      { name: "Python", count: 1, color: "#E040D0" },
      { name: "Lua", count: 1, color: "#FF5561" }
    ]
  };

  var LANG_COLORS = {
    go: "#79EAEA", typescript: "#4D8FFF", python: "#FFEE58", lua: "#E040D0",
    html: "#FF5561", shell: "#23F00F", javascript: "#FFEE58", c: "#8A8A8A",
    rust: "#FF5561", csharp: "#E040D0"
  };
  var LANG_CLASS = { go: "tag-go", typescript: "tag-ts", python: "tag-py", lua: "tag-lua" };

  function setMetrics(data) {
    setText("m-repos", data.repos);
    setText("m-followers", data.followers);
    setText("m-following", data.following);
    setText("m-joined", data.joined);
  }

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
        '<div class="bar-track"><div class="bar-fill" style="width:' + pct +
        "%;background:" + l.color + '"></div></div>' +
        '<span class="bar-pct">' + pct + "%</span>";
      host.appendChild(row);
    });
  }

  function renderRecent(repos) {
    var host = document.getElementById("recent-list");
    if (!host || !repos.length) return;
    host.innerHTML = "";
    repos.slice(0, 5).forEach(function (r) {
      var li = document.createElement("li");
      li.innerHTML =
        '<a href="' + esc(r.url) + '" target="_blank" rel="noopener">' + esc(r.name) + "</a>" +
        '<span class="when">' + esc(r.when) + "</span>";
      host.appendChild(li);
    });
  }

  /* ═══════════════════════ 6. Auto projects ═════════════════════ */

  function decorate(r) {
    /* r comes from the API, or from FALLBACK projects with r.pre = true */
    if (r.pre) return r;

    var name = r.name;
    var desc = CONFIG.describe[name] || r.description || "";
    var tags = (name + " " + (r.language || "") + " " + (r.topics || []).join(" ") + " " + desc).toLowerCase();

    var group = null;
    for (var i = 0; i < CONFIG.groups.length; i++) {
      var g = CONFIG.groups[i];
      if (g.match.some(function (k) { return tags.indexOf(k) !== -1; })) { group = g.name; break; }
    }
    if (!group) group = CONFIG.groups[CONFIG.groups.length - 1].name;

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
      group: group,
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
    var host = document.getElementById("projects-list");
    if (!host) return;

    var items = repos.map(decorate).sort(compare);
    host.innerHTML = "";

    var groups = {};
    items.forEach(function (r) {
      if (!groups[r.group]) {
        var wrap = document.createElement("div");
        wrap.className = "project-group";
        wrap.dataset.group = r.group;
        var h3 = document.createElement("h3");
        h3.textContent = r.group;
        wrap.appendChild(h3);
        host.appendChild(wrap);
        groups[r.group] = wrap;
      }
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
      var ln = r.link ? '<p class="project-links"><a href="' + esc(r.link.url) + '" target="_blank" rel="noopener">' +
        esc(r.link.label) + " →</a></p>" : "";
      var st = r.stars > 0 ? '<span class="stars">★ ' + r.stars + "</span>" : "";
      var st2 = r.archived
        ? '<span class="status status-archived">archived</span>'
        : '<span class="status status-active">active</span>';

      art.innerHTML =
        '<div class="project-main">' +
        "<h4>" + (r.featured ? "✦ " : "") +
        '<a href="' + esc(r.url) + '" target="_blank" rel="noopener">' + esc(r.name) + "</a></h4>" +
        "<p>" + esc(r.desc) + "</p>" + hl + ln +
        "</div>" +
        '<div class="project-meta">' + langTag(r.lang) + st + st2 + "</div>";

      groups[r.group].appendChild(art);
    });

    setText("filter-count", items.length + " projects");
    setText("tw-repos", items.length);
    initFilter();
  }

  /* ═══════════════════════ 7. Starred ═══════════════════════════ */

  function renderStarred(list) {
    var sec = document.getElementById("starred");
    var host = document.getElementById("starred-list");
    if (!sec || !host) return;

    var filtered = list.filter(function (r) {
      return CONFIG.excludeStarred.indexOf(r.full_name) === -1;
    });
    if (!filtered.length) return; /* stays hidden */

    var top = filtered.slice(0, CONFIG.starredLimit);
    sec.hidden = false;
    host.innerHTML = "";

    top.forEach(function (r) {
      var li = document.createElement("li");
      var parts = r.full_name.split("/");
      li.innerHTML =
        '<div class="starred-main">' +
        '<a href="' + esc(r.html_url) + '" target="_blank" rel="noopener">' + esc(parts[1]) + "</a> " +
        '<span class="owner">' + esc(parts[0]) + "</span>" +
        (r.description ? '<p class="starred-desc">' + esc(r.description) + "</p>" : "") +
        "</div>" +
        '<div class="starred-meta">' + langTag(r.language) +
        '<span class="stars">★ ' + r.stargazers_count + "</span></div>";
      host.appendChild(li);
    });

    var note = filtered.length + " starred";
    if (filtered.length > top.length) note = "top " + top.length + " of " + filtered.length + " starred";
    setText("starred-note", "repos i've starred on github — live · " + note);
  }

  /* ═══════════════════════ 8. Grep filter ═══════════════════════ */

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
      ? shown + " / " + projects.length + " matched"
      : projects.length + " projects";
  }

  if (filterInput) filterInput.addEventListener("input", function () { applyFilter(filterInput.value); });

  /* ═══════════════════════ 9. Command palette ═══════════════════ */

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

  /* ═══════════════════════ boot ═════════════════════════════════ */

  var base = "https://api.github.com";

  /* static fallback projects (same shape as decorated items) */
  var FALLBACK_PROJECTS = [
    { pre: true, name: "Telegram-Cli", desc: "Every account you own in one terminal — MTProto, spoken as a real user.", lang: "Go", stars: 0, archived: false, url: "https://github.com/QMahyar/Telegram-Cli", group: "Telegram & Messaging", featured: true, highlights: CONFIG.highlights["Telegram-Cli"], link: null, tags: "telegram-cli go telegram mtproto cli", pushed: 0 },
    { pre: true, name: "TeleManager", desc: "Local-first session manager for your own Telegram accounts — a local web app, nothing leaves your machine.", lang: "TypeScript", stars: 1, archived: false, url: "https://github.com/QMahyar/TeleManager", group: "Telegram & Messaging", featured: true, highlights: CONFIG.highlights.TeleManager, link: CONFIG.links.TeleManager, tags: "telemanager typescript telegram sessions manager web", pushed: 0 },
    { pre: true, name: "Q-Manager", desc: "Cross-platform desktop app for Telegram Werewolf game automation — multi-account management, phase detection, action automation.", lang: "TypeScript", stars: 1, archived: false, url: "https://github.com/QMahyar/Q-Manager", group: "Telegram & Messaging", featured: false, highlights: [], link: null, tags: "q-manager typescript telegram werewolf desktop electron", pushed: 0 },
    { pre: true, name: "Cloudflare-Scanner", desc: "Find working Cloudflare Warp endpoints and clean proxy IPs — fast, free, no setup.", lang: "Go", stars: 10, archived: false, url: "https://github.com/QMahyar/Cloudflare-Scanner", group: "Networking & Cloud", featured: true, highlights: CONFIG.highlights["Cloudflare-Scanner"], link: CONFIG.links["Cloudflare-Scanner"], tags: "cloudflare-scanner go cloudflare warp xray network ip scanner", pushed: 0 },
    { pre: true, name: "cli-maker", desc: "CLI generator — produces Go CLIs from API docs with local SQLite caching and compound commands.", lang: "Go", stars: 0, archived: false, url: "https://github.com/QMahyar/cli-maker", group: "Developer Tools", featured: false, highlights: [], link: null, tags: "cli-maker go cli generator sqlite", pushed: 0 },
    { pre: true, name: "pi-9router", desc: "pi extension — multi-provider gateway for chat, image, speech, search & fetch tools.", lang: "TypeScript", stars: 0, archived: false, url: "https://github.com/QMahyar/pi-9router", group: "Developer Tools", featured: false, highlights: [], link: { label: "npm", url: "https://www.npmjs.com/package/@qmahyar/pi-9router" }, tags: "pi-9router typescript pi extension gateway npm", pushed: 0 },
    { pre: true, name: "pi-exa-search", desc: "pi extension — semantic web search & page fetch with multi-key rotation and highlights.", lang: "TypeScript", stars: 0, archived: false, url: "https://github.com/QMahyar/pi-exa-search", group: "Developer Tools", featured: false, highlights: [], link: { label: "npm", url: "https://www.npmjs.com/package/@qmahyar/pi-exa-search" }, tags: "pi-exa-search typescript pi extension search npm", pushed: 0 },
    { pre: true, name: "pi-termux", desc: "pi skill for Termux extra keys — layout configs, reference, macros.", lang: "", stars: 1, archived: false, url: "https://github.com/QMahyar/pi-termux", group: "Developer Tools", featured: false, highlights: [], link: null, tags: "pi-termux pi termux skill keys", pushed: 0 },
    { pre: true, name: "wezterm-config", desc: "Personal WezTerm configuration for Windows — the palette this site is built from.", lang: "Lua", stars: 1, archived: false, url: "https://github.com/QMahyar/wezterm-config", group: "Apps & Configs", featured: false, highlights: [], link: null, tags: "wezterm-config lua wezterm terminal config windows", pushed: 0 }
  ];

  var FALLBACK_STARRED = [
    { full_name: "anomalyco/opencode", html_url: "https://github.com/anomalyco/opencode", stargazers_count: 193344, language: "TypeScript", description: "Open-source coding agent" },
    { full_name: "ripienaar/free-for-dev", html_url: "https://github.com/ripienaar/free-for-dev", stargazers_count: 131106, language: "HTML", description: "A list of SaaS, PaaS and IaaS offerings with free dev tiers" },
    { full_name: "gorhill/uBlock", html_url: "https://github.com/gorhill/uBlock", stargazers_count: 66728, language: "JavaScript", description: "uBlock Origin — an efficient blocker for Chromium and Firefox" },
    { full_name: "decolua/9router", html_url: "https://github.com/decolua/9router", stargazers_count: 24662, language: "JavaScript", description: "" },
    { full_name: "xai-org/grok-build", html_url: "https://github.com/xai-org/grok-build", stargazers_count: 24124, language: "Rust", description: "" }
  ];

  renderProjects(FALLBACK_PROJECTS);
  renderStarred(FALLBACK_STARRED);

  /* live fetches (all fail-safe to the fallbacks above) */

  api(base + "/users/" + CONFIG.user)
    .then(function (u) {
      setMetrics({ followers: u.followers, following: u.following, joined: String(new Date(u.created_at).getFullYear()) });
    })
    .catch(function () { /* metrics keep the static HTML defaults */ });

  fetchAll(base + "/users/" + CONFIG.user + "/repos?per_page=100")
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
        .slice(0, 5)
        .map(function (r) {
          return { name: r.name, url: r.html_url, when: relTime(r.pushed_at) };
        });
      renderBars(langs);
      renderRecent(recent);
      setText("m-repos", own.length);
      renderProjects(own);
    })
    .catch(function () { renderBars(FALLBACK.langs); });

  api(base + "/users/" + CONFIG.user + "/starred?per_page=100")
    .then(renderStarred)
    .catch(function () { /* fallback already rendered */ });
})();
