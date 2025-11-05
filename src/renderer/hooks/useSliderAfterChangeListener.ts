import { useCallback } from 'react';
import RendererClient from '../api/rendererClient';
import type { UseSliderAfterChangeListenerResult } from './useSliderAfterChangeListener.types';

export const useSliderAfterChangeListener = (path: string, data: string[] | null): UseSliderAfterChangeListenerResult => {
  const afterChangeHandler = useCallback((currentSlide: number) => {
    if (data === null) {
      return;
    }

    RendererClient.updateWindowTitle(currentSlide + 1, data.length, path);
  }, [ path, data ]);

  return { afterChangeHandler };
};
