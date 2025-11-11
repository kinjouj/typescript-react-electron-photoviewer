import type { CustomArrowProps } from 'react-slick';

const PrevArrow = (props: CustomArrowProps): React.JSX.Element => {
  const { onClick, className: _className, style, ...restProps } = props;

  return (
    <button type="button" onClick={onClick} className="slick-arrow" style={{ ...style, left: '15px' }} {...restProps}>
      <i className="fas fa-arrow-left"></i>
    </button>
  );
};

export default PrevArrow;
