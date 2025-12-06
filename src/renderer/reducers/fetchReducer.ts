export enum FetchActionType {
  START = 'FETCH_START',
  SUCCESS = 'FETCH_SUCCESS',
  ERROR = 'FETCH_ERROR'
}

export interface FetchState<T> {
  files: T
  loading: boolean
  isError: boolean
}

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
