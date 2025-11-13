import { ClipLoader } from 'react-spinners';

const NowLoading = ({ loading }: { loading: boolean }): React.JSX.Element => {
  return (
    <ClipLoader loading={loading} className="clip-loader" />
  );
};

export default NowLoading;
