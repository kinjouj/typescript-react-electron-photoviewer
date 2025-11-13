import { useCallback, type Dispatch, type SetStateAction } from 'react';
import { IPC_CHANNEL_ON_DOWN_PRESSED, SLIDER_SPEED_STEP } from '../../constants';
import { useGlobalShortcut } from './';

const SLIDER_MAX_SPEED = 5000;

export const useGlobalShortcutArrowDown = (setSpeed: Dispatch<SetStateAction<number>>): void => {
  const speedDownHandler = useCallback(() => {
    setSpeed((currentSpeed) => Math.min(SLIDER_MAX_SPEED, currentSpeed + SLIDER_SPEED_STEP));
  }, [setSpeed]);
  useGlobalShortcut(IPC_CHANNEL_ON_DOWN_PRESSED, speedDownHandler);
};
