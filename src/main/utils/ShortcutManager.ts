import { globalShortcut, Notification } from 'electron';
import {
  IPC_CHANNEL_KEY_PRESSED_DOWN,
  IPC_CHANNEL_KEY_PRESSED_LEFT,
  IPC_CHANNEL_KEY_PRESSED_RIGHT,
  IPC_CHANNEL_KEY_PRESSED_SPACE,
  IPC_CHANNEL_KEY_PRESSED_UP
} from '../../constants/main/ipc';

export default class ShortcutManager {
  private static isRegistered = false;

  public static register(onKey: (eventKey: string) => void): void {
    if (this.isRegistered) {
      return;
    }

    const registerShortcut = (key: string, callback: () => void): void => {
      const success = globalShortcut.register(key, callback);

      if (!success) {
        new Notification({ title: 'ERROR', body: `${key}: register failed` }).show();
      }
    };

    registerShortcut('Up', () => onKey(IPC_CHANNEL_KEY_PRESSED_UP));
    registerShortcut('Down', () => onKey(IPC_CHANNEL_KEY_PRESSED_DOWN));
    registerShortcut('Left', () => onKey(IPC_CHANNEL_KEY_PRESSED_LEFT));
    registerShortcut('Right', () => onKey(IPC_CHANNEL_KEY_PRESSED_RIGHT));
    registerShortcut('Space', () => onKey(IPC_CHANNEL_KEY_PRESSED_SPACE));
    registerShortcut('Escape', () => onKey('quit'));

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
