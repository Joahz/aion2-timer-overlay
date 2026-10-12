const { app, BrowserWindow, globalShortcut, ipcMain, Notification, screen } = require('electron');
const fs = require('fs');
const path = require('path');

const boundsFile = () => path.join(app.getPath('userData'), 'window.json');
const readBounds = () => { try { return JSON.parse(fs.readFileSync(boundsFile(), 'utf8')); } catch { return null; } };
const writeBounds = (b) => { try { fs.writeFileSync(boundsFile(), JSON.stringify(b)); } catch {} };

let win;
let locked = false;

function onScreen(b) {
  return screen.getAllDisplays().some(({ workArea: a }) =>
    b.x < a.x + a.width && b.x + b.width > a.x && b.y < a.y + a.height && b.y + 40 > a.y);
}

function create() {
  const saved = readBounds();
  const { workArea } = screen.getPrimaryDisplay();
  const bounds = saved && onScreen(saved)
    ? saved
    : { x: workArea.x + workArea.width - 340, y: workArea.y + 80, width: 300, height: 400 };

  win = new BrowserWindow({
    ...bounds,
    minWidth: 220,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: false,
    resizable: true,
    maximizable: false,
    fullscreenable: false,
    hasShadow: false,
    backgroundColor: '#00000000',
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true },
  });
  // 'screen-saver' keeps it above borderless-fullscreen games.
  win.setAlwaysOnTop(true, 'screen-saver');
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  win.loadFile('index.html');

  const persist = () => { if (!win.isDestroyed()) writeBounds(win.getBounds()); };
  win.on('moved', persist);
  win.on('resized', persist);
  win.on('close', persist);
}

function setLocked(value) {
  locked = value;
  // Click-through: mouse goes to the game underneath.
  win.setIgnoreMouseEvents(locked, { forward: true });
  win.webContents.send('lock', locked);
}

app.whenReady().then(() => {
  create();
  globalShortcut.register('CommandOrControl+Shift+L', () => setLocked(!locked));
  globalShortcut.register('CommandOrControl+Shift+H', () => (win.isVisible() ? win.hide() : win.showInactive()));
});

ipcMain.on('resize', (_e, height, width) => {
  const w = Math.max(220, Math.min(800, Math.round(width) || win.getContentSize()[0]));
  win.setContentSize(w, Math.max(32, Math.min(900, Math.round(height))));
});
ipcMain.on('close', () => app.quit());
ipcMain.on('notify', (_e, title, body) => {
  if (Notification.isSupported()) new Notification({ title, body, silent: true }).show();
});

app.on('will-quit', () => globalShortcut.unregisterAll());
app.on('window-all-closed', () => app.quit());
