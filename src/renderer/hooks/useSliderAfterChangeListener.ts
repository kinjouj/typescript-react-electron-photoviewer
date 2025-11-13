import { useCallback, useEffect, useRef } from 'react';
import RendererClient from '../api/rendererClient';
import type { AfterChangeCallback } from '../types/app.types';

interface AfterChangeHandlerResult {
  afterChangeHandler: AfterChangeCallback
}

export const useSliderAfterChangeListener = (files: readonly string[], speed: number): AfterChangeHandlerResult => {
  const speedRef = useRef(speed);
  const currentPageRef = useRef(0);

  const afterChangeHandler = useCallback((page: number) => {
    console.log(`page: ${page}`);
    const speed = speedRef.current;
    const title = `(${page + 1}/${files.length}):  speed(${speed})`;
    RendererClient.updateWindowTitle(title);
    currentPageRef.current = page;
  }, [files]);

  useEffect(() => {
    speedRef.current = speed;
    afterChangeHandler(currentPageRef.current);
  }, [ speed, afterChangeHandler ]);

  return { afterChangeHandler };
};
