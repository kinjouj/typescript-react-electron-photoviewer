import { usePlayControlListener } from '../hooks';
import type { DelayChangeHandler, PlayingChangeHandler } from '../types/app.types';

interface PhotoViewControlProps {
  isPlaying: boolean
  handleChangePlaying: PlayingChangeHandler
  handleChangeDelay: DelayChangeHandler
}

const PhotoViewControl = ({ isPlaying, handleChangePlaying, handleChangeDelay }: PhotoViewControlProps): React.JSX.Element => {
  usePlayControlListener(isPlaying, handleChangePlaying, handleChangeDelay);

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
