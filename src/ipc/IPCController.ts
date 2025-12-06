import { BrowserWindow, ipcMain } from 'electron';
import Client from '../main/api/Client';
import PhotoViewerApp from '../main/PhotoViewerApp';
import { IPC_CHANNEL_REQUEST_FILES, IPC_CHANNEL_UPDATE_TITLE } from './channels';

export default class IPCController {
  public static setup(): void {
    const selectedPath = PhotoViewerApp.getSelectedPath();

    ipcMain.handle(IPC_CHANNEL_REQUEST_FILES, (): Promise<string[]> => {
      return Client.getFiles(selectedPath);
    });

    ipcMain.on(IPC_CHANNEL_UPDATE_TITLE, (event, title: string): void => {
      const window = BrowserWindow.fromWebContents(event.sender);

      if (window && !window.isDestroyed()) {
        window.setTitle(title);
      }
    });
  }
};
