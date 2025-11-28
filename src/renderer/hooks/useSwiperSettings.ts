import { useMemo } from 'react';
import { Autoplay, Thumbs, Virtual } from 'swiper/modules';
import { useSwiperAfterChangeListener } from './useSwiperAfterChangeListener';
import type { SwiperProps } from 'swiper/react';
import type { SwiperType } from '../types/app.types';

export const useSwiperSettings = (files: readonly string[], delay: number): SwiperProps => {
  const afterChangeHandler = useSwiperAfterChangeListener(files, delay);

  const settings: SwiperProps = useMemo(() => ({
    allowTouchMove: false,
    autoplay: {
      delay: delay,
      pauseOnMouseEnter: false,
    },
    lazyPreloadPrevNext: 1,
    loop: files.length > 1,
    modules: [ Autoplay, Thumbs, Virtual ],
    observer: true,
    observeParents: true,
    preventClicks: false,
    resistanceRatio: 0,
    slidesPerView: 1,
    slideToClickedSlide: false,
    speed: 800,
    virtual: true,
    watchSlidesProgress: true,
    onSlideChangeTransitionStart(swiper): void {
      const index = swiper.realIndex;
      afterChangeHandler(index);

      const thumbSwiper = swiper.params.thumbs?.swiper as SwiperType;

      if (thumbSwiper) {
        thumbSwiper.slideTo(swiper.realIndex);
      }
    },
  }), [ delay, files.length, afterChangeHandler ]);

  return settings;
};
