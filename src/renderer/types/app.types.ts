export type { Swiper as SwiperType } from 'swiper';
export type AfterChangeCallback = (page: number) => void;
export type DelayChangeHandler = (callback: (currentDelay: number) => number) => void;
export type PlayingChangeHandler = () => void;
