import { useCallback, useEffect, useRef } from 'react';
import RendererClient from '../api/RendererClient';
import type { AfterChangeCallback } from '../types/app.types';

export const useSwiperAfterChangeListener = (files: readonly string[], delay: number): AfterChangeCallback => {
  const currentPageRef = useRef(0);

  const afterChangeHandler = useCallback((page: number) => {
    const file = files[page];
    const title = `[delay:${delay}]  ${file}  [${page + 1}/${files.length}]`;
    RendererClient.updateWindowTitle(title);
    currentPageRef.current = page;
  }, [delay, files]);

  useEffect(() => {
    afterChangeHandler(currentPageRef.current);
  }, [afterChangeHandler]);

  return afterChangeHandler;
};
