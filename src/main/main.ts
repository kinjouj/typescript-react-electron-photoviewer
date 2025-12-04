import { app as electronApp, dialog, type BrowserWindow } from 'electron';
import { IPC_CHANNEL_KEY_PRESSED_ESCAPE } from '../ipc/channels';
import PhotoViewerApp from './PhotoViewerApp';
import ShortcutManager from './utils/ShortcutManager';

const selectDirectory = async (): Promise<string | null> => {
  try {
    const result = await dialog.showOpenDialog({
      title: 'photoviewer',
      properties: ['openDirectory'],
      defaultPath: electronApp.getPath('desktop'),
    });

    if (result.canceled || result.filePaths.length === 0) {
      return null;
    }

    return result.filePaths[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

const hasOpener = (window: BrowserWindow): boolean => {
  return window.webContents.opener !== null;
};

void electronApp.whenReady().then(async () => {
  const selectedPath = await selectDirectory();

  if (selectedPath === null) {
    electronApp.quit();
    return;
  }

  try {
    await PhotoViewerApp.start(selectedPath);
  } catch {
    electronApp.quit();
  }
});

electronApp.on('browser-window-focus', (_event, window) => {
  if (hasOpener(window)) {
    return;
  }

  ShortcutManager.register(
    (eventKey) => {
      if (eventKey === IPC_CHANNEL_KEY_PRESSED_ESCAPE) {
        electronApp.quit();
        return;
      }

      if (!window.isDestroyed()) {
        window.webContents.send(eventKey);
      }
    }
  );
});

electronApp.on('browser-window-blur', (_event, window) => {
  if (hasOpener(window)) {
    return;
  }

  ShortcutManager.unregister();
});
