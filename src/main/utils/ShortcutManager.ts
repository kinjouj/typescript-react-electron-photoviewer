import { globalShortcut, Notification, type BrowserWindow } from 'electron';
import {
  IPC_CHANNEL_KEY_PRESSED_DOWN,
  IPC_CHANNEL_KEY_PRESSED_LEFT,
  IPC_CHANNEL_KEY_PRESSED_RIGHT,
  IPC_CHANNEL_KEY_PRESSED_SPACE,
  IPC_CHANNEL_KEY_PRESSED_UP
} from '../../constants/main/ipc';

export default class ShortcutManager {
  private static isRegistered = false;

  public static register(win: BrowserWindow, onQuit: () => void): void {
    if (this.isRegistered) {
      return;
    }

    const registerShortcut = (key: string, callback: () => void): void => {
      const isShortcutRegistered = globalShortcut.register(key, callback);

      if (!isShortcutRegistered) {
        new Notification({ title: 'ERROR', body: `${key}: register failed` }).show();
      }
    };

    registerShortcut('Up', () => win.webContents.send(IPC_CHANNEL_KEY_PRESSED_UP));
    registerShortcut('Down', () => win.webContents.send(IPC_CHANNEL_KEY_PRESSED_DOWN));
    registerShortcut('Left', () => win.webContents.send(IPC_CHANNEL_KEY_PRESSED_LEFT));
    registerShortcut('Right', () => win.webContents.send(IPC_CHANNEL_KEY_PRESSED_RIGHT));
    registerShortcut('Space', () => win.webContents.send(IPC_CHANNEL_KEY_PRESSED_SPACE));
    registerShortcut('Escape', onQuit);

    this.isRegistered = true;
  }

  public static unregister(): void {
    if (!this.isRegistered) {
      return;
    }

    globalShortcut.unregisterAll();
    this.isRegistered = false;
  }
};
