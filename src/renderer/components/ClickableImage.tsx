import { type CSSProperties, type MouseEvent, useCallback, useState } from 'react';
import type Slider from 'react-slick';

interface ClickableImageProps {
  src: string
  sliderRef: React.RefObject<Slider | null>
}

const isMouseOverLeftZone = (e: MouseEvent<HTMLImageElement>): boolean => {
  return e.nativeEvent.offsetX < e.currentTarget.width / 2;
};

const ClickableImage = ({ src, sliderRef }: ClickableImageProps): React.JSX.Element => {
  const [ cursor, setCursor ] = useState<CSSProperties['cursor']>('default');

  const handleSlideNavigation = useCallback((e: MouseEvent<HTMLImageElement>): void => {
    const slider = sliderRef.current;

    if (slider === null || e.button !== 0) {
      return;
    }

    if (isMouseOverLeftZone(e)) {
      slider.slickPrev();
    } else {
      slider.slickNext();
    }
  }, [sliderRef]);

  const handleChangeSlideCursor = useCallback((e: MouseEvent<HTMLImageElement>): void => {
    const newCursor: CSSProperties['cursor'] = isMouseOverLeftZone(e) ? 'w-resize' : 'e-resize';

    setCursor((prevCursor) => {
      return prevCursor !== newCursor ? newCursor : prevCursor;
    });
  }, []);

  const handleOpenImageContextMenu = useCallback((e: MouseEvent<HTMLImageElement>): void => {
    e.preventDefault();
    window.open(e.currentTarget.src, '_blank', 'width=500,height=500');
  }, []);

  return (
    <img
      src={src}
      className="slick-image"
      style={{ cursor: cursor }}
      loading="lazy"
      onMouseDown={handleSlideNavigation}
      onMouseMove={handleChangeSlideCursor}
      onContextMenu={handleOpenImageContextMenu}
    />
  );
};

export default ClickableImage;
