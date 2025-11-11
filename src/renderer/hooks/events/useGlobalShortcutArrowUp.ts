import { useCallback, type Dispatch, type SetStateAction } from 'react';
import { SLIDER_SPEED_STEP } from '../../constants';
import { IPC_CHANNEL_ON_UP_PRESSED } from '../../../constants';
import { useGlobalShortcut } from './useGlobalShortcut';

const SLIDER_MIN_SPEED = 1000;

export const useGlobalShortcutArrowUp = (setSpeed: Dispatch<SetStateAction<number>>): void => {
  const speedUpHandler = useCallback(() => {
    setSpeed((currentSpeed) => Math.max(SLIDER_MIN_SPEED, currentSpeed - SLIDER_SPEED_STEP));
  }, [setSpeed]);
  useGlobalShortcut(IPC_CHANNEL_ON_UP_PRESSED, speedUpHandler);
};
