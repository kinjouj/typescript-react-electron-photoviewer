import * as path from 'node:path';
import { BrowserWindow, screen, session } from 'electron';
import IPCHandlers from '../ipc/IPCController';

export default class PhotoViewerApp {
  private static selectedPath: string;

  public static start(selectedPath: string): void {
    this.selectedPath = selectedPath;
    IPCHandlers.setup();

    this.createWindow();
  }

  private static createWindow(): void {
    void session.defaultSession.clearCache();

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
        enableWebSQL: false,
        spellcheck: false,
        partition: 'nopersist',
        v8CacheOptions: 'bypassHeatCheck',
        webSecurity: true,
      },
    });
    win.setMenuBarVisibility(false);

    win.once('ready-to-show', () => {
      // win.webContents.openDevTools({ mode: 'detach' });
      win.webContents.setWindowOpenHandler(() => {
        const display = screen.getDisplayMatching(win.getBounds());
        const { x, y, width, height } = display.workArea;

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
    });

    void win.loadFile(path.resolve(__dirname, 'index.html'));
  }

  public static getSelectedPath(): string {
    return this.selectedPath;
  }
};
