import { useMemo } from 'react';
import Slider, { type Settings } from 'react-slick';
import ClickableImage from './ClickableImage';
import type { SliderRef } from '../types/app.types';

interface PhotoViewSliderProps {
  sliderRef: SliderRef
  settings: Settings
  files: readonly string[]
}

const PhotoViewSlider = ({ sliderRef, settings, files }: PhotoViewSliderProps): React.JSX.Element => {
  const slideImages = useMemo(() => {
    return files.map((file) => (
      <div key={file} className="slick-image-block">
        <ClickableImage src={file} sliderRef={sliderRef} />
      </div>
    ));
  }, [ files, sliderRef ]);

  return (
    <Slider {...settings} ref={sliderRef}>
      {slideImages}
    </Slider>
  );
};

export default PhotoViewSlider;
