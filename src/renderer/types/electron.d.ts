interface ElectronAPI {
  requestFiles: (requestPath: string) => Promise<string[]>
  updateTitle: (index: number, dataSize: number, path: string) => void
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

export {};
