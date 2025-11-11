import { useCallback } from 'react';
import { IPC_CHANNEL_ON_LEFT_PRESSED } from '../../../constants';
import { useGlobalShortcut } from './useGlobalShortcut';
import type { SliderRef } from '../../types/app.types';

export const useGlobalShortcutArrowLeft = (sliderRef: SliderRef): void => {
  const handleLeftPressed = useCallback(() => {
    const slider = sliderRef.current;

    if (slider) {
      slider.slickPrev();
    }
  }, [sliderRef]);
  useGlobalShortcut(IPC_CHANNEL_ON_LEFT_PRESSED, handleLeftPressed);
};
