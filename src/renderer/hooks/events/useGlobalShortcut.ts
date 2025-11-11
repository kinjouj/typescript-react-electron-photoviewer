import { useEffect } from 'react';

export const useGlobalShortcut = (channel: string, callback: () => void): void => {
  useEffect(() => {
    window.electronAPI.onGlobalShortcut(channel, callback);

    return (): void => {
      window.electronAPI.removeListener(channel, callback);
    };
  }, [ channel, callback ]);
};
