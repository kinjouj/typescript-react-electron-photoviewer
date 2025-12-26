export type { Swiper as SwiperType } from 'swiper';
export type AfterChangeCallback = (page: number) => void;
export type DelayChangeHandler = (callback: (currentDelay: number) => number) => void;
export type PlayingChangeHandler = () => void;

export enum FetchActionType {
  START = 'FETCH_START',
  SUCCESS = 'FETCH_SUCCESS',
  ERROR = 'FETCH_ERROR'
}

export interface FetchState<T> {
  files: T
  loading: boolean
  isError: boolean
}
