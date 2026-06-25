import React from 'react';

export default function Header({ currentView, setCurrentView }) {
  const tabs = [
    { id: 'timer', label: '专注计时', icon: '🎯' },
    { id: 'settings', label: '设置', icon: '⚙️' },
    { id: 'statistics', label: '统计', icon: '📊' }
  ];

  return (
    <header className="header">
      <div className="header-title">专注计时器</div>
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
