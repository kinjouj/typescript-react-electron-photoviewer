import { useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import type { SwiperType } from '../types/app.types';

interface ThumbSwiperProps {
  files: readonly string[]
  onSwiper: (swiper: SwiperType) => void
}

const ThumbSwiper = ({ files, onSwiper }: ThumbSwiperProps): React.JSX.Element => {
  const onStartup = useCallback((swiper: SwiperType): void => {
    onSwiper(swiper);
    requestAnimationFrame(() => swiper.slideTo(0));
  }, [onSwiper]);

  return (
    <Swiper
      className="swiper-thumb-container"
      centeredSlides={true}
      centeredSlidesBounds={true}
      freeMode={true}
      lazyPreloadPrevNext={1}
      modules={[Thumbs]}
      slidesPerView={10}
      spaceBetween={5}
      watchSlidesProgress={true}
      onSwiper={onStartup}>
      {files.map((file) => (
        <SwiperSlide key={file} className="swiper-thumb-slide">
          <img className="swiper-thumb-image" decoding="async" loading="lazy" src={file} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ThumbSwiper;
