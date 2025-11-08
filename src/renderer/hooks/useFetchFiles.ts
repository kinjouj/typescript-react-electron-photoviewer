import { useEffect, useState } from 'react';
import RendererClient from '../api/rendererClient';

interface UseFetchFilesResult {
  data: string[] | null
  loading: boolean
}

export const useFetchFiles = (path: string): UseFetchFilesResult => {
  const [ data, setData ] = useState<string[] | null>(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    void (async (): Promise<void> => {
      try {
        const files = await RendererClient.fetchFiles(path);
        setData(files);
        setLoading(false);
      } catch {
        setData(null);
        setLoading(false);
      }
    })();
  }, [path]);

  return { data, loading };
};
