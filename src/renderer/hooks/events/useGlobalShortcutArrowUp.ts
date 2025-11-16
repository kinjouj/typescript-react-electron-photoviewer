import { useCallback } from 'react';
import { IPC_CHANNEL_ON_UP_PRESSED, SWIPER_DELAY_STEP } from '../../constants';
import { useGlobalShortcut } from './useGlobalShortcut';
import type { DelayChangeHandler } from '../../types/app.types';

const SWIPER_MIN_DELAY = 1000;

export const useGlobalShortcutArrowUp = (handleChangeDelay: DelayChangeHandler): void => {
  const decreaseDelayHandler = useCallback(() => {
    handleChangeDelay((currentDelay) => Math.max(SWIPER_MIN_DELAY, currentDelay - SWIPER_DELAY_STEP));
  }, [handleChangeDelay]);

  useGlobalShortcut(IPC_CHANNEL_ON_UP_PRESSED, decreaseDelayHandler);
};
