# Aion 2 Timer Overlay

A small floating panel, like NOT METER's, with live countdowns for Aion 2
rifts, world bosses, Abyss and timed events. It stays on top of the game, you
can drag it anywhere, and you choose which events it shows.

The schedule matches https://gamers4.life/aion-2/database/en/events/ and is
built in, so the overlay works offline.

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-FFDD00?style=for-the-badge&logo=buymeacoffee&logoColor=black)](https://buymeacoffee.com/slokey)

This overlay is free. If it helps you, you can [buy me a coffee](https://buymeacoffee.com/slokey) ☕

## Can this get me banned?

It's very unlikely. The overlay doesn't interact with the game in any way that
anti-cheat looks for. It is a normal window set to stay on top, the same as a
sticky-note app or a browser window pinned over the game.

**What it never does:**
- read or change the game's memory or files
- inject anything into the game (it doesn't hook in the way the Discord or Steam overlays do)
- read the game's network traffic
- press keys or click for you

All it does is check your PC's clock and count down to schedule times written
into the app. The two hotkeys (Ctrl+Shift+L and Ctrl+Shift+H) are registered
the normal Windows way, the same way Discord or OBS register theirs, and they
only control the overlay's own window.

What gets players banned is tools that reach into the game: memory readers,
packet sniffers (some DPS meters work this way), bots, macros that press keys
automatically, and speed or teleport hacks. This overlay does none of those.

Only NCSOFT decides what its anti-cheat flags, so nobody can promise 100%.
For zero doubt, open `index.html` in a browser instead of running the exe:
it's then just a web page, but it won't stay on top of the game.

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
**Releases** page as `v1.0.1`, where anyone can download it.

## Support

This overlay is free. If it saves you a missed rift or boss, you can [buy me a coffee](https://buymeacoffee.com/slokey) ☕

## License

MIT. See [LICENSE](LICENSE).
