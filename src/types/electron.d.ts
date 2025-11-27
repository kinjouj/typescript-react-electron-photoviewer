import type { GlobalShortcutChannel } from '../../ipc/channel';

interface ElectronAPI {
  requestFiles: () => Promise<string[]>
  updateTitle: (title: string) => void
  onGlobalShortcut: (channel: GlobalShortcutChannel, callback: () => void) => void
  removeListener: (channel: GlobalShortcutChannel, callback: () => void) => void
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

export {};
