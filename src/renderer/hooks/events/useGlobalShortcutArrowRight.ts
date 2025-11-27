import { IPC_CHANNEL_KEY_PRESSED_RIGHT } from '../../../constants/main/ipc';
import { useGlobalShortcut } from '.';

export const useGlobalShortcutArrowRight = (callback: () => void): void => {
  useGlobalShortcut(IPC_CHANNEL_KEY_PRESSED_RIGHT, callback);
};
