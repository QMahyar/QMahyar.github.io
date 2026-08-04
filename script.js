/* Terminal session typewriter — the one orchestrated moment on the page.
   Types a short command session line by line, then stops.
   Respects prefers-reduced-motion: renders instantly. */

(function () {
  "use strict";

  var el = document.getElementById("typewriter");
  var cursor = document.getElementById("cursor");
  if (!el) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Each line: { p: prompt string, out: response string, cls: css class } */
  var script = [
    { p: "$ whoami", out: "Mahyar — Developer & Security Enthusiast · Iran", cls: "" },
    { p: "$ ls ~/projects | wc -l", out: "12", cls: "acc" },
    { p: "$ cat ~/interests.txt", out: "telegram · networking · cli tools · automation", cls: "dim" }
  ];

  function done() {
    if (cursor) cursor.classList.add("done");
  }

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
    el.appendChild(frag);
    done();
    return;
  }

  var i = 0;           /* current line index */
  var typing = false;  /* true while a prompt is being typed */
  var running = true;

  function tick() {
    if (!running) return;

    if (i >= script.length) {
      done();
      return;
    }

    var line = script[i];
    var node = document.createElement("span");

    if (!typing) {
      /* print the prompt character by character */
      node.className = "line prompt-line";
      var cmd = document.createElement("span");
      cmd.className = "cmd";
      node.appendChild(document.createTextNode(line.p.charAt(0)));
      node.appendChild(cmd);
      el.appendChild(node);

      var pos = 1;
      typing = true;
      var typeTimer = setInterval(function () {
        if (!running) { clearInterval(typeTimer); return; }
        if (pos < line.p.length) {
          cmd.textContent = line.p.substring(0, pos + 1);
          pos++;
          el.scrollTop = el.scrollHeight;
        } else {
          clearInterval(typeTimer);
          typing = false;
          /* print the response */
          setTimeout(function () {
            if (!running) return;
            var out = document.createElement("span");
            out.className = "line out" + (line.cls ? " " + line.cls : "");
            out.textContent = line.out;
            el.appendChild(out);
            i++;
            setTimeout(tick, 420);
          }, 260);
        }
      }, 38);
    }
  }

  /* small beat before the session starts */
  setTimeout(tick, 350);
})();
