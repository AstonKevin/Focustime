import React from 'react';

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
    return `${mins}分${secs.toString().padStart(2, '0')}秒`;
  }
  return `${secs}秒`;
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
  const totalSeconds = settings.focusDuration * 60;
  const progress = totalSeconds > 0
    ? ((totalSeconds - timeLeft) / totalSeconds) * 100
    : 0;

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <div className="timer-container">
      {/* 计时器显示 */}
      <div className={`timer-display ${isRunning && !isPaused ? 'timer-pulse' : ''}`}>
        <svg className="timer-ring" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <circle
            className="timer-ring-bg"
            cx="100"
            cy="100"
            r="90"
            fill="none"
            strokeWidth="6"
          />
          <circle
            className="timer-ring-progress"
            cx="100"
            cy="100"
            r="90"
            fill="none"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="timer-time">{formatTime(timeLeft)}</div>
        <div className="timer-label">
          {isRunning ? (isPaused ? '已暂停' : '专注中...') : '准备开始'}
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="timer-controls">
        {!isRunning ? (
          <button className="btn btn-primary btn-large" onClick={onStart}>
            <span>▶</span> 开始专注
          </button>
        ) : (
          <>
            <button className="btn btn-secondary" onClick={onPause}>
              {isPaused ? <><span>▶</span> 继续</> : <><span>⏸</span> 暂停</>}
            </button>
            <button className="btn btn-outline" onClick={onReset}>
              <span>↺</span> 重置
            </button>
          </>
        )}
      </div>

      {/* 提示音信息 */}
      <div className="sound-info">
        <div className="info-card">
          <span className="info-label">提示音区间</span>
          <span className="info-value">
            {settings.intervalUnit === 'minutes'
              ? `${settings.minInterval}-${settings.maxInterval}分钟`
              : `${settings.minInterval}-${settings.maxInterval}秒`}
          </span>
        </div>
        <div className="info-card">
          <span className="info-label">下次提示</span>
          <span className="info-value">
            {isRunning ? formatNextSound(nextSoundIn) : '--:--'}
          </span>
        </div>
      </div>

      {/* 今日统计 */}
      <div className="today-stats">
        <span>今日专注</span>
        <span className="stat-highlight">{todayStats.totalMinutes}</span>
        <span>分钟</span>
        <span style={{ color: 'var(--text-lighter)' }}>|</span>
        <span className="stat-highlight">{todayStats.sessionCount}</span>
        <span>次</span>
      </div>
    </div>
  );
}
