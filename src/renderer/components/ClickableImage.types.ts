import type Slider from 'react-slick';

export interface ClickableImageProps {
  src: string
  sliderRef: React.RefObject<Slider | null>
}
