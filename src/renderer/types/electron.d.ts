type ElectronAPI = {
  requestFiles: (requestPath: string) => Promise<string[]>
};

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

export {};
