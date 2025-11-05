import type { Settings } from 'react-slick';

export const RENDERER_CHANNEL_REQUEST_FILES = 'file:request-files';
export const RENDERER_CHANNEL_UPDATE_TITLE = 'window:update-title';
export const SLIDER_BASE_SETTINGS: Partial<Settings> = {
  lazyLoad: 'ondemand',
  swipe: false,
  draggable: false,
  touchMove: false,
  dots: false,
  infinite: true,
  slidesToShow: 1,
  arrows: true,
  pauseOnFocus: false,
  pauseOnHover: false,
};
export const SLIDER_DEFAULT_SPEED = 3000;
export const SLIDER_MIN_SPEED = 1500;
export const SLIDER_MAX_SPEED = 5000;
export const SLIDER_SPEED_STEP = 500;
