import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Timer from './components/Timer';
import Settings from './components/Settings';
import Statistics from './components/Statistics';
import { useTimer } from './hooks/useTimer';
import { useRandomSound } from './hooks/useRandomSound';
import { useStatistics } from './hooks/useStatistics';

export default function App() {
  const [currentView, setCurrentView] = useState('timer'); // timer | settings | statistics
  const [settings, setSettings] = useState({
    focusDuration: 45,
    minInterval: 3,
    maxInterval: 8,
    intervalUnit: 'minutes',
    soundFile: null
  });

  // 自定义 Hooks
  const { timeLeft, isRunning, isPaused, start, pause, reset, completionCount } = useTimer(settings.focusDuration);
  const { nextSoundIn, triggerSound } = useRandomSound(settings, isRunning);
  const { statistics, addSession, todayStats } = useStatistics();

  // 计时完成时记录统计
  useEffect(() => {
    if (completionCount > 0) {
      addSession(settings.focusDuration);
    }
  }, [completionCount]);

  // 加载设置
  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getSettings().then(saved => {
        if (saved) setSettings(saved);
      });
    }
  }, []);

  // 保存设置
  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    if (window.electronAPI) {
      window.electronAPI.saveSettings(newSettings);
    }
  };

  return (
    <div className="app">
      <Header currentView={currentView} setCurrentView={setCurrentView} />

      <main className="main-content">
        {currentView === 'timer' && (
          <Timer
            timeLeft={timeLeft}
            isRunning={isRunning}
            isPaused={isPaused}
            onStart={start}
            onPause={pause}
            onReset={reset}
            nextSoundIn={nextSoundIn}
            settings={settings}
            todayStats={todayStats}
          />
        )}

        {currentView === 'settings' && (
          <Settings
            settings={settings}
            onSave={handleSaveSettings}
          />
        )}

        {currentView === 'statistics' && (
          <Statistics statistics={statistics} />
        )}
      </main>
    </div>
  );
}
