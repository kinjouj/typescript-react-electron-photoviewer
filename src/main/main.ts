import { app, dialog, BrowserWindow, ipcMain } from 'electron';
import { IPC_CHANNEL_REQUEST_FILES, IPC_CHANNEL_UPDATE_TITLE } from '../constants';
import Client from './api/client';
import * as path from 'node:path';

app.disableHardwareAcceleration();

const setupIPCListener = (): void => {
  ipcMain.handle(IPC_CHANNEL_REQUEST_FILES, async (event, requestPath: string): Promise<string[]> => {
    if (!requestPath) {
      return [];
    }

    return await Client.getFiles(requestPath);
  });
  ipcMain.on(IPC_CHANNEL_UPDATE_TITLE, (event, index: number, dataSize: number, path: string): void => {
    const window = BrowserWindow.fromWebContents(event.sender);

    if (window && !window.isDestroyed()) {
      window.setTitle(`${path}:  (${index}/${dataSize})`);
    }
  });
};

const createWindow = async (selectedPath: string): Promise<void> => {
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
  const htmlFile = path.resolve(__dirname, 'index.html');
  await win.loadURL(`file://${htmlFile}#${selectedPath}`);
  win.once('ready-to-show', () => {
    if (!win.isDestroyed()) {
      // win.webContents.openDevTools({ mode: 'detach' });
    }
  });
};

app.whenReady().then(async () => {
  setupIPCListener();
  const result = await dialog.showOpenDialog({
    title: 'photoviewer',
    properties: ['openDirectory'],
  });

  if (!result.canceled && result.filePaths.length > 0) {
    const selectedPath = result.filePaths[0];
    createWindow(selectedPath).catch(() => app.quit());
  } else {
    app.quit();
  }
}).catch(() => app.quit());
