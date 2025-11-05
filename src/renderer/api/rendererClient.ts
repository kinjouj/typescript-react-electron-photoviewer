export default class RendererClient {
  public static async fetchFiles(requestPath: string): Promise<string[]> {
    return await window.electronAPI.requestFiles(requestPath);
  }

  public static updateWindowTitle(index: number, dataSize: number, path: string): void {
    window.electronAPI.updateTitle(index, dataSize, path);
  }
}
