import { useMemo } from 'react';
import { SWIPER_BASE_SETTINGS } from '../constants';
import { useSwiperAfterChangeListener } from './';
import type { SwiperProps } from 'swiper/react';

export const useSwiperSettings = (files: readonly string[], delay: number): SwiperProps => {
  const { afterChangeHandler } = useSwiperAfterChangeListener(files, delay);

  const settings: SwiperProps = useMemo(() => ({
    ...SWIPER_BASE_SETTINGS,
    autoplay: {
      delay: delay,
    },
    onSlideChangeTransitionStart(swiper): void {
      const index = swiper.realIndex;
      afterChangeHandler(index);
    },
  }), [ delay, afterChangeHandler ]);

  return settings;
};
