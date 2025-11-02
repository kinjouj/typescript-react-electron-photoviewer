import { useCallback, useEffect, useState } from 'react';
import type Slider from 'react-slick';

export const useSliderKeyDownController = (sliderRef: React.RefObject<Slider | null>): { isPlaying: boolean } => {
  const [ isPlaying, setIsPlaying ] = useState(true);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const slider = sliderRef.current;

    if (slider === null) {
      return;
    }

    switch (event.key) {
      case 'Enter':
      case 'ArrowDown':
      case 'ArrowRight':
        slider.slickNext();
        event.preventDefault();
        break;

      case 'ArrowUp':
      case 'ArrowLeft':
        slider.slickPrev();
        event.preventDefault();
        break;

      case ' ':
        setIsPlaying((isPlaying) => {
          const nextIsPlaying = !isPlaying;

          if (nextIsPlaying) {
            slider.slickPlay();
          } else {
            slider.slickPause();
          }

          return nextIsPlaying;
        });

        event.preventDefault();
        break;

      default:
        break;
    }
  }, [sliderRef]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return (): void => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { isPlaying };
};
