import { useCallback } from 'react';
import { IPC_CHANNEL_KEY_PRESSED_DOWN } from '../../../ipc/channels';
import { SWIPER_DELAY_STEP } from '../../constants/swiper';
import { useGlobalShortcut } from './useGlobalShortcut';
import type { DelayChangeHandler } from '../../types/app.types';

const SWIPER_MAX_DELAY = 5000;

export const useGlobalShortcutArrowDown = (handleChangeDelay: DelayChangeHandler): void => {
  const increaseDelayHandler = useCallback(() => {
    handleChangeDelay((currentDelay) => Math.min(SWIPER_MAX_DELAY, currentDelay + SWIPER_DELAY_STEP));
  }, [handleChangeDelay]);

  useGlobalShortcut(IPC_CHANNEL_KEY_PRESSED_DOWN, increaseDelayHandler);
};
