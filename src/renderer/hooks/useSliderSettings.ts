import { useMemo } from 'react';
import { SLIDER_BASE_SETTINGS } from '../constants';
import { useSliderArrows } from './useSliderArrows';
import type { Settings } from 'react-slick';
import type { AfterChangeCallback } from './useSliderAfterChangeListener.types';

export const useSliderSettings = (isPlaying: boolean, speed: number, afterChangeHandler: AfterChangeCallback): Settings => {
  const { prevArrowComponent, nextArrowComponent } = useSliderArrows();
  const settings = useMemo(() => ({
    ...SLIDER_BASE_SETTINGS,
    autoplay: isPlaying,
    autoplaySpeed: speed,
    afterChange: afterChangeHandler,
    prevArrow: prevArrowComponent,
    nextArrow: nextArrowComponent,
  }), [ isPlaying, speed, afterChangeHandler, prevArrowComponent, nextArrowComponent ]);

  return settings;
};
