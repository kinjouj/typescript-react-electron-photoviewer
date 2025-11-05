import type { CustomArrowProps } from 'react-slick';

const NextArrow = (props: CustomArrowProps): React.JSX.Element => {
  const { onClick, className: _className, style, ...restProps } = props;
  const nextArrowStyle = {
    ...style,
    right: '15px',
  };

  return (
    <button type="button" onClick={onClick} className="slick-arrow" style={nextArrowStyle} {...restProps}>
      <i className="fas fa-arrow-right"></i>
    </button>
  );
};

export default NextArrow;
