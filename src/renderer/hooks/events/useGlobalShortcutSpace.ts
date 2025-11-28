import { IPC_CHANNEL_KEY_PRESSED_SPACE } from '../../../constants/main/ipc';
import { useGlobalShortcut } from './useGlobalShortcut';
import type { PlayingChangeHandler } from '../../types/app.types';

export const useGlobalShortcutSpace = (handleChangePlaying: PlayingChangeHandler): void => {
  useGlobalShortcut(IPC_CHANNEL_KEY_PRESSED_SPACE, handleChangePlaying);
};
