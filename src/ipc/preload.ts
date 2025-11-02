import { contextBridge, ipcRenderer } from 'electron';
import { RENDERER_CHANNEL_REQUEST_FILES } from '../constants';

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
  requestFiles: (requestPath: string): Promise<string[]> => {
    return ipcRenderer.invoke(RENDERER_CHANNEL_REQUEST_FILES, requestPath);
  },
});
