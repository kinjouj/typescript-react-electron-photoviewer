import * as path from 'node:path';
import { BrowserWindow, session } from 'electron';
import IPCHandlers from '../ipc/IPCHandlers';

export default class PhotoViewerApp {
  public static async start(selectedPath: string): Promise<void> {
    IPCHandlers.setup(selectedPath);
    await this.createWindow();
  }

  private static async createWindow(): Promise<void> {
    await session.defaultSession.clearCache();

    const win = new BrowserWindow({
      width: 800,
      height: 600,
      fullscreenable: false,
      resizable: false,
      hasShadow: false,
      webPreferences: {
        preload: path.resolve(__dirname, 'preload.js'),
        contextIsolation: true,
        nodeIntegration: false,
        backgroundThrottling: false,
        enablePreferredSizeMode: true,
        enableWebSQL: false,
        spellcheck: false,
        partition: 'nopersist',
        plugins: false,
        webSecurity: true,
        webgl: false,
      },
    });
    win.setMenuBarVisibility(false);

    win.once('ready-to-show', () => {
      // win.webContents.openDevTools({ mode: 'detach' });
    });

    await win.loadFile(path.resolve(__dirname, 'index.html'));
  }
};
