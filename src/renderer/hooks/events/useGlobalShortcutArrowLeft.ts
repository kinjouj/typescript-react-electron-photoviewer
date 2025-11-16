import { useCallback } from 'react';
import { useSwiper } from 'swiper/react';
import { IPC_CHANNEL_ON_LEFT_PRESSED } from '../../../constants';
import { useGlobalShortcut } from './';

export const useGlobalShortcutArrowLeft = (): void => {
  const swiper = useSwiper();

  const handleLeftPressed = useCallback(() => {
    swiper.slidePrev();
  }, [swiper]);

  useGlobalShortcut(IPC_CHANNEL_ON_LEFT_PRESSED, handleLeftPressed);
};
