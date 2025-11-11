import { useEffect, useReducer } from 'react';
import RendererClient from '../api/rendererClient';
import { fetchReducer, type FetchState } from '../reducers/fetchReducer';
import { FETCH_ACTION_ERROR, FETCH_ACTION_START, FETCH_ACTION_SUCCESS } from '../constants';

type FetchFilesResult = FetchState<string[]>;

export const useFetchFiles = (path: string): FetchFilesResult => {
  const [ state, dispatch ] = useReducer(fetchReducer<string[]>, { data: [], loading: true, isError: false });

  useEffect(() => {
    let cancelled = false;

    void (async (): Promise<void> => {
      dispatch({ type: FETCH_ACTION_START });

      try {
        const files = await RendererClient.fetchFiles(path);

        if (!cancelled) {
          dispatch({ type: FETCH_ACTION_SUCCESS, payload: files });
        }
      } catch {
        if (!cancelled) {
          dispatch({ type: FETCH_ACTION_ERROR });
        }
      }
    })();

    return (): void => {
      cancelled = true;
    };
  }, [path]);

  return state;
};
