import { useCallback, useState } from 'react';
import {
  useGlobalShortcutArrowDown,
  useGlobalShortcutArrowLeft,
  useGlobalShortcutArrowRight,
  useGlobalShortcutArrowUp,
  useGlobalShortcutSpace
} from './events';
import type { PlayControlResult, SliderRef } from '../types/app.types';

const SLIDER_DEFAULT_SPEED = 2000;

export const useSliderKeyDownListener = (sliderRef: SliderRef): PlayControlResult => {
  const [ speed, setSpeed ] = useState(SLIDER_DEFAULT_SPEED);
  const [ isPlaying, setIsPlaying ] = useState(true);
  const onTogglePlaying = useCallback(() => setIsPlaying((prevPlaying) => !prevPlaying), []);

  useGlobalShortcutSpace(onTogglePlaying);
  useGlobalShortcutArrowUp(setSpeed);
  useGlobalShortcutArrowDown(setSpeed);
  useGlobalShortcutArrowLeft(sliderRef);
  useGlobalShortcutArrowRight(sliderRef);

  return { isPlaying, onTogglePlaying, speed };
};
