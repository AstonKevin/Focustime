import React from 'react';

export default function Header({ currentView, setCurrentView }) {
  const tabs = [
    { id: 'timer', label: 'Focus', icon: '🎯' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'statistics', label: 'Stats', icon: '📊' }
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
