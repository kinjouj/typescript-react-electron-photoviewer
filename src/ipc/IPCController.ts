import { fileURLToPath } from 'node:url';
import { BrowserWindow, ipcMain, shell } from 'electron';
import MainClient from '../main/api/MainClient';
import PhotoViewerApp from '../main/PhotoViewerApp';
import { IPC_CHANNEL_OPEN_PATH, IPC_CHANNEL_REQUEST_FILES, IPC_CHANNEL_UPDATE_TITLE } from './channels';

export default class IPCController {
  public static setup(): void {
    const selectedPath = PhotoViewerApp.getSelectedPath();

    ipcMain.handle(IPC_CHANNEL_REQUEST_FILES, (): Promise<string[]> => {
      return MainClient.getFiles(selectedPath);
    });

    ipcMain.on(IPC_CHANNEL_OPEN_PATH, (_event, path: string): void => {
      void shell.openPath(fileURLToPath(path));
    });

    ipcMain.on(IPC_CHANNEL_UPDATE_TITLE, (event, title: string): void => {
      const window = BrowserWindow.fromWebContents(event.sender);

      if (window && !window.isDestroyed()) {
        window.setTitle(title);
      }
    });
  }
};
