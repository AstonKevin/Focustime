import React from 'react';
import { useSettings } from '../store/SettingsContext';

export default function Header({ currentView, setCurrentView }) {
  const { t } = useSettings();

  const tabs = [
    { id: 'timer', label: t('navFocus'), icon: '🎯' },
    { id: 'settings', label: t('navSettings'), icon: '⚙️' },
    { id: 'statistics', label: t('navStats'), icon: '📊' }
  ];

  return (
    <header className="header">
      <div className="header-title">
        <span className="logo-icon">⚡</span>
        FocusPing
      </div>
      <nav className="header-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-btn ${currentView === tab.id ? 'active' : ''}`}
            onClick={() => setCurrentView(tab.id)}
          >
            <span className="nav-icon">{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}
