import { app, dialog, BrowserWindow, ipcMain } from 'electron';
import { RENDERER_CHANNEL_REQUEST_FILES } from '../constants';
import Client from './api/client';
import * as path from 'node:path';

app.disableHardwareAcceleration();

const setupIPCListener = (): void => {
  // Renderer(React側)からデータ要求を受け付けてデータを返す
  ipcMain.handle(RENDERER_CHANNEL_REQUEST_FILES, async (event, requestPath: string): Promise<string[]> => {
    if (!requestPath) {
      return [];
    }

    const files = await Client.getFiles(requestPath);
    const window = BrowserWindow.fromWebContents(event.sender);

    if (window && !window.isDestroyed()) {
      window.setTitle(`${requestPath}: ${files.length}`);
    }

    return files;
  });
};

const createWindow = async (selectedPath: string): Promise<void> => {
  // const cursorPoint = screen.getCursorScreenPoint();
  // const currentDisplay = screen.getDisplayNearestPoint(cursorPoint);

  const win = new BrowserWindow({
    darkTheme: true,
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
