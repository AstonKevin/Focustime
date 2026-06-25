const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const Store = require('electron-store');

// 数据存储
const store = new Store();

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 600,
    minHeight: 500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    titleBarStyle: 'hiddenInset',
    title: 'FocusPing'
  });

  // 开发模式加载本地服务器，生产模式加载打包文件
  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC 处理：获取统计数据
ipcMain.handle('get-statistics', () => {
  return store.get('statistics', []);
});

// IPC 处理：保存统计数据
ipcMain.handle('save-statistics', (event, stats) => {
  store.set('statistics', stats);
  return true;
});

// IPC 处理：获取设置
ipcMain.handle('get-settings', () => {
  return store.get('settings', {
    focusDuration: 45,
    minInterval: 3,
    maxInterval: 8,
    intervalUnit: 'minutes',
    soundFile: null
  });
});

// IPC 处理：保存设置
ipcMain.handle('save-settings', (event, settings) => {
  store.set('settings', settings);
  return true;
});

// IPC 处理：选择音频文件
ipcMain.handle('select-audio-file', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: '音频文件', extensions: ['mp3', 'wav', 'ogg', 'm4a'] }
    ]
  });

  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});

// IPC 处理：获取待办
ipcMain.handle('get-todos', () => {
  return store.get('todos', []);
});

// IPC 处理：保存待办
ipcMain.handle('save-todos', (event, todos) => {
  store.set('todos', todos);
  return true;
});
