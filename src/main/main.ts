import { app as electron, dialog } from 'electron';
import PhotoViewerApp from './PhotoViewerApp';

const selectDirectory = async (): Promise<string | null> => {
  try {
    const result = await dialog.showOpenDialog({
      title: 'photoviewer',
      properties: ['openDirectory'],
      defaultPath: electron.getPath('desktop'),
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

electron.disableHardwareAcceleration();

void electron.whenReady().then(async () => {
  const selectedPath = await selectDirectory();

  if (selectedPath === null) {
    electron.quit();
    return;
  }

  try {
    await PhotoViewerApp.start(selectedPath, () => electron.quit());
  } catch (error) {
    console.error(error);
    electron.quit();
  }
});

electron.on('will-quit', () => {
  try {
    PhotoViewerApp.unregisterShortcut();
  } catch (error) {
    console.error(error);
  }
});
