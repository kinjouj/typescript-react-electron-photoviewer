import { ClipLoader } from 'react-spinners';
import { useFetchFiles } from './hooks';
import { PhotoViewSwiper } from './components';

const App = (): React.JSX.Element => {
  const { files, loading, isError } = useFetchFiles();

  if (loading) {
    return (<ClipLoader className="clip-loader" loading={loading} />);
  }

  if (isError) {
    return (<div>Error</div>);
  }

  if (files.length === 0) {
    return (<div>File is Missing</div>);
  }

  return (
    <PhotoViewSwiper files={files} />
  );
};

export default App;
