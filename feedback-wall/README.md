# Pandai — Live Feedback Wall

A real-time sticky-notes wall for your presentation. The audience scans a QR, opens it on
their phones, and posts free-form notes that appear **live** on the wall for everyone — and
stay saved so you can review/export them after the talk.

- **Cloudflare Worker + Durable Object** — one shared board.
- **WebSocket Hibernation API** — real-time, cheap to run.
- **SQLite storage** inside the Durable Object — notes persist (survive restarts).
- One self-contained file (`src/index.js`); the page HTML is inlined.

## No git connection required

This deploys with the **Wrangler CLI**, which uploads straight from this folder to Cloudflare.
You do **not** need to connect a git repo (that's the Cloudflare *Pages* flow — not used here).
You can even copy this `feedback-wall/` folder anywhere outside the repo and deploy from there.
It runs on the **free** Workers plan.

## Deploy (3 steps)

```bash
cd feedback-wall
npx wrangler login      # opens a browser once to authorize your Cloudflare account
npx wrangler deploy
```

Wrangler prints your live URL, e.g.:

```
https://pandai-feedback-wall.<your-subdomain>.workers.dev
```

That URL **is** the wall. Put it (as a QR) on the slide before your Overview section.

## Local preview

```bash
npx wrangler dev        # http://localhost:8787
```

## Admin / moderation (optional)

Set a secret token, then open the wall with it to delete notes, clear the board, or export:

```bash
npx wrangler secret put ADMIN_TOKEN     # type any password when prompted
```

- **Audience link:** `https://…workers.dev/`
- **Your admin link:** `https://…workers.dev/admin?key=YOUR_TOKEN`
  (shows a × on each note + Export CSV / Export JSON / Clear all)

Without a token set, delete/clear are disabled for everyone (safe default). Posting is always open.

## Export the notes after the talk

- **JSON:** `https://…workers.dev/export`
- **CSV:**  `https://…workers.dev/export?format=csv`
  (or use the buttons in admin mode)

## Customize

- **Note colours / limits:** `ALLOWED_COLORS`, `MAX_TEXT`, `MAX_NAME` at the top of `src/index.js`.
- **Title / prompt / styling:** edit the `BOARD_HTML` template in `src/index.js`.
- **Worker name / URL:** `name` in `wrangler.jsonc`.

## How it works

```
phone ──ws──┐
phone ──ws──┤   Worker  ──►  Durable Object "main"  ──►  SQLite (notes)
screen ─ws──┘   (routes)      (broadcasts to all sockets)
```

All WebSocket connections attach to one Durable Object (`getByName("main")`). A new note is
written to SQLite, then broadcast to every connected socket — so every phone and the projected
screen update instantly. On connect, each client receives the full current wall.
