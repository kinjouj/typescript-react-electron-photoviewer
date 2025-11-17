import { useEffect } from 'react';
import { useSwiper } from 'swiper/react';
import {
  useGlobalShortcutArrowDown,
  useGlobalShortcutArrowLeft,
  useGlobalShortcutArrowRight,
  useGlobalShortcutArrowUp,
  useGlobalShortcutSpace
} from './events';
import type { DelayChangeHandler, PlayingChangeHandler } from '../types/app.types';

export const usePlayControlListener = (
  isPlaying: boolean,
  handleChangePlaying: PlayingChangeHandler,
  handleChangeDelay: DelayChangeHandler
): void => {
  const swiper = useSwiper();

  useEffect(() => {
    if (isPlaying) {
      swiper.autoplay.start();
    } else {
      swiper.autoplay.stop();
    }
  }, [ isPlaying, swiper ]);

  useGlobalShortcutSpace(handleChangePlaying);
  useGlobalShortcutArrowUp(handleChangeDelay);
  useGlobalShortcutArrowDown(handleChangeDelay);
  useGlobalShortcutArrowLeft(swiper);
  useGlobalShortcutArrowRight(swiper);
};
