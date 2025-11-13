interface ElectronAPI {
  getPath: () => Promise<string>
  requestFiles: (requestPath: string) => Promise<string[]>
  updateTitle: (title: string) => void
  onGlobalShortcut: (channel: string, callback: () => void) => void
  removeListener: (channel: string, callback: () => void) => void
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

export {};
