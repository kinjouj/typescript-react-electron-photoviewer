import { useCallback, useState } from 'react';
import { useSwiper } from 'swiper/react';

interface ClickableImageResult {
  cursor: React.CSSProperties['cursor']
  onClickImage: (event: React.MouseEvent<HTMLImageElement>) => void
  onMouseMove: (event: React.MouseEvent<HTMLImageElement>) => void
  onRightClickImageOpen: (event: React.MouseEvent<HTMLImageElement>) => void
}

const isMouseOverLeftZone = (event: React.MouseEvent<HTMLImageElement>): boolean => {
  return event.nativeEvent.offsetX < event.currentTarget.width / 2;
};

export const useClickableImageListener = (): ClickableImageResult => {
  const swiper = useSwiper();
  const [ cursor, setCursor ] = useState<React.CSSProperties['cursor']>('default');

  const onClickImage = useCallback((event: React.MouseEvent<HTMLImageElement>) => {
    if (event.button !== 0) {
      return;
    }

    if (isMouseOverLeftZone(event)) {
      swiper.slidePrev();
    } else {
      swiper.slideNext();
    }
  }, [swiper]);

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
