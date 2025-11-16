import { useClickableImageListener } from '../hooks';

const ClickableImage = ({ src }: { src: string }): React.JSX.Element => {
  const { cursor, onClickImage, onMouseMove, onRightClickImageOpen } = useClickableImageListener();

  return (
    <img
      src={src}
      className="swiper-image"
      style={{ cursor: cursor }}
      loading="lazy"
      onMouseDown={onClickImage}
      onMouseMove={onMouseMove}
      onContextMenu={onRightClickImageOpen}
    />
  );
};

export default ClickableImage;
