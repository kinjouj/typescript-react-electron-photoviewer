import { NowLoading, PhotoView } from './components';
import { useFetchPath } from './hooks';

const App = (): React.JSX.Element => {
  const { path, loading } = useFetchPath();

  if (loading) {
    return (<NowLoading loading={loading} />);
  }

  if (path === null) {
    return (<div>Error</div>);
  }

  return (<PhotoView path={path} />);
};

export default App;
