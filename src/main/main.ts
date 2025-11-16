import * as path from 'node:path';
import { app, dialog, BrowserWindow, ipcMain, globalShortcut, Notification } from 'electron';
import {
  IPC_CHANNEL_ON_DOWN_PRESSED,
  IPC_CHANNEL_ON_LEFT_PRESSED,
  IPC_CHANNEL_ON_RIGHT_PRESSED,
  IPC_CHANNEL_ON_SPACE_PRESSED,
  IPC_CHANNEL_ON_UP_PRESSED,
  IPC_CHANNEL_REQUEST_FILES,
  IPC_CHANNEL_UPDATE_TITLE
} from '../constants';
import Client from './api/client';

let selectedPath: string | null = null;
app.disableHardwareAcceleration();

const setupIPCListener = (): void => {
  ipcMain.handle(IPC_CHANNEL_REQUEST_FILES, async (): Promise<string[]> => {
    if (!selectedPath) {
      return [];
    }

    return await Client.getFiles(selectedPath);
  });
  ipcMain.on(IPC_CHANNEL_UPDATE_TITLE, (event, title: string): void => {
    const window = BrowserWindow.fromWebContents(event.sender);

    if (window && !window.isDestroyed()) {
      window.setTitle(`${selectedPath}:  ${title}`);
    }
  });
};

const createWindow = async (): Promise<BrowserWindow> => {
  // const cursorPoint = screen.getCursorScreenPoint();
  // const currentDisplay = screen.getDisplayNearestPoint(cursorPoint);

  const win = new BrowserWindow({
    autoHideMenuBar: true,
    center: true,
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: true,
    },
  });
  await win.loadFile(path.resolve(__dirname, 'index.html'));
  win.once('ready-to-show', () => {
    // win.webContents.openDevTools({ mode: 'detach' });
  });

  return win;
};

const registerShortcuts = (win: BrowserWindow): void => {
  const registerShortcut = (key: string, callback: () => void): void => {
    const isRegistered = globalShortcut.register(key, callback);

    if (!isRegistered) {
      const n = new Notification({ title: 'ERROR', body: `${key}: register failed` });
      n.show();
    }
  };

  registerShortcut('Up', () => win.webContents.send(IPC_CHANNEL_ON_UP_PRESSED));
  registerShortcut('Space', () => win.webContents.send(IPC_CHANNEL_ON_SPACE_PRESSED));
  registerShortcut('Down', () => win.webContents.send(IPC_CHANNEL_ON_DOWN_PRESSED));
  registerShortcut('Left', () => win.webContents.send(IPC_CHANNEL_ON_LEFT_PRESSED));
  registerShortcut('Right', () => win.webContents.send(IPC_CHANNEL_ON_RIGHT_PRESSED));
  registerShortcut('Escape', () => app.quit());
};

app.whenReady().then(async () => {
  setupIPCListener();

  const result = await dialog.showOpenDialog({
    title: 'photoviewer',
    properties: ['openDirectory'],
    defaultPath: app.getPath('desktop'),
  });

  if (!result.canceled && result.filePaths.length > 0) {
    selectedPath = result.filePaths[0];
    createWindow().then((win) => {
      win.on('focus', () => registerShortcuts(win));
      win.on('blur', () => globalShortcut.unregisterAll());
      registerShortcuts(win);
    }).catch(() => app.quit());
  } else {
    app.quit();
  }
}).catch(() => app.quit());

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
