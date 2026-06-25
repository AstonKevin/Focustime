import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Timer from './components/Timer';
import Todo from './components/Todo';
import Settings from './components/Settings';
import Statistics from './components/Statistics';
import { SettingsProvider, useSettings } from './store/SettingsContext';
import { TodoProvider } from './store/TodoContext';
import { useTimer } from './hooks/useTimer';
import { useRandomSound } from './hooks/useRandomSound';
import { useStatistics } from './hooks/useStatistics';

function AppContent() {
  const [currentView, setCurrentView] = useState('timer');
  const [viewClass, setViewClass] = useState('view-enter');
  const prevViewRef = useRef('timer');
  const { t, theme, lang, changeTheme, changeLang } = useSettings();
  const [settings, setSettings] = useState({
    focusDuration: 45,
    minInterval: 3,
    maxInterval: 8,
    intervalUnit: 'minutes',
    soundFile: null
  });

  const { timeLeft, isRunning, isPaused, start, pause, reset, completionCount } = useTimer(settings.focusDuration);
  const { nextSoundIn, triggerSound } = useRandomSound(settings, isRunning);
  const { statistics, addSession, todayStats } = useStatistics();

  useEffect(() => {
    if (completionCount > 0) {
      addSession(settings.focusDuration);
    }
  }, [completionCount]);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getSettings().then(saved => {
        if (saved) {
          if (saved.focusDuration) setSettings(prev => ({ ...prev, ...saved }));
        }
      });
    }
  }, []);

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    if (window.electronAPI) {
      window.electronAPI.saveSettings({
        ...newSettings,
        theme,
        lang
      });
    }
  };

  const handleViewChange = (view) => {
    if (view === prevViewRef.current) return;
    setViewClass('view-exit');
    setTimeout(() => {
      prevViewRef.current = view;
      setCurrentView(view);
      setViewClass('view-enter');
    }, 200);
  };

  return (
    <div className="app">
      {/* 动态背景 */}
      <div className="bg-orbs">
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
      </div>
      <div className="grid-bg"></div>

      <Header currentView={currentView} setCurrentView={handleViewChange} />

      <main className={`main-content ${viewClass}`}>
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

        {currentView === 'todo' && (
          <Todo />
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

export default function App() {
  return (
    <SettingsProvider>
      <TodoProvider>
        <AppContent />
      </TodoProvider>
    </SettingsProvider>
  );
}
