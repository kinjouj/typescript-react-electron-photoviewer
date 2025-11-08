import { useCallback } from 'react';
import type { PlayingButtonProps } from './PlayingButton.types';

const PlayingButton = ({ isPlaying, onTogglePlaying }: PlayingButtonProps): React.JSX.Element => {
  const buttonCSSClass = isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play';
  const onClickHandler = useCallback(() => onTogglePlaying(), [onTogglePlaying]);

  return (
    <button type="button" onClick={onClickHandler}>
      <i className={buttonCSSClass} style={{ fontSize: '1.58em' }}></i>
    </button>
  );
};

export default PlayingButton;
