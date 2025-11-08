import { useCallback, useState } from 'react';
import { useKey } from 'react-use';
import { KEY_ARROW_DOWN, KEY_ARROW_UP, SLIDER_MAX_SPEED, SLIDER_MIN_SPEED, SLIDER_SPEED_STEP } from '../constants';

interface UseSliderSpeedChangeListenerResult {
  speed: number
}

export const useSliderSpeedChangeListener = (): UseSliderSpeedChangeListenerResult => {
  const [ speed, setSpeed ] = useState(3000);
  const sliderSpeedChangeHandler = useCallback((event: KeyboardEvent) => {
    setSpeed((currentSpeed) => {
      switch (event.key) {
        case KEY_ARROW_UP:
          return Math.max(SLIDER_MIN_SPEED, currentSpeed - SLIDER_SPEED_STEP);

        case KEY_ARROW_DOWN:
          return Math.min(SLIDER_MAX_SPEED, currentSpeed + SLIDER_SPEED_STEP);

        default:
          return currentSpeed;
      }
    });
  }, []);

  useKey(KEY_ARROW_UP, sliderSpeedChangeHandler);
  useKey(KEY_ARROW_DOWN, sliderSpeedChangeHandler);

  return { speed };
};
