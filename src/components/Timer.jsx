import React from 'react';
import { useSettings } from '../store/SettingsContext';
import { THEMES } from '../store/themes';

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function formatNextSound(seconds) {
  if (seconds === null || seconds === undefined) return '--:--';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins > 0) {
    return `${mins}m ${secs.toString().padStart(2, '0')}s`;
  }
  return `${secs}s`;
}

export default function Timer({
  timeLeft,
  isRunning,
  isPaused,
  onStart,
  onPause,
  onReset,
  nextSoundIn,
  settings,
  todayStats
}) {
  const { t, theme } = useSettings();
  const currentTheme = THEMES[theme];
  const timerEffect = currentTheme?.timerEffect || 'glow';
  const totalSeconds = settings.focusDuration * 60;
  const progress = totalSeconds > 0
    ? ((totalSeconds - timeLeft) / totalSeconds) * 100
    : 0;

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <div className="timer-container">
      <div className={`timer-display timer-effect-${timerEffect} ${isRunning && !isPaused ? 'running' : ''}`}>
        <svg className="timer-ring" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="50%" stopColor="var(--accent-light)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
          </defs>
          <circle className="timer-ring-bg" cx="100" cy="100" r="90" />
          <circle
            className="timer-ring-progress"
            cx="100"
            cy="100"
            r="90"
            stroke="url(#timerGradient)"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="timer-face">
          <div className={`timer-time ${isRunning && !isPaused ? 'timer-pulse' : ''}`}>
            {formatTime(timeLeft)}
          </div>
          <div className="timer-label">
            {isRunning ? (isPaused ? t('timerPaused') : t('timerFocusing')) : t('timerReady')}
          </div>
        </div>
      </div>

      <div className="timer-controls">
        {!isRunning ? (
          <button className="btn btn-primary btn-large" onClick={onStart}>
            ▶ {t('timerStart')}
          </button>
        ) : (
          <>
            <button className="btn btn-secondary" onClick={onPause}>
              {isPaused ? <><span>▶</span> {t('timerResume')}</> : <><span>⏸</span> {t('timerPause')}</>}
            </button>
            <button className="btn btn-outline" onClick={onReset}>
              <span>↺</span> {t('timerReset')}
            </button>
          </>
        )}
      </div>

      <div className="sound-info">
        <div className="info-card">
          <span className="info-label">{t('infoInterval')}</span>
          <span className="info-value">
            {settings.intervalUnit === 'minutes'
              ? `${settings.minInterval}-${settings.maxInterval} ${t('settingsIntervalUnitMin')}`
              : `${settings.minInterval}-${settings.maxInterval} ${t('settingsIntervalUnitSec')}`}
          </span>
        </div>
        <div className="info-card">
          <span className="info-label">{t('infoNextSound')}</span>
          <span className="info-value">
            {isRunning ? formatNextSound(nextSoundIn) : '--:--'}
          </span>
        </div>
      </div>

      <div className="today-stats">
        <span>{t('infoToday')}</span>
        <span className="stat-highlight">{todayStats.totalMinutes}</span>
        <span>{t('infoMin')}</span>
        <span style={{ color: 'var(--text-muted)' }}>|</span>
        <span className="stat-highlight">{todayStats.sessionCount}</span>
        <span>{t('infoSessions')}</span>
      </div>
    </div>
  );
}
