import * as path from 'node:path';
import { BrowserWindow, session } from 'electron';
import IPCHandlers from '../ipc/ipcHandlers';
import ShortcutManager from './utils/ShortcutManager';

export default class PhotoViewerApp {
  public static async start(selectedPath: string, onQuit: () => void): Promise<void> {
    IPCHandlers.setup(selectedPath);
    await this.createWindow(onQuit);
  }

  public static unregisterShortcut(): void {
    ShortcutManager.unregister();
  }

  private static async createWindow(onQuit: () => void): Promise<void> {
    await session.defaultSession.clearCache();

    const win = new BrowserWindow({
      width: 800,
      height: 650,
      autoHideMenuBar: true,
      fullscreenable: false,
      webPreferences: {
        preload: path.resolve(__dirname, 'preload.js'),
        contextIsolation: true,
        nodeIntegration: false,
        webSecurity: true,
        devTools: false,
      },
    });
    win.setMenu(null);

    win.once('ready-to-show', () => {
      // win.webContents.openDevTools({ mode: 'detach' });
    });

    win.on('focus', () => {
      ShortcutManager.register(win, onQuit);
    });

    win.on('blur', () => {
      this.unregisterShortcut();
    });

    await win.loadFile(path.resolve(__dirname, 'index.html'));
  }
};
