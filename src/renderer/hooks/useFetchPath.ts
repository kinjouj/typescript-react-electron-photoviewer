import { useEffect, useState } from 'react';
import RendererClient from '../api/rendererClient';

interface FetchPathResult {
  path: string | null
  loading: boolean
}

export const useFetchPath = (): FetchPathResult => {
  const [ path, setPath ] = useState<string | null>(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    let cannelled = false;
    const fetchPath = async (): Promise<void> => {
      try {
        const result = await RendererClient.getPath();

        if (!cannelled) {
          setPath(result);
        }
      } catch {
        // noop
      } finally {
        if (!cannelled) {
          setLoading(false);
        }
      }
    };
    void fetchPath();

    return (): void => {
      cannelled = true;
    };
  }, []);

  return { path, loading };
};
