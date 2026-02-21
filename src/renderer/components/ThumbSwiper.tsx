import { useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import type { SwiperType } from '../types/app.types';
import 'swiper/css';
import 'swiper/css/thumbs';

interface ThumbSwiperProps {
  files: readonly string[]
  onSwiper: (swiper: SwiperType) => void
}

const ThumbSwiper = ({ files, onSwiper }: ThumbSwiperProps): React.JSX.Element => {
  const handleSwiperInit = useCallback((swiper: SwiperType): void => {
    onSwiper(swiper);
    requestAnimationFrame(() => swiper.slideTo(0));
  }, [onSwiper]);

  return (
    <Swiper
      centeredSlides={true}
      centeredSlidesBounds={true}
      freeMode={true}
      lazyPreloadPrevNext={1}
      modules={[Thumbs]}
      slidesPerView={8}
      spaceBetween={1}
      watchSlidesProgress={true}
      className="swiper-thumb-container"
      onSwiper={handleSwiperInit}>
      {files.map((file) => (
        <SwiperSlide key={file} className="swiper-thumb-slide">
          <img src={file} decoding="async" loading="lazy" className="swiper-thumb-image" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ThumbSwiper;
