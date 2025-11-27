import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDelay, usePlaying, useSwiperSettings } from '../hooks';
import { ClickableImage, PhotoViewControl, ThumbSwiper } from '.';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/virtual';

const PhotoViewer = ({ files }: { files: readonly string[] }): React.JSX.Element => {
  const [ thumbSwiper, setThumbSwiper ] = useState<SwiperType | null>(null);
  const { isPlaying, handlePlayingChange } = usePlaying();
  const { delay, handleDelayChange } = useDelay(2000);
  const settings = useSwiperSettings(files, delay);

  return (
    <div id="container">
      <Swiper
        key="photoview-swiper"
        thumbs={{ swiper: thumbSwiper }}
        {...settings}>
        {files.map((file, index) => (
          <SwiperSlide key={file} className="swiper-image-block" virtualIndex={index}>
            <ClickableImage src={file} />
          </SwiperSlide>
        ))}
        <PhotoViewControl
          isPlaying={isPlaying}
          onDelayChange={handleDelayChange}
          onPlayingChange={handlePlayingChange} />
      </Swiper>
      <ThumbSwiper files={files} onSwiper={setThumbSwiper} />
    </div>
  );
};

export default PhotoViewer;
