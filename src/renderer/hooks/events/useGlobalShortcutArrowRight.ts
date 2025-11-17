import { useCallback } from 'react';
import { IPC_CHANNEL_ON_RIGHT_PRESSED } from '../../../constants';
import { useGlobalShortcut } from '.';
import type Swiper from 'swiper';

export const useGlobalShortcutArrowRight = (swiper: Swiper): void => {
  const handleRightPressed = useCallback(() => {
    swiper.slideNext();
  }, [swiper]);

  useGlobalShortcut(IPC_CHANNEL_ON_RIGHT_PRESSED, handleRightPressed);
};
