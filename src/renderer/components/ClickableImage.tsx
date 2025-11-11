import { useClickableImageListener } from '../hooks';
import type { SliderRef } from '../types/app.types';

interface ClickableImageProps {
  src: string
  sliderRef: SliderRef
}

const ClickableImage = ({ src, sliderRef }: ClickableImageProps): React.JSX.Element => {
  const { cursor, onClickImage, onMouseMove, onRightClickImageOpen } = useClickableImageListener(sliderRef);

  return (
    <img
      src={src}
      className="slick-image"
      style={{ cursor: cursor }}
      loading="lazy"
      onMouseDown={onClickImage}
      onMouseMove={onMouseMove}
      onContextMenu={onRightClickImageOpen}
    />
  );
};

export default ClickableImage;
