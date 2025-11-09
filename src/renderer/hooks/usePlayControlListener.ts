import { useCallback, useEffect, useState } from 'react';
import type Slider from 'react-slick';
import type { UsePlayControlListenerResult } from './usePlayControlListener.types';

export const usePlayControlListener = (sliderRef: React.RefObject<Slider | null>): UsePlayControlListenerResult => {
  const [ isPlaying, setIsPlaying ] = useState(true);
  const onTogglePlaying = useCallback(() => setIsPlaying((prevPlaying) => !prevPlaying), []);

  useEffect(() => {
    const slider = sliderRef.current;

    if (slider === null) {
      return;
    }

    if (isPlaying) {
      slider.slickPlay();
    } else {
      slider.slickPause();
    }
  }, [ isPlaying, sliderRef ]);

  return { isPlaying, onTogglePlaying };
};
