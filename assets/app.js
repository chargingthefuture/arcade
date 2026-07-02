/* Farah's Arcade — renders the game list from games.json.
   This runs entirely in the browser. It fetches one local file and touches no outside
   service, so opening the page tracks nobody. */

(function () {
  "use strict";

  var statusEl = document.getElementById("games-status");
  var gridEl = document.getElementById("games-grid");
  var emptyEl = document.getElementById("games-empty");

  function show(el) { if (el) el.hidden = false; }
  function hide(el) { if (el) el.hidden = true; }

  function showEmpty() {
    hide(statusEl);
    hide(gridEl);
    show(emptyEl);
  }

  // Build one game card. Everything is set with textContent / safe DOM calls so a game's
  // own text can never inject markup into the page.
  function buildCard(game) {
    var li = document.createElement("li");
    li.className = "game-card";

    var thumb = document.createElement("div");
    thumb.className = "game-thumb";
    thumb.setAttribute("aria-hidden", "true");
    thumb.textContent = game.emoji || "🎮"; // 🎮 fallback
    li.appendChild(thumb);

    var body = document.createElement("div");
    body.className = "game-body";

    var title = document.createElement("h3");
    title.className = "game-title";
    title.textContent = game.title || "Untitled game";
    body.appendChild(title);

    if (game.description) {
      var desc = document.createElement("p");
      desc.className = "game-desc";
      desc.textContent = game.description;
      body.appendChild(desc);
    }

    if (Array.isArray(game.tags) && game.tags.length) {
      var tags = document.createElement("ul");
      tags.className = "game-tags";
      game.tags.forEach(function (tag) {
        var t = document.createElement("li");
        t.textContent = String(tag);
        tags.appendChild(t);
      });
      body.appendChild(tags);
    }

    var actions = document.createElement("div");
    actions.className = "game-actions";

    if (game.playUrl) {
      var play = document.createElement("a");
      play.className = "btn btn-primary";
      play.href = game.playUrl;
      play.textContent = "Play";
      actions.appendChild(play);
    }
    if (game.sourceUrl) {
      var src = document.createElement("a");
      src.className = "btn-sm-ghost";
      src.href = game.sourceUrl;
      src.rel = "noopener";
      src.textContent = "Source code";
      actions.appendChild(src);
    }
    if (actions.childNodes.length) body.appendChild(actions);

    li.appendChild(body);
    return li;
  }

  function render(games) {
    if (!Array.isArray(games) || games.length === 0) {
      showEmpty();
      return;
    }
    var frag = document.createDocumentFragment();
    games.forEach(function (game) {
      if (game && typeof game === "object") frag.appendChild(buildCard(game));
    });
    gridEl.appendChild(frag);
    hide(statusEl);
    hide(emptyEl);
    show(gridEl);
  }

  fetch("games.json", { cache: "no-cache" })
    .then(function (res) {
      if (!res.ok) throw new Error("Could not load games.json: " + res.status);
      return res.json();
    })
    .then(function (data) {
      // Accept either a bare array or an object with a "games" array.
      var games = Array.isArray(data) ? data : (data && data.games) || [];
      render(games);
    })
    .catch(function () {
      // If the file is missing or unreadable, fall back to the calm empty state
      // rather than leaving a stuck "Loading…" message.
      showEmpty();
    });
})();
