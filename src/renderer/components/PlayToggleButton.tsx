import { useCallback } from 'react';
import type { PlayControlResult } from '../types/app.types';

type PlayToggleButtonProps = Omit<PlayControlResult, 'speed'>;

const PlayToggleButton = ({ isPlaying, onTogglePlaying }: PlayToggleButtonProps): React.JSX.Element => {
  const buttonCSSClass = isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play';
  const onClickHandler = useCallback(() => onTogglePlaying(), [onTogglePlaying]);

  return (
    <button type="button" onClick={onClickHandler}>
      <i className={buttonCSSClass} style={{ fontSize: '1.58em' }}></i>
    </button>
  );
};

export default PlayToggleButton;
