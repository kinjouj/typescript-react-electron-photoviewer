import { useEffect, useReducer } from 'react';
import { FetchActionType, fetchReducer, type FetchState } from '../reducers/fetchReducer';
import RendererClient from '../api/RendererClient';

export const useFetchFiles = (): FetchState<readonly string[]> => {
  const [ state, dispatch ] = useReducer(fetchReducer<string[]>, { files: [], loading: true, isError: false });

  useEffect(() => {
    let cancelled = false;

    void (async (): Promise<void> => {
      dispatch({ type: FetchActionType.START });

      try {
        const result = await RendererClient.fetchFiles();

        if (!cancelled) {
          dispatch({ type: FetchActionType.SUCCESS, payload: result });
        }
      } catch {
        if (!cancelled) {
          dispatch({ type: FetchActionType.ERROR });
        }
      }
    })();

    return (): void => {
      cancelled = true;
    };
  }, []);

  return state;
};
