import type Swiper from 'swiper';

export type SwiperType = Swiper;
export type AfterChangeCallback = (page: number) => void;
export type DelayChangeHandler = (callback: (currentDelay: number) => number) => void;
export type PlayingChangeHandler = () => void;
