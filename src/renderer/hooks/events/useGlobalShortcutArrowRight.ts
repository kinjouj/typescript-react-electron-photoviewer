import { IPC_CHANNEL_KEY_PRESSED_RIGHT } from '../../../ipc/channels';
import { useGlobalShortcut } from './useGlobalShortcut';

export const useGlobalShortcutArrowRight = (callback: () => void): void => {
  useGlobalShortcut(IPC_CHANNEL_KEY_PRESSED_RIGHT, callback);
};
