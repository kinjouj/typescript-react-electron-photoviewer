import { useMemo } from 'react';
import { NextArrow, PrevArrow } from '../components';

interface UseSliderArrowsResult {
  prevArrowComponent: React.JSX.Element
  nextArrowComponent: React.JSX.Element
}

export const useSliderArrows = (): UseSliderArrowsResult => {
  const prevArrowComponent = useMemo(() => <PrevArrow />, []);
  const nextArrowComponent = useMemo(() => <NextArrow />, []);

  return { prevArrowComponent, nextArrowComponent };
};
