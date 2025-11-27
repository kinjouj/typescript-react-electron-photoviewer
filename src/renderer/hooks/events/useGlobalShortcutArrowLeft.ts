import { IPC_CHANNEL_KEY_PRESSED_LEFT } from '../../../constants/main/ipc';
import { useGlobalShortcut } from './';

export const useGlobalShortcutArrowLeft = (callback: () => void): void => {
  useGlobalShortcut(IPC_CHANNEL_KEY_PRESSED_LEFT, callback);
};
