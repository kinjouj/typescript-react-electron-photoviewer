import { useEffect } from 'react';
import type { GlobalShortcutChannel } from '../../../ipc/channel-type';

export const useGlobalShortcut = (channel: GlobalShortcutChannel, callback: () => void): void => {
  useEffect(() => {
    window.electronAPI.onGlobalShortcut(channel, callback);

    return (): void => {
      window.electronAPI.removeListener(channel, callback);
    };
  }, [channel, callback]);
};
