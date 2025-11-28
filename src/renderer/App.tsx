import { ClipLoader } from 'react-spinners';
import { useFetchFiles } from './hooks';
import { PhotoViewer } from './components';

const App = (): React.JSX.Element => {
  const { files, loading, isError } = useFetchFiles();

  if (loading) {
    return (<ClipLoader className="absolute-center" loading={loading} />);
  }

  if (isError) {
    return (
      <div className="absolute-center">
        <h1>Error</h1>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="absolute-center">
        <h1>File is Missing</h1>
      </div>
    );
  }

  return (
    <PhotoViewer files={files} />
  );
};

export default App;
