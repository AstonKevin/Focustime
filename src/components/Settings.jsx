import React, { useState } from 'react';
import SoundSelector from './SoundSelector';
import { useSettings } from '../store/SettingsContext';

export default function Settings({ settings, onSave }) {
  const { t, theme, lang, themes, languages, changeTheme, changeLang } = useSettings();
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
    onSave({ ...localSettings, theme, lang });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="settings-container">
      <h2>{t('settingsTitle')}</h2>

      {/* 主题和语言 */}
      <div className="settings-section">
        <h3>🎨 {t('settingsTheme')}</h3>
        <div className="theme-grid">
          {Object.values(themes).map(th => (
            <div
              key={th.id}
              className={`theme-card ${theme === th.id ? 'active' : ''}`}
              onClick={() => changeTheme(th.id)}
            >
              <div className="theme-preview" style={{
                background: th.colors['--accent-gradient'],
                boxShadow: `0 4px 15px ${th.colors['--accent-glow']}`
              }}>
                <span className="theme-icon">{th.icon}</span>
              </div>
              <span className="theme-name">{t(`theme${th.id.charAt(0).toUpperCase() + th.id.slice(1)}`)}</span>
              <span className="theme-desc">{t(`theme${th.id.charAt(0).toUpperCase() + th.id.slice(1)}Desc`)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <h3>🌐 {t('settingsLanguage')}</h3>
        <div className="lang-grid">
          {Object.values(languages).map(l => (
            <div
              key={l.id}
              className={`lang-card ${lang === l.id ? 'active' : ''}`}
              onClick={() => changeLang(l.id)}
            >
              <span className="lang-icon">{l.icon}</span>
              <span className="lang-name">{l.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Focus Duration */}
      <div className="settings-section">
        <h3>⏱ {t('settingsDuration')}</h3>
        <div className="setting-item">
          <label>{t('settingsDurationLabel')}</label>
          <input
            type="number"
            min="1"
            max="180"
            value={localSettings.focusDuration}
            onChange={(e) => handleChange('focusDuration', parseInt(e.target.value) || 1)}
          />
          <span className="unit">{t('settingsDurationUnit')}</span>
        </div>
      </div>

      {/* Sound Interval */}
      <div className="settings-section">
        <h3>🔔 {t('settingsInterval')}</h3>
        <div className="setting-item">
          <label>{t('settingsIntervalUnit')}</label>
          <select
            value={localSettings.intervalUnit}
            onChange={(e) => handleChange('intervalUnit', e.target.value)}
          >
            <option value="seconds">{t('settingsIntervalUnitSec')}</option>
            <option value="minutes">{t('settingsIntervalUnitMin')}</option>
          </select>
        </div>
        <div className="setting-item">
          <label>{t('settingsMinInterval')}</label>
          <input
            type="number"
            min="1"
            value={localSettings.minInterval}
            onChange={(e) => handleChange('minInterval', parseInt(e.target.value) || 1)}
          />
          <span className="unit">{localSettings.intervalUnit === 'minutes' ? t('settingsIntervalUnitMin') : t('settingsIntervalUnitSec')}</span>
        </div>
        <div className="setting-item">
          <label>{t('settingsMaxInterval')}</label>
          <input
            type="number"
            min="1"
            value={localSettings.maxInterval}
            onChange={(e) => handleChange('maxInterval', parseInt(e.target.value) || 1)}
          />
          <span className="unit">{localSettings.intervalUnit === 'minutes' ? t('settingsIntervalUnitMin') : t('settingsIntervalUnitSec')}</span>
        </div>
      </div>

      {/* Sound Selection */}
      <div className="settings-section">
        <h3>🎵 {t('settingsSound')}</h3>
        <SoundSelector
          selectedSound={localSettings.soundFile}
          onSelect={(sound) => handleChange('soundFile', sound)}
        />
      </div>

      {/* Save Button */}
      <div className="settings-actions">
        <button className="btn btn-primary" onClick={handleSave}>
          {saved ? `✓ ${t('settingsSaved')}` : t('settingsSave')}
        </button>
      </div>
    </div>
  );
}
