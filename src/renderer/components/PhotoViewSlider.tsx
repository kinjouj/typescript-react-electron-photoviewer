import { useRef } from 'react';
import Slider from 'react-slick';
import { ClipLoader } from 'react-spinners';
import {
  useFetchFiles,
  usePlayControlListener,
  useSliderAfterChangeListener,
  useSliderKeyDownListener,
  useSliderSettings
} from '../hooks';
import { ClickableImage, PlayingButton } from '.';
import type { PhotoViewSliderProps } from './PhotoViewSlider.types';

const PhotoViewSlider = ({ path }: PhotoViewSliderProps): React.JSX.Element => {
  const sliderRef = useRef<Slider | null>(null);
  const { data, loading } = useFetchFiles(path);
  const { isPlaying, onTogglePlaying } = usePlayControlListener(sliderRef);
  const { speed } = useSliderKeyDownListener(sliderRef, onTogglePlaying);
  const { afterChangeHandler } = useSliderAfterChangeListener(path, data);
  const settings = useSliderSettings(isPlaying, speed, afterChangeHandler);

  if (loading) {
    return (<ClipLoader loading={loading} className="clip-loader" />);
  }

  if (data === null) {
    return (<div>Error</div>);
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Slider {...settings} ref={sliderRef}>
        {data.map((file) => {
          return (
            <div key={file} className="slick-image-block">
              <ClickableImage src={file} sliderRef={sliderRef} />
            </div>
          );
        })}
      </Slider>
      <div className="slick-footer">
        <div className="slick-footer-left-pane">
          <PlayingButton isPlaying={isPlaying} onTogglePlaying={onTogglePlaying} />
        </div>
        <div className="slick-footer-right-pane">
          {speed}
        </div>
      </div>
    </div>
  );
};

export default PhotoViewSlider;
