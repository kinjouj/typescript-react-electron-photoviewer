import { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

interface ThumbSwiperProps {
  files: readonly string[]
  onSwiper: (swiper: SwiperType) => void
}

const ThumbSwiper = ({ files, onSwiper }: ThumbSwiperProps): React.JSX.Element => {
  const thumbImages = useMemo(() => {
    return files.map((file) => (
      <SwiperSlide key={file} className="swiper-thumb-slide">
        <img src={file} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
      </SwiperSlide>
    ));
  }, [files]);

  return (
    <Swiper
      centeredSlidesBounds={true}
      freeMode={true}
      lazyPreloadPrevNext={1}
      loop={true}
      modules={[Thumbs]}
      slidesPerView={8}
      spaceBetween={5}
      watchSlidesProgress={true}
      onSwiper={onSwiper}
      style={{ width: '100%', height: '60px', position: 'absolute', bottom: '5px' }}>
      {thumbImages}
    </Swiper>
  );
};

export default ThumbSwiper;
