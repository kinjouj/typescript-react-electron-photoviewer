import * as path from 'node:path';
import { BrowserWindow, screen, session } from 'electron';
import IPCHandlers from '../ipc/IPCController';

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
        disableBlinkFeatures: 'AnimationControlled',
        nodeIntegration: false,
        backgroundThrottling: false,
        enableWebSQL: false,
        spellcheck: false,
        partition: 'nopersist',
        v8CacheOptions: 'bypassHeatCheck',
        webSecurity: true,
      },
    });
    win.setMenuBarVisibility(false);

    win.webContents.setWindowOpenHandler(() => {
      const { x, y, width, height } = screen.getDisplayMatching(win.getBounds()).workArea;

      return {
        action: 'allow',
        overrideBrowserWindowOptions: {
          x,
          y,
          width,
          height,
        },
      };
    });

    win.once('ready-to-show', () => {
      // win.webContents.openDevTools({ mode: 'detach' });
    });

    await win.loadFile(path.resolve(__dirname, 'index.html'));
  }
};
