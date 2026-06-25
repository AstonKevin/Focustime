const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // 统计数据
  getStatistics: () => ipcRenderer.invoke('get-statistics'),
  saveStatistics: (stats) => ipcRenderer.invoke('save-statistics', stats),

  // 设置
  getSettings: () => ipcRenderer.invoke('get-settings'),
  saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),

  // 文件选择
  selectAudioFile: () => ipcRenderer.invoke('select-audio-file')
});
