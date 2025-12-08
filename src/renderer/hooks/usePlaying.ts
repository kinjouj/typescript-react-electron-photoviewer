import { useCallback, useState } from 'react';
import type { PlayingChangeHandler } from '../types/app.types';

interface PlayingHookResult {
  isPlaying: boolean
  handlePlayingChange: PlayingChangeHandler
}

export const usePlaying = (filesSize: number): PlayingHookResult => {
  const [isPlaying, setIsPlaying] = useState(filesSize > 1);

  const handlePlayingChange = useCallback(() => {
    setIsPlaying((currentPlaying) => !currentPlaying);
  }, []);

  return { isPlaying, handlePlayingChange };
};
