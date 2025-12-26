import { FetchActionType, type FetchState } from '../types/app.types';

type FetchAction<T> = { type: FetchActionType.START }
  | { type: FetchActionType.SUCCESS, payload: T }
  | { type: FetchActionType.ERROR };

export const fetchReducer = <T>(state: FetchState<T>, action: FetchAction<T>): FetchState<T> => {
  switch (action.type) {
    case FetchActionType.START:
      return {
        ...state,
        loading: true,
        isError: false,
      };

    case FetchActionType.SUCCESS:
      return {
        files: action.payload,
        loading: false,
        isError: false,
      };

    case FetchActionType.ERROR:
      return {
        ...state,
        loading: false,
        isError: true,
      };

    default:
      return state;
  }
};
