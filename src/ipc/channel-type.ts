import type {
  IPC_CHANNEL_KEY_PRESSED_DOWN,
  IPC_CHANNEL_KEY_PRESSED_LEFT,
  IPC_CHANNEL_KEY_PRESSED_RIGHT,
  IPC_CHANNEL_KEY_PRESSED_SPACE,
  IPC_CHANNEL_KEY_PRESSED_UP
} from '../ipc/channels';

type GlobalShortcutChannels = {
  UP: typeof IPC_CHANNEL_KEY_PRESSED_UP
  DOWN: typeof IPC_CHANNEL_KEY_PRESSED_DOWN
  LEFT: typeof IPC_CHANNEL_KEY_PRESSED_LEFT
  RIGHT: typeof IPC_CHANNEL_KEY_PRESSED_RIGHT
  SPACE: typeof IPC_CHANNEL_KEY_PRESSED_SPACE
};

export type GlobalShortcutChannel = GlobalShortcutChannels[keyof GlobalShortcutChannels];
