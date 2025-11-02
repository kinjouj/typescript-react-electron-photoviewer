import { useRef } from 'react';
import { useSliderKeyDownController } from './hooks';
import { PhotoViewSlider } from './components';
import type Slider from 'react-slick';

const useLocationHash = (): string | null => {
  try {
    const hash = location.hash.substring(1);
    return decodeURIComponent(hash);
  } catch (e) {
    console.error(e);
    return null;
  }
};

const App = (): React.JSX.Element => {
  const path = useLocationHash();
  const slideRef = useRef<Slider>(null);
  useSliderKeyDownController(slideRef);

  if (path === null) {
    return (<div>Error</div>);
  }

  return (
    <PhotoViewSlider path={path} sliderRef={slideRef} />
  );
};

export default App;
