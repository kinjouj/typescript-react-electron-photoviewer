import { app as electronApp, dialog } from 'electron';
import PhotoViewerApp from './PhotoViewerApp';

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

electronApp.disableHardwareAcceleration();

void electronApp.whenReady().then(async () => {
  const selectedPath = await selectDirectory();

  if (selectedPath === null) {
    electronApp.quit();
    return;
  }

  try {
    await PhotoViewerApp.start(selectedPath, () => electronApp.quit());
  } catch (error) {
    console.error(error);
    electronApp.quit();
  }
});

electronApp.on('will-quit', () => {
  try {
    PhotoViewerApp.unregisterShortcut();
  } catch (error) {
    console.error(error);
  }
});
