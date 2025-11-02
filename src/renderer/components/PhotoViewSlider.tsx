import { useEffect, useState } from 'react';
import Slider, { type Settings } from 'react-slick';
import { ClickableImage, NextArrow, PrevArrow } from '.';
import { ClipLoader } from 'react-spinners';

const settings: Settings = {
  swipe: false,
  draggable: false,
  touchMove: false,
  dots: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  arrows: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  pauseOnFocus: false,
  pauseOnHover: false,
};

interface PhotoViewSliderProps {
  path: string
  sliderRef: React.RefObject<Slider | null>
}

const PhotoViewSlider = ({ path, sliderRef }: PhotoViewSliderProps): React.JSX.Element => {
  const [ data, setData ] = useState<string[] | null>(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof window.setTimeout> | null = null;

    void (async (): Promise<void> => {
      try {
        const files = await window.electronAPI.requestFiles(path);
        timer = setTimeout(() => {
          setData(files);
          setLoading(false);
        }, 1000);
      } catch {
        setData(null);
        setLoading(false);
      }
    })();

    return (): void => {
      if (timer !== null) {
        clearTimeout(timer);
      }
    };
  }, [path]);

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
    </div>
  );
};

export default PhotoViewSlider;
