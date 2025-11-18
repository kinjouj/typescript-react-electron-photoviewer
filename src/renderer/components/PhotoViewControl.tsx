import { useSwiper } from 'swiper/react';
import { useEffect } from 'react';
import {
  useGlobalShortcutArrowDown,
  useGlobalShortcutArrowLeft,
  useGlobalShortcutArrowRight,
  useGlobalShortcutArrowUp,
  useGlobalShortcutSpace
} from '../hooks/events';
import type { DelayChangeHandler, PlayingChangeHandler } from '../types/app.types';

interface PhotoViewControlProps {
  isPlaying: boolean
  handleChangePlaying: PlayingChangeHandler
  handleChangeDelay: DelayChangeHandler
}

const PhotoViewControl = ({ isPlaying, handleChangePlaying, handleChangeDelay }: PhotoViewControlProps): React.JSX.Element => {
  const swiper = useSwiper();

  useEffect(() => {
    if (isPlaying) {
      swiper.autoplay.start();
    } else {
      swiper.autoplay.stop();
    }
  }, [ isPlaying, swiper ]);

  useGlobalShortcutSpace(handleChangePlaying);
  useGlobalShortcutArrowUp(handleChangeDelay);
  useGlobalShortcutArrowDown(handleChangeDelay);
  useGlobalShortcutArrowLeft(swiper);
  useGlobalShortcutArrowRight(swiper);

  return (
    <div className="swiper-header">
      <div className="swiper-header-right-pane">
        <button type="button" onClick={handleChangePlaying}>
          <i className={isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'} style={{ fontSize: '1.58em' }}></i>
        </button>
      </div>
    </div>
  );
};

export default PhotoViewControl;
