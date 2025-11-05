import { useCallback, useState } from 'react';
import type Slider from 'react-slick';
import type { UseClickableImageListenerResult } from './useClickableImageListener.types';

const isMouseOverLeftZone = (e: React.MouseEvent<HTMLImageElement>): boolean => e.nativeEvent.offsetX < e.currentTarget.width / 2;

export const useClickableImageListener = (slideRef: React.RefObject<Slider | null>): UseClickableImageListenerResult => {
  const [ cursor, setCursor ] = useState<React.CSSProperties['cursor']>('default');
  const onClickImage = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    const slider = slideRef.current;

    if (slider === null || e.button !== 0) {
      return;
    }

    if (isMouseOverLeftZone(e)) {
      slider.slickPrev();
    } else {
      slider.slickNext();
    }
  }, [slideRef]);
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    const newCursor = isMouseOverLeftZone(e) ? 'w-resize' : 'e-resize';
    setCursor(newCursor);
  }, []);
  const onRightClickImageOpen = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    window.open(e.currentTarget.src, '_blank', 'width=500,height=500');
  }, []);

  return { cursor, onClickImage, onMouseMove, onRightClickImageOpen };
};
