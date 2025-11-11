import { useCallback } from 'react';
import { IPC_CHANNEL_ON_RIGHT_PRESSED } from '../../../constants';
import { useGlobalShortcut } from './useGlobalShortcut';
import type { SliderRef } from '../../types/app.types';

export const useGlobalShortcutArrowRight = (sliderRef: SliderRef): void => {
  const handleRightPressed = useCallback(() => {
    const slider = sliderRef.current;

    if (slider) {
      slider.slickNext();
    }
  }, [sliderRef]);
  useGlobalShortcut(IPC_CHANNEL_ON_RIGHT_PRESSED, handleRightPressed);
};
