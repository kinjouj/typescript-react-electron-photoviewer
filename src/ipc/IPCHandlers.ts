import { BrowserWindow, ipcMain } from 'electron';
import { IPC_CHANNEL_REQUEST_FILES, IPC_CHANNEL_UPDATE_TITLE } from '../constants/main/ipc';
import Client from '../main/api/Client';

export default class IPCHandlers {
  public static setup(selectedPath: string): void {
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
