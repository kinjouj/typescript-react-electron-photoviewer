import { useMemo, useRef } from 'react';
import Slider from 'react-slick';
import { usePlayControlListener, useSliderSettings } from '../hooks';
import { ClickableImage, NextArrow, PlayToggleButton, PrevArrow } from '.';
import type { NullableSlider } from '../types/app.types';

const SliderContent = ({ data }: { data: string[] }): React.JSX.Element => {
  const sliderRef = useRef<NullableSlider>(null);
  const prevArrow = useMemo(() => <PrevArrow />, []);
  const nextArrow = useMemo(() => <NextArrow />, []);
  const { isPlaying, onTogglePlaying, speed } = usePlayControlListener(sliderRef);
  const settings = useSliderSettings(data, speed, isPlaying, prevArrow, nextArrow);

  const slides = useMemo(() => {
    return data.map((file) => (
      <div key={file} className="slick-image-block">
        <ClickableImage src={file} sliderRef={sliderRef} />
      </div>
    ));
  }, [data]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Slider {...settings} ref={sliderRef}>
        {slides}
      </Slider>
      <div className="slick-footer">
        <div className="slick-footer-right-pane">
          <PlayToggleButton isPlaying={isPlaying} onTogglePlaying={onTogglePlaying} />
        </div>
      </div>
    </div>
  );
};

export default SliderContent;
