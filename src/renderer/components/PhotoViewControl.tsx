import { useSwiper } from 'swiper/react';
import { useCallback, useEffect } from 'react';
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
  onPlayingChange: PlayingChangeHandler
  onDelayChange: DelayChangeHandler
}

const PhotoViewControl = ({ isPlaying, onDelayChange, onPlayingChange }: PhotoViewControlProps): React.JSX.Element => {
  const swiper = useSwiper();
  const handleLeftPress = useCallback(() => swiper.slidePrev(), [swiper]);
  const handleRightPress = useCallback(() => swiper.slideNext(), [swiper]);

  useEffect(() => {
    swiper.autoplay[isPlaying ? 'start' : 'stop']();
  }, [ isPlaying, swiper ]);

  useGlobalShortcutSpace(onPlayingChange);
  useGlobalShortcutArrowUp(onDelayChange);
  useGlobalShortcutArrowDown(onDelayChange);
  useGlobalShortcutArrowLeft(handleLeftPress);
  useGlobalShortcutArrowRight(handleRightPress);

  return (
    <div className="swiper-header">
      <div className="swiper-header-right-pane">
        <button type="button" onClick={onPlayingChange}>
          <i className={isPlaying ? 'fa-solid fa-pause fa-icon' : 'fa-solid fa-play fa-icon'}></i>
        </button>
      </div>
    </div>
  );
};

export default PhotoViewControl;
