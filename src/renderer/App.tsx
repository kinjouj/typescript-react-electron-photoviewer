import { useFetchFiles } from './hooks';
import { NowLoading, SliderContent } from './components';

const App = (): React.JSX.Element => {
  const { files, loading, isError } = useFetchFiles();

  if (loading) {
    return (<NowLoading loading={loading} />);
  }

  if (isError) {
    return (<div>Error</div>);
  }

  if (files.length === 0) {
    return (<div>File is Missing</div>);
  }

  return (
    <SliderContent files={files} />
  );
};

export default App;
