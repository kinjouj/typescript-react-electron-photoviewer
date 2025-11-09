import { useCallback, useState } from 'react';
import { useKey } from 'react-use';
import { KEY_ARROW_DOWN, KEY_ARROW_UP, SLIDER_MAX_SPEED, SLIDER_MIN_SPEED, SLIDER_SPEED_STEP } from '../constants';

interface UseSliderSpeedChangeListenerResult {
  speed: number
}

export const useSliderSpeedChangeListener = (): UseSliderSpeedChangeListenerResult => {
  const [ speed, setSpeed ] = useState(3000);

  const speedDownHandler = useCallback(() => {
    setSpeed((currentSpeed) => Math.min(SLIDER_MAX_SPEED, currentSpeed + SLIDER_SPEED_STEP));
  }, []);

  const speedUpHandler = useCallback(() => {
    setSpeed((currentSpeed) => Math.max(SLIDER_MIN_SPEED, currentSpeed - SLIDER_SPEED_STEP));
  }, []);

  useKey(KEY_ARROW_UP, speedDownHandler);
  useKey(KEY_ARROW_DOWN, speedUpHandler);

  return { speed };
};
