import { useState, useEffect, useRef, useCallback } from 'react';
import { playPresetSound, PRESET_SOUNDS } from '../components/SoundSelector';

export function useRandomSound(settings, isRunning) {
  const [nextSoundIn, setNextSoundIn] = useState(null);
  const timerRef = useRef(null);
  const countdownRef = useRef(null);
  const nextSoundTimeRef = useRef(null);

  // 计算随机间隔（毫秒）
  const getRandomInterval = useCallback(() => {
    const { minInterval, maxInterval, intervalUnit } = settings;
    const multiplier = intervalUnit === 'minutes' ? 60000 : 1000;
    const min = minInterval * multiplier;
    const max = maxInterval * multiplier;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }, [settings]);

  // 播放提示音
  const playSound = useCallback(() => {
    const soundId = settings.soundFile;

    if (soundId && PRESET_SOUNDS.find(s => s.id === soundId)) {
      // 播放预设音效
      const preset = PRESET_SOUNDS.find(s => s.id === soundId);
      playPresetSound(preset.type);
    } else if (soundId) {
      // 播放自定义音频文件
      try {
        const audio = new Audio(soundId);
        audio.volume = 0.7;
        audio.play().catch(err => {
          console.warn('播放自定义音频失败，使用默认提示音:', err);
          playPresetSound('bell');
        });
      } catch (err) {
        console.warn('音频播放错误:', err);
        playPresetSound('bell');
      }
    } else {
      // 默认使用钟声
      playPresetSound('bell');
    }
  }, [settings.soundFile]);

  // 安排下一次提示音
  const scheduleNext = useCallback(() => {
    const interval = getRandomInterval();
    nextSoundTimeRef.current = Date.now() + interval;
    setNextSoundIn(Math.ceil(interval / 1000));

    // 清除之前的定时器
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);

    // 设置提示音定时器
    timerRef.current = setTimeout(() => {
      playSound();
      // 继续安排下一次
      scheduleNext();
    }, interval);

    // 更新倒计时显示
    countdownRef.current = setInterval(() => {
      if (nextSoundTimeRef.current) {
        const remaining = Math.max(0, Math.ceil((nextSoundTimeRef.current - Date.now()) / 1000));
        setNextSoundIn(remaining);
        if (remaining <= 0) {
          clearInterval(countdownRef.current);
        }
      }
    }, 1000);
  }, [getRandomInterval, playSound]);

  // 开始/停止逻辑
  useEffect(() => {
    if (isRunning) {
      scheduleNext();
    } else {
      // 停止时清理
      if (timerRef.current) clearTimeout(timerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
      setNextSoundIn(null);
      nextSoundTimeRef.current = null;
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [isRunning]);

  return {
    nextSoundIn,
    triggerSound: playSound
  };
}
