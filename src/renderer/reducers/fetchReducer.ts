import { FETCH_ACTION_ERROR, FETCH_ACTION_START, FETCH_ACTION_SUCCESS } from '../constants';

type FetchStartAction = { type: typeof FETCH_ACTION_START };
type FetchSuccessAction<T> = { type: typeof FETCH_ACTION_SUCCESS, payload: T };
type FetchErrorAction = { type: typeof FETCH_ACTION_ERROR };
type Action<T> = FetchStartAction | FetchSuccessAction<T> | FetchErrorAction;

export interface FetchState<T> {
  files: T
  loading: boolean
  isError: boolean
}

export const fetchReducer = <T>(state: FetchState<T>, action: Action<T>): FetchState<T> => {
  switch (action.type) {
    case FETCH_ACTION_START:
      return {
        ...state,
        loading: true,
        isError: false,
      };

    case FETCH_ACTION_SUCCESS:
      return {
        files: action.payload,
        loading: false,
        isError: false,
      };

    case FETCH_ACTION_ERROR:
      return {
        ...state,
        loading: false,
        isError: true,
      };

    default:
      return state;
  }
};
