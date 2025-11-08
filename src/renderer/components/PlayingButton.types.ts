import type { OnTogglePlayingCallback } from '../hooks/usePlayControlListener.types';

export interface PlayingButtonProps {
  isPlaying: boolean
  onTogglePlaying: OnTogglePlayingCallback
}
