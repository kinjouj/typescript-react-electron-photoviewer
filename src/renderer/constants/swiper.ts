import { Autoplay, Virtual } from 'swiper/modules';
import type { SwiperProps } from 'swiper/react';

export const SWIPER_DELAY_STEP = 500;
export const SWIPER_BASE_SETTINGS: SwiperProps = {
  allowTouchMove: false,
  loop: true,
  modules: [ Autoplay, Virtual ],
  observer: true,
  observeParents: true,
  preventClicks: false,
  speed: 1000,
  slidesPerView: 1,
  slideToClickedSlide: false,
  virtual: true,
};
