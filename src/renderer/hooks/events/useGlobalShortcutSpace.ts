import { IPC_CHANNEL_ON_SPACE_PRESSED } from '../../../constants';
import { useGlobalShortcut } from './useGlobalShortcut';
import type { OnTogglePlayingCallback } from '../../types/app.types';

export const useGlobalShortcutSpace = (onTogglePlaying: OnTogglePlayingCallback): void => {
  useGlobalShortcut(IPC_CHANNEL_ON_SPACE_PRESSED, onTogglePlaying);
};
