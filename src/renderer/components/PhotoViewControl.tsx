import { usePlayControlListener } from '../hooks';
import PlayToggleButton from './PlayToggleButton';
import type { DelayChangeHandler, PlayingChangeHandler } from '../types/app.types';

interface PhotoViewControlProps {
  isPlaying: boolean
  handleChangePlaying: PlayingChangeHandler
  handleChangeDelay: DelayChangeHandler
}

const PhotoViewControl = ({ isPlaying, handleChangePlaying, handleChangeDelay }: PhotoViewControlProps): React.JSX.Element => {
  usePlayControlListener(isPlaying, handleChangePlaying, handleChangeDelay);

  return (
    <div className="swiper-footer">
      <div className="swiper-footer-right-pane">
        <PlayToggleButton isPlaying={isPlaying} handleChangePlaying={handleChangePlaying} />
      </div>
    </div>
  );
};

export default PhotoViewControl;
