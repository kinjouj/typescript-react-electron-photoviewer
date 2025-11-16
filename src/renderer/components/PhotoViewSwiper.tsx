import { useCallback, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiperSettings } from '../hooks';
import { ClickableImage, PhotoViewControl } from '.';
import 'swiper/css';

const PhotoViewSwiper = ({ files }: { files: readonly string[] }): React.JSX.Element => {
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
      <Swiper {...settings}>
        {slideImages}
        <PhotoViewControl
          isPlaying={isPlaying}
          handleChangeDelay={handleChangeDelay}
          handleChangePlaying={handleChangePlaying}
        />
      </Swiper>
    </div>
  );
};

export default PhotoViewSwiper;
