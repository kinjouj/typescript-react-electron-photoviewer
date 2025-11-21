import { useCallback, useState } from 'react';
import type { PlayingChangeHandler } from '../types/app.types';

interface PlayingHookResult {
  isPlaying: boolean
  handlePlayingChange: PlayingChangeHandler
}

export const usePlaying = (): PlayingHookResult => {
  const [ isPlaying, setIsPlaying ] = useState(true);

  const handlePlayingChange = useCallback(() => {
    setIsPlaying((currentPlaying) => !currentPlaying);
  }, [setIsPlaying]);

  return { isPlaying, handlePlayingChange };
};
