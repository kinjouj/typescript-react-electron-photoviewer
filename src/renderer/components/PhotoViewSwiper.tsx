import { useCallback, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiperSettings } from '../hooks';
import { ClickableImage, PhotoViewControl, ThumbSwiper } from '.';
import type { SwiperType } from '../types/app.types';
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/virtual';

const PhotoViewSwiper = ({ files }: { files: readonly string[] }): React.JSX.Element => {
  const [ thumbSwiper, setThumbSwiper ] = useState<SwiperType | null>(null);
  const [ delay, setDelay ] = useState(2000);
  const [ isPlaying, setPlaying ] = useState(true);
  const settings = useSwiperSettings(files, delay);

  const handleChangePlaying = useCallback(() => {
    setPlaying((currentPlaying) => !currentPlaying);
  }, [setPlaying]);

  const handleChangeDelay = useCallback((callback: (currentDelay: number) => number) => {
    setDelay((currentDelay) => callback(currentDelay));
  }, [setDelay]);

  const slideImages = useMemo(() => {
    return files.map((file, index) => (
      <SwiperSlide key={file} className="swiper-image-block" virtualIndex={index}>
        <ClickableImage src={file} />
      </SwiperSlide>
    ));
  }, [files]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Swiper key="photoview-swiper" thumbs={{ swiper: thumbSwiper, autoScrollOffset: 1 }} {...settings}>
        {slideImages}
        <PhotoViewControl
          isPlaying={isPlaying}
          handleChangeDelay={handleChangeDelay}
          handleChangePlaying={handleChangePlaying} />
      </Swiper>
      <ThumbSwiper files={files} onSwiper={setThumbSwiper} />
    </div>
  );
};

export default PhotoViewSwiper;
