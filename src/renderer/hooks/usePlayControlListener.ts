import { useEffect } from 'react';
import { useSliderKeyDownListener } from '.';
import type { PlayControlResult, SliderRef } from '../types/app.types';

export const usePlayControlListener = (sliderRef: SliderRef): PlayControlResult => {
  const { isPlaying, onTogglePlaying, speed } = useSliderKeyDownListener(sliderRef);

  useEffect(() => {
    const slider = sliderRef.current;

    if (slider) {
      if (isPlaying) {
        slider.slickPlay();
      } else {
        slider.slickPause();
      }
    }
  }, [ isPlaying, sliderRef ]);

  return { isPlaying, onTogglePlaying, speed };
};
