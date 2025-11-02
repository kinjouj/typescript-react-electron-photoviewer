import type { CustomArrowProps } from 'react-slick';

const PrevArrow = (props: CustomArrowProps): React.JSX.Element => {
  const { onClick, className: _className, style, ...restProps } = props;
  const prevArrowStyle = {
    ...style,
    left: '15px',
  };

  return (
    <button onClick={onClick} className="slick-arrow" style={prevArrowStyle} {...restProps}>
      <i className="fas fa-arrow-left"></i>
    </button>
  );
};

export default PrevArrow;
