import type Slider from 'react-slick';

export type AfterChangeCallback = (page: number) => void;
export type OnTogglePlayingCallback = () => void;
export type NullableSlider = Slider | null;
export type SliderRef = React.RefObject<NullableSlider>;

export interface PlayControlResult {
  isPlaying: boolean
  onTogglePlaying: OnTogglePlayingCallback
  speed: number
}
