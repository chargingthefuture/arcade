# Farah's Arcade

A small, honest home for free, open-source, **offline-first** games — with no ads, no tracking,
and no harassment.

Farah's Arcade is a companion to the **TI Skills Economy** (part of Charging the Future), a
peer-to-peer marketplace where survivors of human trafficking help each other rebuild their lives.
The mainstream app stores are not always safe ground: a game downloaded today can be replaced
tomorrow by a forced update that adds harassment and invades privacy. This arcade is a quiet place
to play instead — every game is offline-first (it keeps working once it is on your device), fully
open source, and free.

## What this repository is

This is a static landing page, built to be hosted on **GitHub Pages**. It loads nothing from any
outside service — no fonts, no scripts, no analytics — so simply opening the page tracks nobody.

```
index.html          The page itself
games.json          The list of games shown on the page (edit this to add a game)
assets/styles.css   Styling
assets/app.js       Reads games.json and builds the game grid in the browser
assets/favicon.svg  Site icon
.nojekyll           Tells GitHub Pages to serve the files exactly as they are
```

## View it locally

No build step is needed. Because the page reads `games.json` over the network, open it through a
local web server rather than a `file://` path:

```bash
# from the repository root
python3 -m http.server 8000
# then open http://localhost:8000
```

## Add a game

Games are listed in `games.json` so a new one can be added without touching the page markup. Add an
entry to the `games` array:

```json
{
  "games": [
    {
      "title": "Name of the game",
      "description": "One or two calm sentences about what it is.",
      "emoji": "🕹️",
      "tags": ["puzzle", "single-player"],
      "playUrl": "https://example.com/play",
      "sourceUrl": "https://github.com/your-account/your-game"
    }
  ]
}
```

Field reference:

| Field | Required | What it is |
|---|---|---|
| `title` | yes | The game's name. |
| `description` | no | A short, plain description. |
| `emoji` | no | A single emoji used as the card's artwork (defaults to 🎮). |
| `tags` | no | A list of short labels shown as chips. |
| `playUrl` | no | Link to play or download the game. Adds a **Play** button. |
| `sourceUrl` | no | Link to the game's public source code. Adds a **Source code** link. |

When the list is empty, the page shows a calm "the first games are on their way" message instead of
an empty grid.

## Publish with GitHub Pages

1. Push to the default branch.
2. In the repository settings, under **Pages**, set the source to **Deploy from a branch** and pick
   the default branch with the `/ (root)` folder.
3. GitHub serves the page at the address shown on that settings screen.

## The promise every game here keeps

- **No ads, ever** — nothing to buy, no nag screens.
- **No tracking** — no accounts, no analytics, no cookies following you.
- **Offline-first** — once it is on your device it keeps working with the internet off, and cannot
  be silently changed by a forced update.
- **Open source** — the full source code is public; there is no hidden behavior.
- **No harassment** — single-player, self-contained games with no chat and no strangers.
- **Yours to keep** — download it and it is yours; no login can revoke it.
