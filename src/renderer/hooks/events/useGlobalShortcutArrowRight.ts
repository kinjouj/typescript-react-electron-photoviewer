import { IPC_CHANNEL_ON_RIGHT_PRESSED } from '../../constants';
import { useGlobalShortcut } from '.';

export const useGlobalShortcutArrowRight = (callback: () => void): void => {
  useGlobalShortcut(IPC_CHANNEL_ON_RIGHT_PRESSED, callback);
};
