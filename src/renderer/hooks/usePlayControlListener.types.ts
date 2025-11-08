export type OnTogglePlayingCallback = () => void;
export interface UsePlayControlListenerResult {
  isPlaying: boolean
  onTogglePlaying: OnTogglePlayingCallback
}
