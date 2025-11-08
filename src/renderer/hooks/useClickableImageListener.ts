import { useCallback, useState } from 'react';
import type Slider from 'react-slick';

interface UseClickableImageListenerResult {
  cursor: React.CSSProperties['cursor']
  onClickImage: (event: React.MouseEvent<HTMLImageElement>) => void
  onMouseMove: (event: React.MouseEvent<HTMLImageElement>) => void
  onRightClickImageOpen: (event: React.MouseEvent<HTMLImageElement>) => void
}

const isMouseOverLeftZone = (event: React.MouseEvent<HTMLImageElement>): boolean => {
  return event.nativeEvent.offsetX < event.currentTarget.width / 2;
};

export const useClickableImageListener = (slideRef: React.RefObject<Slider | null>): UseClickableImageListenerResult => {
  const [ cursor, setCursor ] = useState<React.CSSProperties['cursor']>('default');

  const onClickImage = useCallback((event: React.MouseEvent<HTMLImageElement>) => {
    const slider = slideRef.current;

    if (slider === null || event.button !== 0) {
      return;
    }

    if (isMouseOverLeftZone(event)) {
      slider.slickPrev();
    } else {
      slider.slickNext();
    }
  }, [slideRef]);

  const onMouseMove = useCallback((event: React.MouseEvent<HTMLImageElement>) => {
    const newCursor = isMouseOverLeftZone(event) ? 'w-resize' : 'e-resize';
    setCursor(newCursor);
  }, []);

  const onRightClickImageOpen = useCallback((event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    window.open(event.currentTarget.src, '_blank', 'width=500,height=500');
  }, []);

  return { cursor, onClickImage, onMouseMove, onRightClickImageOpen };
};
