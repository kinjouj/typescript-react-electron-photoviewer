import { useCallback } from 'react';
import { IPC_CHANNEL_ON_LEFT_PRESSED } from '../../../constants';
import { useGlobalShortcut } from './';
import type Swiper from 'swiper';

export const useGlobalShortcutArrowLeft = (swiper: Swiper): void => {
  const handleLeftPressed = useCallback(() => {
    swiper.slidePrev();
  }, [swiper]);

  useGlobalShortcut(IPC_CHANNEL_ON_LEFT_PRESSED, handleLeftPressed);
};
