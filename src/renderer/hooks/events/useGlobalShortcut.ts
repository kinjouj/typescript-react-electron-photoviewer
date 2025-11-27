import { useEffect } from 'react';
import type { GlobalShortcutChannel } from '../../../types/channel';

export const useGlobalShortcut = (channel: GlobalShortcutChannel, callback: () => void): void => {
  useEffect(() => {
    window.electronAPI.onGlobalShortcut(channel, callback);

    return (): void => {
      window.electronAPI.removeListener(channel, callback);
    };
  }, [ channel, callback ]);
};
