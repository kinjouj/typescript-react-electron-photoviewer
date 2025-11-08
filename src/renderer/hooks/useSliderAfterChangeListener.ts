import { useCallback, useEffect } from 'react';
import RendererClient from '../api/rendererClient';
import type { UseSliderAfterChangeListenerResult } from './useSliderAfterChangeListener.types';

export const useSliderAfterChangeListener = (path: string, data: string[] | null): UseSliderAfterChangeListenerResult => {
  const afterChangeHandler = useCallback((page: number) => {
    if (data === null) {
      return;
    }

    RendererClient.updateWindowTitle(page + 1, data.length, path);
  }, [ path, data ]);

  useEffect((): void => afterChangeHandler(0), [afterChangeHandler]);

  return { afterChangeHandler };
};
