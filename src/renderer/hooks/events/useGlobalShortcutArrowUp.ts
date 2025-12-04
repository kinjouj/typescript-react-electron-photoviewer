import { useCallback } from 'react';
import { IPC_CHANNEL_KEY_PRESSED_UP } from '../../../ipc/channels';
import { SWIPER_DELAY_STEP, SWIPER_MIN_DELAY } from '../../constants';
import { useGlobalShortcut } from './useGlobalShortcut';
import type { DelayChangeHandler } from '../../types/app.types';

export const useGlobalShortcutArrowUp = (handleChangeDelay: DelayChangeHandler): void => {
  const decreaseDelayHandler = useCallback(() => {
    handleChangeDelay((currentDelay) => Math.max(SWIPER_MIN_DELAY, currentDelay - SWIPER_DELAY_STEP));
  }, [handleChangeDelay]);

  useGlobalShortcut(IPC_CHANNEL_KEY_PRESSED_UP, decreaseDelayHandler);
};
