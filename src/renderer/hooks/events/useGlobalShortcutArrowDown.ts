import { useCallback } from 'react';
import { IPC_CHANNEL_ON_DOWN_PRESSED, SWIPER_DELAY_STEP } from '../../constants';
import { useGlobalShortcut } from './';
import type { DelayChangeHandler } from '../../types/app.types';

const SWIPER_MAX_DELAY = 5000;

export const useGlobalShortcutArrowDown = (handleChangeDelay: DelayChangeHandler): void => {
  const increaseDelayHandler = useCallback(() => {
    handleChangeDelay((currentDelay) => Math.min(SWIPER_MAX_DELAY, currentDelay + SWIPER_DELAY_STEP));
  }, [handleChangeDelay]);

  useGlobalShortcut(IPC_CHANNEL_ON_DOWN_PRESSED, increaseDelayHandler);
};
