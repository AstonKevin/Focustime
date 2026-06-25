import React, { useState, useCallback } from 'react';
import { useSettings } from '../store/SettingsContext';

// 预设提示音列表（用翻译key）
const PRESET_SOUNDS = [
  { id: 'bell', type: 'bell', icon: '🔔', nameKey: 'soundBell', descKey: 'soundBellDesc' },
  { id: 'wind-chime', type: 'wind-chime', icon: '🎐', nameKey: 'soundChime', descKey: 'soundChimeDesc' },
  { id: 'water-drop', type: 'water-drop', icon: '💧', nameKey: 'soundDrop', descKey: 'soundDropDesc' },
  { id: 'wooden-fish', type: 'wooden-fish', icon: '🪵', nameKey: 'soundWood', descKey: 'soundWoodDesc' },
  { id: 'bird', type: 'bird', icon: '🐦', nameKey: 'soundBird', descKey: 'soundBirdDesc' },
  { id: 'singing-bowl', type: 'singing-bowl', icon: '🎵', nameKey: 'soundBowl', descKey: 'soundBowlDesc' }
];

// Web Audio API 音效
function playPresetSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;

    switch (type) {
      case 'bell': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.3);
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
        osc.start(now); osc.stop(now + 0.8);
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2); gain2.connect(ctx.destination);
        osc2.frequency.setValueAtTime(1200, now);
        osc2.frequency.exponentialRampToValueAtTime(900, now + 0.2);
        osc2.type = 'sine';
        gain2.gain.setValueAtTime(0.2, now);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc2.start(now); osc2.stop(now + 0.5);
        break;
      }
      case 'wind-chime': {
        [1200, 1500, 1800, 2100].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.frequency.setValueAtTime(freq, now + i * 0.08);
          osc.type = 'sine';
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.15, now + i * 0.08 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.6);
          osc.start(now + i * 0.08); osc.stop(now + i * 0.08 + 0.6);
        });
        break;
      }
      case 'water-drop': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(1500, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.15);
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now); osc.stop(now + 0.3);
        break;
      }
      case 'wooden-fish': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);
        osc.type = 'triangle';
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now); osc.stop(now + 0.15);
        break;
      }
      case 'bird': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.connect(lfoGain); lfoGain.connect(osc.frequency);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(2000, now);
        lfo.frequency.setValueAtTime(15, now);
        lfoGain.gain.setValueAtTime(500, now);
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        lfo.start(now); osc.start(now);
        osc.stop(now + 0.4); lfo.stop(now + 0.4);
        break;
      }
      case 'singing-bowl': {
        [1, 2.76, 4.72, 6.83].forEach((ratio, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.frequency.setValueAtTime(220 * ratio, now);
          osc.type = 'sine';
          gain.gain.setValueAtTime([0.3, 0.15, 0.08, 0.04][i], now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 2.0);
          osc.start(now); osc.stop(now + 2.0);
        });
        break;
      }
    }
  } catch (err) {
    console.warn('Sound play error:', err);
  }
}

export default function SoundSelector({ selectedSound, onSelect }) {
  const { t } = useSettings();
  const [playingId, setPlayingId] = useState(null);

  const handlePlay = useCallback((e, sound) => {
    e.stopPropagation();
    setPlayingId(sound.id);
    playPresetSound(sound.type);
    setTimeout(() => setPlayingId(null), 1000);
  }, []);

  const handleSelectCustom = async () => {
    if (window.electronAPI) {
      const filePath = await window.electronAPI.selectAudioFile();
      if (filePath) onSelect(filePath);
    }
  };

  return (
    <div className="sound-selector">
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
        {t('settingsSoundHint')}
      </p>

      <div className="sound-presets">
        {PRESET_SOUNDS.map(sound => (
          <div
            key={sound.id}
            className={`sound-preset ${selectedSound === sound.id ? 'active' : ''}`}
            onClick={() => onSelect(sound.id)}
          >
            {selectedSound === sound.id && <div className="sound-preset-check">✓</div>}
            <span className="sound-preset-icon">{sound.icon}</span>
            <span className="sound-preset-name">{t(sound.nameKey)}</span>
            <span className="sound-preset-desc">{t(sound.descKey)}</span>
            <button
              className={`sound-preset-play ${playingId === sound.id ? 'playing' : ''}`}
              onClick={(e) => handlePlay(e, sound)}
              title="Play"
            >
              {playingId === sound.id ? '🔊' : '▶'}
            </button>
          </div>
        ))}
      </div>

      <div className="custom-sound-section">
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          {t('settingsCustomSound')}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={handleSelectCustom}>
            📁 {t('settingsChooseFile')}
          </button>
          {selectedSound && !PRESET_SOUNDS.find(s => s.id === selectedSound) && (
            <span className="sound-name">{selectedSound.split(/[\\/]/).pop()}</span>
          )}
        </div>
        <p className="hint">{t('settingsFileHint')}</p>
      </div>
    </div>
  );
}

export { playPresetSound, PRESET_SOUNDS };
