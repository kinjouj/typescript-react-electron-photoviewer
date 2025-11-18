import { useMemo } from 'react';
import { Autoplay, Thumbs, Virtual } from 'swiper/modules';
import { useSwiperAfterChangeListener } from './';
import type { SwiperProps } from 'swiper/react';

export const useSwiperSettings = (files: readonly string[], delay: number): SwiperProps => {
  const { afterChangeHandler } = useSwiperAfterChangeListener(files, delay);

  const settings: SwiperProps = useMemo(() => ({
    allowTouchMove: false,
    autoplay: {
      delay: delay,
      pauseOnMouseEnter: false,
    },
    lazyPreloadPrevNext: 1,
    loop: true,
    modules: [ Autoplay, Thumbs, Virtual ],
    observer: true,
    observeParents: true,
    preventClicks: false,
    slidesPerView: 1,
    slideToClickedSlide: false,
    speed: 1000,
    onSlideChangeTransitionStart(swiper): void {
      const index = swiper.realIndex;
      afterChangeHandler(index);
    },
    virtual: true,
  }), [ delay, afterChangeHandler ]);

  return settings;
};
