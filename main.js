import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = !app.isPackaged;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    backgroundColor: '#0f172a',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  if (isDev) {
    // Check your terminal to see if Next.js gave you port 3000 or 3001
    mainWindow.loadURL('http://localhost:3001');
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});