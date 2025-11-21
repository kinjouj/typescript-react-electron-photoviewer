import { IPC_CHANNEL_ON_LEFT_PRESSED } from '../../constants';
import { useGlobalShortcut } from './';

export const useGlobalShortcutArrowLeft = (callback: () => void): void => {
  useGlobalShortcut(IPC_CHANNEL_ON_LEFT_PRESSED, callback);
};
