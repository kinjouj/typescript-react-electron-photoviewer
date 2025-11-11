import { useMemo } from 'react';
import { SLIDER_BASE_SETTINGS } from '../constants';
import { useSliderAfterChangeListener } from './useSliderAfterChangeListener';
import type { Settings } from 'react-slick';

export const useSliderSettings = (data: string[], speed: number, isPlaying: boolean, prevArrow: React.JSX.Element, nextArrow: React.JSX.Element): Settings => {
  const { afterChangeHandler } = useSliderAfterChangeListener(data, speed);
  const settings = useMemo(() => ({
    ...SLIDER_BASE_SETTINGS,
    autoplay: isPlaying,
    autoplaySpeed: speed,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    afterChange: afterChangeHandler,
  }), [ isPlaying, speed, prevArrow, nextArrow, afterChangeHandler ]);

  return settings;
};
