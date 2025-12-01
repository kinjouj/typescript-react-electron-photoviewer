import { useEffect, useReducer } from 'react';
import { FETCH_ACTION_ERROR, FETCH_ACTION_START, FETCH_ACTION_SUCCESS } from '../../constants/renderer';
import { fetchReducer, type FetchState } from '../reducers/fetchReducer';
import RendererClient from '../api/RendererClient';

export const useFetchFiles = (): FetchState<readonly string[]> => {
  const [ state, dispatch ] = useReducer(fetchReducer<string[]>, { files: [], loading: true, isError: false });

  useEffect(() => {
    let cancelled = false;

    void (async (): Promise<void> => {
      dispatch({ type: FETCH_ACTION_START });

      try {
        const result = await RendererClient.fetchFiles();

        if (!cancelled) {
          dispatch({ type: FETCH_ACTION_SUCCESS, payload: result });
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
  }, []);

  return state;
};
