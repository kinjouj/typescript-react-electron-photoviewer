import { useCallback, useEffect } from 'react';
import RendererClient from '../api/rendererClient';
import type { UseSliderAfterChangeListenerResult } from './useSliderAfterChangeListener.types';

export const useSliderAfterChangeListener = (path: string, data: string[] | null): UseSliderAfterChangeListenerResult => {
  const updateTitle = useCallback((page: number) => {
    if (data === null) {
      return;
    }

    RendererClient.updateWindowTitle(page + 1, data.length, path);
  }, [ path, data ]);

  const afterChangeHandler = useCallback((page: number) => updateTitle(page), [updateTitle]);

  useEffect(() => {
    if (data === null) {
      return;
    }

    updateTitle(0);
  }, [ data, updateTitle ]);

  return { afterChangeHandler };
};
