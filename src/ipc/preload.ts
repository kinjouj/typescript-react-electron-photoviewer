import { contextBridge, ipcRenderer } from 'electron';
import { IPC_CHANNEL_OPEN_PATH, IPC_CHANNEL_REQUEST_FILES, IPC_CHANNEL_UPDATE_TITLE } from './channels';
import type { GlobalShortcutChannel } from './channel-type';

/*
type PayloadData = {
  payload: object
};

let heldData: PayloadData | null = null;
let currentCallback: ((data: PayloadData) => void) | null = null;

ipcRenderer.on(RENDERER_CHANNEL_REQUEST_FILES, (event, data: PayloadData) => {
  heldData = data;
  if (currentCallback) {
    currentCallback(data);
  }
});
*/

contextBridge.exposeInMainWorld('electronAPI', {
  requestFiles: (): Promise<string[]> => {
    return ipcRenderer.invoke(IPC_CHANNEL_REQUEST_FILES);
  },
  openPath: (path: string): void => {
    ipcRenderer.send(IPC_CHANNEL_OPEN_PATH, path);
  },
  updateTitle: (title: string): void => {
    ipcRenderer.send(IPC_CHANNEL_UPDATE_TITLE, title);
  },
  onGlobalShortcut: (channel: GlobalShortcutChannel, callback: () => void) => {
    ipcRenderer.on(channel, callback);
  },
  removeListener: (channel: GlobalShortcutChannel, callback: () => void) => {
    ipcRenderer.removeListener(channel, callback);
  },
});
