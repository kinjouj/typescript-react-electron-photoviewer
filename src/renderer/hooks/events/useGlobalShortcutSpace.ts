import { IPC_CHANNEL_ON_SPACE_PRESSED } from '../../constants';
import { useGlobalShortcut } from './';
import type { PlayingChangeHandler } from '../../types/app.types';

export const useGlobalShortcutSpace = (handleChangePlaying: PlayingChangeHandler): void => {
  useGlobalShortcut(IPC_CHANNEL_ON_SPACE_PRESSED, handleChangePlaying);
};
