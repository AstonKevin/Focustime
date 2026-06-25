import React, { useState } from 'react';
import SoundSelector from './SoundSelector';

export default function Settings({ settings, onSave }) {
  const [localSettings, setLocalSettings] = useState({ ...settings });
  const [saved, setSaved] = useState(false);

  const handleChange = (key, value) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    if (localSettings.minInterval >= localSettings.maxInterval) {
      alert('最短间隔必须小于最长间隔');
      return;
    }
    if (localSettings.minInterval < 1) {
      alert('最短间隔不能小于1');
      return;
    }
    onSave(localSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="settings-container">
      <h2>设置</h2>

      {/* 专注时长 */}
      <div className="settings-section">
        <h3>专注时长</h3>
        <div className="setting-item">
          <label>专注时长（分钟）</label>
          <input
            type="number"
            min="1"
            max="180"
            value={localSettings.focusDuration}
            onChange={(e) => handleChange('focusDuration', parseInt(e.target.value) || 1)}
          />
          <span className="unit">分钟</span>
        </div>
      </div>

      {/* 提示音区间 */}
      <div className="settings-section">
        <h3>提示音区间</h3>
        <div className="setting-item">
          <label>间隔单位</label>
          <select
            value={localSettings.intervalUnit}
            onChange={(e) => handleChange('intervalUnit', e.target.value)}
          >
            <option value="seconds">秒</option>
            <option value="minutes">分钟</option>
          </select>
        </div>
        <div className="setting-item">
          <label>最短间隔</label>
          <input
            type="number"
            min="1"
            value={localSettings.minInterval}
            onChange={(e) => handleChange('minInterval', parseInt(e.target.value) || 1)}
          />
          <span className="unit">{localSettings.intervalUnit === 'minutes' ? '分钟' : '秒'}</span>
        </div>
        <div className="setting-item">
          <label>最长间隔</label>
          <input
            type="number"
            min="1"
            value={localSettings.maxInterval}
            onChange={(e) => handleChange('maxInterval', parseInt(e.target.value) || 1)}
          />
          <span className="unit">{localSettings.intervalUnit === 'minutes' ? '分钟' : '秒'}</span>
        </div>
      </div>

      {/* 提示音选择 */}
      <div className="settings-section">
        <h3>提示音</h3>
        <SoundSelector
          selectedSound={localSettings.soundFile}
          onSelect={(sound) => handleChange('soundFile', sound)}
        />
      </div>

      {/* 保存按钮 */}
      <div className="settings-actions">
        <button className="btn btn-primary" onClick={handleSave}>
          {saved ? '✓ 已保存' : '保存设置'}
        </button>
      </div>
    </div>
  );
}
