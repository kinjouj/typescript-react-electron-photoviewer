import { useCallback, useState } from 'react';
import { useKey } from 'react-use';
import {
  KEY_ARROW_DOWN,
  KEY_ARROW_LEFT,
  KEY_ARROW_RIGHT,
  KEY_ARROW_UP,
  KEY_ENTER,
  KEY_SPACE,
  SLIDER_DEFAULT_SPEED,
  SLIDER_MAX_SPEED,
  SLIDER_MIN_SPEED,
  SLIDER_SPEED_STEP
} from '../constants';
import type Slider from 'react-slick';
import type { UseSliderKeyDownListenerResult } from './useSliderKeyDownListener.types';

export const useSliderKeyDownListener = (sliderRef: React.RefObject<Slider | null>): UseSliderKeyDownListenerResult => {
  const [ slideSpeed, setSlideSpeed ] = useState<number>(SLIDER_DEFAULT_SPEED);
  const [ isPlaying, setIsPlaying ] = useState(true);
  const speedChangeHandler = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case KEY_ARROW_UP:
        setSlideSpeed((currentSpeed) => Math.max(SLIDER_MIN_SPEED, currentSpeed - SLIDER_SPEED_STEP));
        break;

      case KEY_ARROW_DOWN:
        setSlideSpeed((currentSpeed) => Math.min(SLIDER_MAX_SPEED, currentSpeed + SLIDER_SPEED_STEP));
        break;
    }
  }, []);
  const slideChangeHandler = useCallback((event: KeyboardEvent) => {
    const slider = sliderRef.current;

    if (slider === null) {
      return;
    }

    switch (event.key) {
      case KEY_ARROW_LEFT:
        slider.slickPrev();
        event.preventDefault();
        break;

      case KEY_ENTER:
      case KEY_ARROW_RIGHT:
        slider.slickNext();
        event.preventDefault();
        break;
    }
  }, [sliderRef]);
  const playChangeHandler = useCallback((event: KeyboardEvent) => {
    const slider = sliderRef.current;

    if (slider === null) {
      return;
    }

    event.preventDefault();
    setIsPlaying((isPlaying) => {
      const nextIsPlaying = !isPlaying;

      if (nextIsPlaying) {
        slider.slickPlay();
      } else {
        slider.slickPause();
      }

      return nextIsPlaying;
    });
  }, [sliderRef]);

  useKey(KEY_ARROW_UP, speedChangeHandler);
  useKey(KEY_ARROW_DOWN, speedChangeHandler);
  useKey(KEY_ENTER, slideChangeHandler);
  useKey(KEY_ARROW_LEFT, slideChangeHandler);
  useKey(KEY_ARROW_RIGHT, slideChangeHandler);
  useKey(KEY_SPACE, playChangeHandler);

  return { isPlaying, slideSpeed };
};
