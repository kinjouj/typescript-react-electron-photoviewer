import * as fs from 'node:fs/promises';
import * as path from 'node:path';

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);

export default class MainClient {
  public static async getFiles(directory: string): Promise<string[]> {
    try {
      const entries = await fs.readdir(directory, { withFileTypes: true });

      return entries
        .filter((entry) => {
          if (!entry.isFile()) {
            return false;
          }

          return imageExtensions.has(path.extname(entry.name).toLowerCase());
        }).map((file) => path.join(directory, file.name));
    } catch {
      return [];
    }
  }
};
