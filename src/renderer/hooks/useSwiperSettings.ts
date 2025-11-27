import { useMemo } from 'react';
import { Autoplay, Thumbs, Virtual } from 'swiper/modules';
import { useSwiperAfterChangeListener } from './';
import type { Swiper as SwiperType } from 'swiper';
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
    resistanceRatio: 0,
    slidesPerView: 1,
    slideToClickedSlide: false,
    speed: 800,
    onSlideChangeTransitionStart(swiper): void {
      const thumbSwiper = swiper.params.thumbs?.swiper as SwiperType;
      const index = swiper.realIndex;
      afterChangeHandler(index);

      if (thumbSwiper) {
        thumbSwiper.slideTo(swiper.realIndex);
      }
    },
    virtual: true,
    watchSlidesProgress: true,
  }), [ delay, afterChangeHandler ]);

  return settings;
};
