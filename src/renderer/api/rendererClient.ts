export default class RendererClient {
  public static async fetchFiles(requestPath: string): Promise<string[]> {
    return await window.electronAPI.requestFiles(requestPath);
  }

  public static updateWindowTitle(title: string): void {
    window.electronAPI.updateTitle(title);
  }

  public static removeListener(channel: string, callback: () => void): () => void {
    return () => {
      window.electronAPI.removeListener(channel, callback);
    };
  }
}
