import { useEffect, useMemo, useRef } from 'react';
import Slider from 'react-slick';
import { ClipLoader } from 'react-spinners';
import { ClickableImage, NextArrow, PrevArrow } from '.';
import { useFetchFiles, useSliderAfterChangeListener, useSliderKeyDownListener } from '../hooks';
import { SLIDER_BASE_SETTINGS } from '../../constants';
import type { PhotoViewSliderProps } from './PhotoViewSlider.types';

const PhotoViewSlider = ({ path }: PhotoViewSliderProps): React.JSX.Element => {
  const sliderRef = useRef<Slider | null>(null);
  const { data, loading } = useFetchFiles(path);
  const { isPlaying, slideSpeed } = useSliderKeyDownListener(sliderRef);
  const { afterChangeHandler } = useSliderAfterChangeListener(path, data);
  const settings = useMemo(() => ({
    ...SLIDER_BASE_SETTINGS,
    autoplay: isPlaying,
    autoplaySpeed: slideSpeed,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    afterChange: afterChangeHandler,
  }), [ isPlaying, slideSpeed, afterChangeHandler ]);

  useEffect((): void => afterChangeHandler(0), [afterChangeHandler]);

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
        <div className="slick-footer-right-pane">
          {slideSpeed}
        </div>
      </div>
    </div>
  );
};

export default PhotoViewSlider;
