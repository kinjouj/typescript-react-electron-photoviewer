import { ClipLoader } from 'react-spinners';
import { useFetchFiles } from '../hooks';
import { SliderContent } from '.';

const PhotoViewSlider = ({ path }: { path: string }): React.JSX.Element => {
  const { data, loading, isError } = useFetchFiles(path);

  if (loading) {
    return (<ClipLoader loading={loading} className="clip-loader" />);
  }

  if (isError) {
    return (<div>Error</div>);
  }

  if (data.length === 0) {
    return (<div>File is Missing</div>);
  }

  return (
    <SliderContent data={data} />
  );
};

export default PhotoViewSlider;
