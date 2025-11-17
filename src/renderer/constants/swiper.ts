import { Autoplay, Thumbs, Virtual } from 'swiper/modules';
import type { SwiperProps } from 'swiper/react';

export const SWIPER_DELAY_STEP = 500;
export const SWIPER_MIN_DELAY = 1000;
export const SWIPER_MAX_DELAY = 5000;
export const SWIPER_BASE_SETTINGS: SwiperProps = {
  allowTouchMove: false,
  lazyPreloadPrevNext: 1,
  loop: true,
  modules: [ Autoplay, Thumbs, Virtual ],
  observer: true,
  observeParents: true,
  preventClicks: false,
  speed: 1000,
  slidesPerView: 1,
  slideToClickedSlide: false,
  virtual: true,
};
