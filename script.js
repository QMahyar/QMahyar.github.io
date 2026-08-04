/* QMahyar.github.io — all page behavior.
   1. Hero typewriter        2. Terminal clock       3. Live GitHub metrics
   4. Language bars          5. Recently-pushed list 6. Project grep filter
   7. Command palette ( / or Ctrl+K )
*/

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── 1. Hero typewriter ─────────────────────────────────────── */

  var twEl = document.getElementById("typewriter");
  var cursor = document.getElementById("cursor");

  /* Each line: { p: prompt, out: response, cls: css class } */
  var script = [
    { p: "$ whoami", out: "Mahyar — Developer & Security Enthusiast · Iran", cls: "" },
    { p: "$ ls ~/projects | wc -l", out: "12", cls: "acc", id: "tw-repos" },
    { p: "$ cat ~/interests.txt", out: "telegram · networking · cli tools · automation", cls: "dim" }
  ];

  function typewriterDone() {
    if (cursor) cursor.classList.add("done");
  }

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
      var li = 0, typing = false, running = true;

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
        typing = true;
        var t = setInterval(function () {
          if (!running) { clearInterval(t); return; }
          if (pos < line.p.length) {
            cmd.textContent = line.p.substring(0, pos + 1);
            pos++;
          } else {
            clearInterval(t);
            typing = false;
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

  /* ── 2. Terminal clock ──────────────────────────────────────── */

  var clock = document.getElementById("clock");
  if (clock) {
    function tickClock() {
      var d = new Date();
      var hh = String(d.getHours()).padStart(2, "0");
      var mm = String(d.getMinutes()).padStart(2, "0");
      var ss = String(d.getSeconds()).padStart(2, "0");
      clock.textContent = hh + ":" + mm + ":" + ss;
    }
    tickClock();
    setInterval(tickClock, 1000);
  }

  /* ── 3-5. Live GitHub data ──────────────────────────────────── */

  /* Static fallback (own repos only, forks excluded) */
  var FALLBACK = {
    repos: 12, stars: 16, followers: 7, following: 14,
    joined: "2017",
    langs: [
      { name: "TypeScript", count: 4, color: "#4D8FFF" },
      { name: "Go",         count: 3, color: "#79EAEA" },
      { name: "HTML",       count: 1, color: "#FFEE58" },
      { name: "Python",     count: 1, color: "#E040D0" },
      { name: "Lua",        count: 1, color: "#FF5561" }
    ],
    recent: [
      { name: "Telegram-Cli",     url: "https://github.com/QMahyar/Telegram-Cli",     when: "just now" },
      { name: "cli-maker",        url: "https://github.com/QMahyar/cli-maker",        when: "yesterday" },
      { name: "Cloudflare-Scanner", url: "https://github.com/QMahyar/Cloudflare-Scanner", when: "recently" },
      { name: "pi-9router",       url: "https://github.com/QMahyar/pi-9router",       when: "recently" },
      { name: "pi-exa-search",    url: "https://github.com/QMahyar/pi-exa-search",    when: "recently" }
    ]
  };

  var LANG_COLORS = {
    go: "#79EAEA", typescript: "#4D8FFF", python: "#FFEE58", lua: "#E040D0",
    html: "#FF5561", shell: "#23F00F", javascript: "#FFEE58", c: "#8A8A8A", rust: "#FF5561"
  };

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

  function fmt(n) {
    return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : String(n);
  }

  function setMetrics(data) {
    var set = function (id, val) {
      var el = document.getElementById(id);
      if (el) el.textContent = val;
    };
    set("m-repos", data.repos);
    set("m-stars", data.stars);
    set("m-followers", data.followers);
    set("m-following", data.following);
    set("m-joined", data.joined);
    set("gh-line", data.repos + " repos · ★ " + data.stars);
    var tw = document.getElementById("tw-repos");
    if (tw && !reduceMotion) tw.textContent = data.repos;
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
        '<span class="bar-label">' + l.name + "</span>" +
        '<div class="bar-track"><div class="bar-fill" style="width:' + pct +
          '%;background:' + l.color + '"></div></div>' +
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
        '<a href="' + r.url + '" target="_blank" rel="noopener">' + r.name + "</a>" +
        '<span class="when">' + r.when + "</span>";
      host.appendChild(li);
    });
  }

  function applyData(d) {
    setMetrics(d);
    renderBars(d.langs);
    renderRecent(d.recent);
  }

  var api = "https://api.github.com";
  var selfReposUrl = api + "/users/QMahyar/repos?per_page=100";

  fetch(api + "/users/QMahyar")
    .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
    .then(function (u) {
      FALLBACK.followers = u.followers;
      FALLBACK.following = u.following;
      FALLBACK.joined = String(new Date(u.created_at).getFullYear());
    })
    .catch(function () { /* keep fallback */ });

  fetch(selfReposUrl)
    .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
    .then(function (repos) {
      var own = repos.filter(function (r) { return !r.fork; });
      var byLang = {};
      own.forEach(function (r) {
        var lang = (r.language || "other");
        byLang[lang] = (byLang[lang] || 0) + 1;
      });
      var langs = Object.keys(byLang).map(function (name) {
        return {
          name: name,
          count: byLang[name],
          color: LANG_COLORS[name.toLowerCase()] || "#8A8A8A"
        };
      });
      var stars = own.reduce(function (a, r) { return a + r.stargazers_count; }, 0);
      var recent = own
        .filter(function (r) { return r.pushed_at; })
        .sort(function (a, b) { return new Date(b.pushed_at) - new Date(a.pushed_at); })
        .slice(0, 5)
        .map(function (r) {
          return { name: r.name, url: r.html_url, when: relTime(r.pushed_at) };
        });
      applyData({ repos: own.length, stars: stars, langs: langs, recent: recent });
    })
    .catch(function () { applyData(FALLBACK); });

  /* ── 6. Project grep filter ─────────────────────────────────── */

  var filterInput = document.getElementById("filter");
  var filterCount = document.getElementById("filter-count");
  var projects = Array.prototype.slice.call(document.querySelectorAll(".project"));
  var groups = Array.prototype.slice.call(document.querySelectorAll(".project-group"));

  function applyFilter(q) {
    q = q.trim().toLowerCase();
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
    filterCount.textContent = q
      ? shown + " / " + projects.length + " matched"
      : projects.length + " projects";
  }

  if (filterInput && filterCount) {
    filterInput.addEventListener("input", function () { applyFilter(filterInput.value); });
  }

  /* ── 7. Command palette ─────────────────────────────────────── */

  var overlay = document.getElementById("palette");
  var input = document.getElementById("palette-input");
  var out = document.getElementById("palette-out");
  var hintBtn = document.getElementById("palette-hint");
  var lastFocused = null;
  var history = [];
  var histIdx = -1;

  var CMD = {
    help: function () {
      return "commands: help · whoami · ls · about · projects · stack · recent · " +
             "contact · github · telegram · twitter · clear · exit";
    },
    whoami: function () { return "Mahyar — Developer & Security Enthusiast · Iran"; },
    ls: function () {
      var n = document.getElementById("m-repos");
      var s = document.getElementById("m-stars");
      return "repos: " + (n ? n.textContent : "?") + " · stars: " + (s ? s.textContent : "?");
    },
    goto: function (sec) { return sec; },
    github: function () { return "github"; },
    telegram: function () { return "telegram"; },
    twitter: function () { return "twitter"; }
  };

  var SECTION_IDS = { about: "#about", projects: "#projects", stack: "#stack", recent: "#recent", contact: "#contact" };

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

    if (head === "help" || head === "?") { outLine(CMD.help(), "dim"); return; }
    if (head === "clear") { out.innerHTML = ""; return; }
    if (head === "exit" || head === "quit" || head === "q") { closePalette(); return; }
    if (head === "whoami") { outLine(CMD.whoami(), "acc"); return; }
    if (head === "ls") { outLine(CMD.ls(), "acc"); return; }

    if (head === "goto" || SECTION_IDS[head]) {
      var target = SECTION_IDS[head] || SECTION_IDS[args[1]];
      if (target) {
        closePalette();
        document.querySelector(target).scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
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

    /* open: / or Ctrl+K (unless typing in a field) */
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
      if (v) { history.push(v); }
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

  /* initial static render (before/if API never resolves) */
  applyData(FALLBACK);
})();
