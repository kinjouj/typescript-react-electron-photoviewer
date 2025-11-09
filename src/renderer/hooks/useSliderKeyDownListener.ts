import { useCallback } from 'react';
import { useKey } from 'react-use';
import { KEY_SPACE } from '../constants';
import { useSliderNavigationListener, useSliderSpeedChangeListener } from '.';
import type Slider from 'react-slick';
import type { OnTogglePlayingCallback } from './usePlayControlListener.types';

type SliderRef = React.RefObject<Slider | null>;
interface UseSliderKeyDownListenerResult {
  speed: number
}

export const useSliderKeyDownListener = (sliderRef: SliderRef, onTogglePlay: OnTogglePlayingCallback): UseSliderKeyDownListenerResult => {
  const { speed } = useSliderSpeedChangeListener();
  const playChangeHandler = useCallback(() => onTogglePlay(), [onTogglePlay]);
  useKey(KEY_SPACE, playChangeHandler);
  useSliderNavigationListener(sliderRef);

  return { speed };
};
