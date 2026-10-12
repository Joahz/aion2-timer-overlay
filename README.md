# Aion 2 Timer Overlay

A small floating panel, like NOT METER's, with live countdowns for Aion 2
rifts, world bosses, Abyss and timed events. It stays on top of the game, you
can drag it anywhere, and you choose which events it shows.

The schedule matches https://gamers4.life/aion-2/database/en/events/ and is
built in, so the overlay works offline.

## Run it (Windows)

Double-click **`Aion2TimerOverlay.exe`**. You don't need to install anything.

The first time, Windows SmartScreen may say "Windows protected your PC",
because the exe isn't code-signed. Click **More info → Run anyway**.

## Build the exe yourself

```bash
npm install
npm run dist      # → dist/Aion2TimerOverlay.exe
```

## Run from source

You need Node.js 20+.

```bash
npm install
npm start
```

Or open `index.html` in any browser to try the panel without installing anything.

## Use it

| Control | What it does |
| --- | --- |
| Drag the title bar | Move the panel (position is remembered) |
| ⚙ → Width | Panel width (height fits the content automatically) |
| Region dropdown | NA East / NA West / EU / SA / JP / TW / KR server clock |
| ⚙ | Turn events on or off, one at a time or a whole category. Also sets opacity, alert lead time and how many rows to show |
| 🔔 / 🔕 | Beep and a desktop notification N minutes before an enabled event starts |
| ▾ | Collapse to just the title bar |
| **Ctrl+Shift+L** | Lock: clicks pass through to the game. Press again to unlock |
| **Ctrl+Shift+H** | Hide or show the overlay |

Rows are sorted by what's next. Events that are running now show **LIVE** and
the time left. Times are shown in your computer's local time.

The game needs to run in **windowed** or **borderless fullscreen** mode. No
overlay can draw over exclusive fullscreen.

## Updating the schedule

Every event is defined in `index.html` under "Schedule data". Times are in
server time. If the game changes a time, edit it there.

## Sharing a new version

Change `"version"` in `package.json` (for example to `1.0.1`) and push to
`main`. GitHub Actions builds the exe on Windows and publishes it on the
**Releases** page as `v1.0.1`. People you've added to the repo can download it
there.
