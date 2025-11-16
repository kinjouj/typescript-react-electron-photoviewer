import { useCallback } from 'react';
import { useSwiper } from 'swiper/react';
import { IPC_CHANNEL_ON_RIGHT_PRESSED } from '../../../constants';
import { useGlobalShortcut } from '.';

export const useGlobalShortcutArrowRight = (): void => {
  const swiper = useSwiper();

  const handleRightPressed = useCallback(() => {
    swiper.slideNext();
  }, [swiper]);

  useGlobalShortcut(IPC_CHANNEL_ON_RIGHT_PRESSED, handleRightPressed);
};
