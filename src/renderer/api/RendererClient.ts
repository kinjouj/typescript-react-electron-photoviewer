import type { GlobalShortcutChannel } from '../../ipc/channel-type';

export default class RendererClient {
  public static async fetchFiles(): Promise<string[]> {
    return await window.electronAPI.requestFiles();
  }

  public static updateWindowTitle(title: string): void {
    window.electronAPI.updateTitle(title);
  }

  public static removeListener(channel: GlobalShortcutChannel, callback: () => void): () => void {
    return () => window.electronAPI.removeListener(channel, callback);
  }
}
