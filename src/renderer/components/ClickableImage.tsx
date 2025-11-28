import { useCallback, useEffect, useRef } from 'react';
import { useSwiper } from 'swiper/react';

const isMouseOverLeftZone = (event: React.MouseEvent<HTMLImageElement>): boolean => {
  return event.nativeEvent.offsetX < event.currentTarget.width / 2;
};

const ClickableImage = ({ src }: { src: string }): React.JSX.Element => {
  const swiper = useSwiper();
  const isClickActive = useRef(true);

  useEffect(() => {
    const lock = (): void => { isClickActive.current = false; };
    const unlock = (): void => { isClickActive.current = true; };

    swiper.on('transitionStart', lock);
    swiper.on('transitionEnd', unlock);

    isClickActive.current = true;

    return (): void => {
      swiper.off('transitionStart', lock);
      swiper.off('transitionEnd', unlock);
    };
  }, [swiper]);

  const onClickImage = useCallback((e: React.MouseEvent<HTMLImageElement>): void => {
    if (!isClickActive.current) {
      return;
    }

    if (isMouseOverLeftZone(e)) {
      swiper.slidePrev();
    } else {
      swiper.slideNext();
    }
  }, [swiper]);

  const onRightClickImageOpen = useCallback((event: React.MouseEvent<HTMLImageElement>) => {
    window.open(event.currentTarget.src, '_blank', 'width=500,height=500');
  }, []);

  return (
    <img
      className="swiper-main-image swiper-lazy"
      src={src}
      decoding="async"
      loading="lazy"
      onClick={onClickImage}
      onContextMenu={onRightClickImageOpen} />
  );
};

export default ClickableImage;
