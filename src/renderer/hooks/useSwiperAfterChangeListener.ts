import { useCallback, useEffect, useRef } from 'react';
import RendererClient from '../api/rendererClient';
import type { AfterChangeCallback } from '../types/app.types';

interface AfterChangeHandlerResult {
  afterChangeHandler: AfterChangeCallback
}

export const useSwiperAfterChangeListener = (files: readonly string[], delay: number): AfterChangeHandlerResult => {
  const currentPageRef = useRef(0);

  const afterChangeHandler = useCallback((page: number) => {
    const title = `(${page + 1}/${files.length})  speed[${delay}]`;
    RendererClient.updateWindowTitle(title);
    currentPageRef.current = page;
  }, [ delay, files ]);

  useEffect(() => {
    afterChangeHandler(currentPageRef.current);
  }, [afterChangeHandler]);

  return { afterChangeHandler };
};
