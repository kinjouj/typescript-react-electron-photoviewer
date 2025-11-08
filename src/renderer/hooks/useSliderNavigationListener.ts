import { useCallback } from 'react';
import { useKey } from 'react-use';
import { KEY_ARROW_LEFT, KEY_ARROW_RIGHT, KEY_ENTER } from '../constants';
import type Slider from 'react-slick';

export const useSliderNavigationListener = (sliderRef: React.RefObject<Slider | null>): void => {
  const sliderNavigationHandler = useCallback((event: KeyboardEvent) => {
    const slider = sliderRef.current;

    if (slider === null) {
      return;
    }

    switch (event.key) {
      case KEY_ARROW_LEFT:
        slider.slickPrev();
        event.preventDefault();
        break;

      case KEY_ENTER:
      case KEY_ARROW_RIGHT:
        slider.slickNext();
        event.preventDefault();
        break;
    }
  }, [sliderRef]);

  useKey(KEY_ENTER, sliderNavigationHandler);
  useKey(KEY_ARROW_LEFT, sliderNavigationHandler);
  useKey(KEY_ARROW_RIGHT, sliderNavigationHandler);
};
