import { useCallback, useState } from 'react';
import type { DelayChangeHandler } from '../types/app.types';

interface DelayHookResult {
  delay: number
  handleDelayChange: DelayChangeHandler
}

export const useDelay = (initialDelay: number): DelayHookResult => {
  const [ delay, setDelay ] = useState(initialDelay);

  const handleDelayChange = useCallback((callback: (curerntDelay: number) => number) => {
    setDelay((curerntDelay) => callback(curerntDelay));
  }, [setDelay]);

  return { delay, handleDelayChange };
};
