import { useCallback, useEffect, useRef } from 'react';
import RendererClient from '../api/rendererClient';
import type { AfterChangeCallback } from '../types/app.types';

interface AfterChangeHandlerResult {
  afterChangeHandler: AfterChangeCallback
}

export const useSliderAfterChangeListener = (data: string[], speed: number): AfterChangeHandlerResult => {
  const speedRef = useRef(speed);
  const currentPage = useRef(0);

  const afterChangeHandler = useCallback((page: number) => {
    const speed = speedRef.current;
    const title = `(${page + 1}/${data.length}):  speed(${speed})`;
    RendererClient.updateWindowTitle(title);
    currentPage.current = page;
  }, [data]);

  useEffect(() => {
    speedRef.current = speed;
    afterChangeHandler(currentPage.current);
  }, [ speed, afterChangeHandler ]);

  return { afterChangeHandler };
};
