import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SWIPER_DEFAULT_DELAY } from '../constants/swiper';
import { useDelay, usePlaying, useSwiperSettings } from '../hooks';
import ClickableImage from './ClickableImage';
import PlaybackControls from './PlaybackControls';
import ThumbSwiper from './ThumbSwiper';
import type { SwiperType } from '../types/app.types';
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/virtual';

const PhotoViewer = ({ files }: { files: readonly string[] }): React.JSX.Element => {
  const [thumbSwiper, setThumbSwiper] = useState<SwiperType | null>(null);
  const { isPlaying, handlePlayingChange } = usePlaying(files.length);
  const { delay, handleDelayChange } = useDelay(SWIPER_DEFAULT_DELAY);
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
        <PlaybackControls
          isPlaying={isPlaying}
          onDelayChange={handleDelayChange}
          onPlayingChange={handlePlayingChange} />
      </Swiper>
      <ThumbSwiper files={files} onSwiper={setThumbSwiper} />
    </div>
  );
};

export default PhotoViewer;
