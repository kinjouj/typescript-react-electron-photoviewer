import { useMemo, useRef } from 'react';
import { usePlayControlListener, useSliderSettings } from '../hooks';
import { NextArrow, PhotoViewSlider, PlayToggleButton, PrevArrow } from '.';
import type { NullableSlider } from '../types/app.types';

const SliderContent = ({ files }: { files: readonly string[] }): React.JSX.Element => {
  const sliderRef = useRef<NullableSlider>(null);
  const prevArrow = useMemo(() => <PrevArrow />, []);
  const nextArrow = useMemo(() => <NextArrow />, []);
  const { isPlaying, onTogglePlaying, speed } = usePlayControlListener(sliderRef);
  const settings = useSliderSettings(files, speed, isPlaying, prevArrow, nextArrow);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <PhotoViewSlider sliderRef={sliderRef} settings={settings} files={files} />
      <div className="slick-footer">
        <div className="slick-footer-right-pane">
          <PlayToggleButton isPlaying={isPlaying} onTogglePlaying={onTogglePlaying} />
        </div>
      </div>
    </div>
  );
};

export default SliderContent;
