import React, { useState, useRef, useCallback } from 'react';

// 预设提示音列表
const PRESET_SOUNDS = [
  {
    id: 'bell',
    name: '清脆钟声',
    icon: '🔔',
    desc: '清脆悦耳，唤醒注意力',
    type: 'bell'
  },
  {
    id: 'wind-chime',
    name: '温柔风铃',
    icon: '🎐',
    desc: '轻柔舒缓，不打断思路',
    type: 'wind-chime'
  },
  {
    id: 'water-drop',
    name: '水滴声',
    icon: '💧',
    desc: '清灵自然，温和提醒',
    type: 'water-drop'
  },
  {
    id: 'wooden-fish',
    name: '木鱼声',
    icon: '🪵',
    desc: '平静专注，禅意十足',
    type: 'wooden-fish'
  },
  {
    id: 'bird',
    name: '鸟鸣声',
    icon: '🐦',
    desc: '自然清新，放松心情',
    type: 'bird'
  },
  {
    id: 'singing-bowl',
    name: '颂钵声',
    icon: '🎵',
    desc: '冥想级音效，深度专注',
    type: 'singing-bowl'
  }
];

// 使用 Web Audio API 生成预设音效
function playPresetSound(type) {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;

    switch (type) {
      case 'bell': {
        // 清脆钟声
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.3);
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
        osc.start(now);
        osc.stop(now + 0.8);

        // 泛音
        const osc2 = audioContext.createOscillator();
        const gain2 = audioContext.createGain();
        osc2.connect(gain2);
        gain2.connect(audioContext.destination);
        osc2.frequency.setValueAtTime(1200, now);
        osc2.frequency.exponentialRampToValueAtTime(900, now + 0.2);
        osc2.type = 'sine';
        gain2.gain.setValueAtTime(0.2, now);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc2.start(now);
        osc2.stop(now + 0.5);
        break;
      }

      case 'wind-chime': {
        // 温柔风铃 - 多个高频音符
        const freqs = [1200, 1500, 1800, 2100];
        freqs.forEach((freq, i) => {
          const osc = audioContext.createOscillator();
          const gain = audioContext.createGain();
          osc.connect(gain);
          gain.connect(audioContext.destination);
          osc.frequency.setValueAtTime(freq, now + i * 0.08);
          osc.type = 'sine';
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.15, now + i * 0.08 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.6);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.6);
        });
        break;
      }

      case 'water-drop': {
        // 水滴声 - 快速频率下扫
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.frequency.setValueAtTime(1500, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.15);
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
        break;
      }

      case 'wooden-fish': {
        // 木鱼声 - 短促的打击音
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);
        osc.type = 'triangle';
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
        break;
      }

      case 'bird': {
        // 鸟鸣声 - 频率调制
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const lfo = audioContext.createOscillator();
        const lfoGain = audioContext.createGain();

        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.frequency.setValueAtTime(2000, now);
        lfo.frequency.setValueAtTime(15, now);
        lfoGain.gain.setValueAtTime(500, now);
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

        lfo.start(now);
        osc.start(now);
        osc.stop(now + 0.4);
        lfo.stop(now + 0.4);
        break;
      }

      case 'singing-bowl': {
        // 颂钵声 - 多个低频泛音
        const fundamental = 220;
        const harmonics = [1, 2.76, 4.72, 6.83];
        const gains = [0.3, 0.15, 0.08, 0.04];

        harmonics.forEach((ratio, i) => {
          const osc = audioContext.createOscillator();
          const gain = audioContext.createGain();
          osc.connect(gain);
          gain.connect(audioContext.destination);
          osc.frequency.setValueAtTime(fundamental * ratio, now);
          osc.type = 'sine';
          gain.gain.setValueAtTime(gains[i], now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 2.0);
          osc.start(now);
          osc.stop(now + 2.0);
        });
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.warn('播放预设音效失败:', err);
  }
}

export default function SoundSelector({ selectedSound, onSelect }) {
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
      if (filePath) {
        onSelect(filePath);
      }
    }
  };

  return (
    <div className="sound-selector">
      <p style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '16px' }}>
        选择一个提示音，点击播放按钮试听
      </p>

      {/* 预设音效网格 */}
      <div className="sound-presets">
        {PRESET_SOUNDS.map(sound => (
          <div
            key={sound.id}
            className={`sound-preset ${selectedSound === sound.id ? 'active' : ''}`}
            onClick={() => onSelect(sound.id)}
          >
            {selectedSound === sound.id && (
              <div className="sound-preset-check">✓</div>
            )}
            <span className="sound-preset-icon">{sound.icon}</span>
            <span className="sound-preset-name">{sound.name}</span>
            <span className="sound-preset-desc">{sound.desc}</span>
            <button
              className={`sound-preset-play ${playingId === sound.id ? 'playing' : ''}`}
              onClick={(e) => handlePlay(e, sound)}
              title="试听"
            >
              {playingId === sound.id ? '🔊' : '▶'}
            </button>
          </div>
        ))}
      </div>

      {/* 自定义音效 */}
      <div className="custom-sound-section">
        <p style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '12px' }}>
          或者选择自定义音频文件
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={handleSelectCustom}>
            📁 选择本地音频
          </button>
          {selectedSound && !PRESET_SOUNDS.find(s => s.id === selectedSound) && (
            <span className="sound-name">
              {selectedSound.split(/[\\/]/).pop()}
            </span>
          )}
        </div>
        <p className="hint">支持 mp3、wav、ogg、m4a 格式</p>
      </div>
    </div>
  );
}

// 导出预设音效播放函数供其他组件使用
export { playPresetSound, PRESET_SOUNDS };
