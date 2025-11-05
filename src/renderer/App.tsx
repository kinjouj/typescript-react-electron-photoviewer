import { PhotoViewSlider } from './components';

const useLocationHash = (): string | null => {
  try {
    const hash = location.hash.substring(1);
    return decodeURIComponent(hash);
  } catch (e) {
    console.error(e);
    return null;
  }
};

const App = (): React.JSX.Element => {
  const path = useLocationHash();

  if (path === null) {
    return (<div>Error</div>);
  }

  return (
    <PhotoViewSlider path={path} />
  );
};

export default App;
