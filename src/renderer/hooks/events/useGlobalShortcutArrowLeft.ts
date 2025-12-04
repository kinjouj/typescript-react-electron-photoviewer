import { IPC_CHANNEL_KEY_PRESSED_LEFT } from '../../../ipc/channels';
import { useGlobalShortcut } from './useGlobalShortcut';

export const useGlobalShortcutArrowLeft = (callback: () => void): void => {
  useGlobalShortcut(IPC_CHANNEL_KEY_PRESSED_LEFT, callback);
};
