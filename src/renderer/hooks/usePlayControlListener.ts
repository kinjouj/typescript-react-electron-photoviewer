import { useCallback, useState } from 'react';
import type Slider from 'react-slick';
import type { UsePlayControlListenerResult } from './usePlayControlListener.types';

export const usePlayControlListener = (sliderRef: React.RefObject<Slider | null>): UsePlayControlListenerResult => {
  const [ isPlaying, setIsPlaying ] = useState(true);
  const onTogglePlaying = useCallback(() => {
    setIsPlaying((prevPlaying) => {
      const nextPlaying = !prevPlaying;
      const slider = sliderRef.current;

      if (slider !== null) {
        if (nextPlaying) {
          slider.slickPlay();
        } else {
          slider.slickPause();
        }
      }

      return nextPlaying;
    });
  }, [sliderRef]);

  return { isPlaying, onTogglePlaying };
};
