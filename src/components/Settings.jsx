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
      alert('Min interval must be less than max interval');
      return;
    }
    if (localSettings.minInterval < 1) {
      alert('Min interval cannot be less than 1');
      return;
    }
    onSave(localSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      {/* Focus Duration */}
      <div className="settings-section">
        <h3>⏱ Focus Duration</h3>
        <div className="setting-item">
          <label>Duration (minutes)</label>
          <input
            type="number"
            min="1"
            max="180"
            value={localSettings.focusDuration}
            onChange={(e) => handleChange('focusDuration', parseInt(e.target.value) || 1)}
          />
          <span className="unit">min</span>
        </div>
      </div>

      {/* Sound Interval */}
      <div className="settings-section">
        <h3>🔔 Sound Interval</h3>
        <div className="setting-item">
          <label>Unit</label>
          <select
            value={localSettings.intervalUnit}
            onChange={(e) => handleChange('intervalUnit', e.target.value)}
          >
            <option value="seconds">Seconds</option>
            <option value="minutes">Minutes</option>
          </select>
        </div>
        <div className="setting-item">
          <label>Min Interval</label>
          <input
            type="number"
            min="1"
            value={localSettings.minInterval}
            onChange={(e) => handleChange('minInterval', parseInt(e.target.value) || 1)}
          />
          <span className="unit">{localSettings.intervalUnit === 'minutes' ? 'min' : 'sec'}</span>
        </div>
        <div className="setting-item">
          <label>Max Interval</label>
          <input
            type="number"
            min="1"
            value={localSettings.maxInterval}
            onChange={(e) => handleChange('maxInterval', parseInt(e.target.value) || 1)}
          />
          <span className="unit">{localSettings.intervalUnit === 'minutes' ? 'min' : 'sec'}</span>
        </div>
      </div>

      {/* Sound Selection */}
      <div className="settings-section">
        <h3>🎵 Notification Sound</h3>
        <SoundSelector
          selectedSound={localSettings.soundFile}
          onSelect={(sound) => handleChange('soundFile', sound)}
        />
      </div>

      {/* Save Button */}
      <div className="settings-actions">
        <button className="btn btn-primary" onClick={handleSave}>
          {saved ? '✓ Saved' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
