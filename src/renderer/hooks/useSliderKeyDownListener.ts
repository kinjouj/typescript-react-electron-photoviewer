import { useCallback, useEffect, useState } from 'react';
import { SLIDER_DEFAULT_SPEED, SLIDER_MAX_SPEED, SLIDER_MIN_SPEED, SLIDER_SPEED_STEP } from '../../constants';
import type Slider from 'react-slick';
import type { UseSliderKeyDownListenerResult } from './useSliderKeyDownListener.types';

export const useSliderKeyDownListener = (sliderRef: React.RefObject<Slider | null>): UseSliderKeyDownListenerResult => {
  const [ slideSpeed, setSlideSpeed ] = useState(SLIDER_DEFAULT_SPEED);
  const [ isPlaying, setIsPlaying ] = useState(true);
  const keyDownHandler = useCallback((event: KeyboardEvent) => {
    const slider = sliderRef.current;

    if (slider === null) {
      return;
    }

    switch (event.key) {
      case 'ArrowUp':
        setSlideSpeed((currentSpeed) => Math.max(SLIDER_MIN_SPEED, currentSpeed - SLIDER_SPEED_STEP));
        break;

      case 'ArrowDown':
        setSlideSpeed((currentSpeed) => Math.min(SLIDER_MAX_SPEED, currentSpeed + SLIDER_SPEED_STEP));
        break;

      case 'Enter':
      case 'ArrowRight':
        slider.slickNext();
        event.preventDefault();
        break;

      case 'ArrowLeft':
        slider.slickPrev();
        event.preventDefault();
        break;

      case ' ':
        setIsPlaying((isPlaying) => {
          const nextIsPlaying = !isPlaying;

          if (nextIsPlaying) {
            slider.slickPlay();
          } else {
            slider.slickPause();
          }

          return nextIsPlaying;
        });
        event.preventDefault();
        break;

      default:
        break;
    }
  }, [sliderRef]);

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);
    return (): void => window.removeEventListener('keydown', keyDownHandler);
  }, [keyDownHandler]);

  return { isPlaying, slideSpeed };
};
