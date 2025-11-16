import type { PlayingChangeHandler } from '../types/app.types';

interface PlayToggleButtonProps {
  isPlaying: boolean
  handleChangePlaying: PlayingChangeHandler
}

const PlayToggleButton = ({ isPlaying, handleChangePlaying }: PlayToggleButtonProps): React.JSX.Element => {
  const buttonCSSClass = isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play';

  return (
    <button type="button" onClick={handleChangePlaying}>
      <i className={buttonCSSClass} style={{ fontSize: '1.58em' }}></i>
    </button>
  );
};

export default PlayToggleButton;
