import React from 'react';

export default function Statistics({ statistics }) {
  const totalMinutes = statistics.reduce((sum, s) => sum + s.duration, 0);
  const totalSessions = statistics.length;
  const totalHours = (totalMinutes / 60).toFixed(1);
  const avgDuration = totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0;

  const getLast7Days = () => {
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayData = statistics.filter(s => s.date === dateStr);
      const dayMinutes = dayData.reduce((sum, s) => sum + s.duration, 0);
      days.push({
        date: dateStr,
        label: `${date.getMonth() + 1}/${date.getDate()}`,
        weekday: dayNames[date.getDay()],
        minutes: dayMinutes,
        sessions: dayData.length
      });
    }
    return days;
  };

  const last7Days = getLast7Days();
  const maxMinutes = Math.max(...last7Days.map(d => d.minutes), 1);

  return (
    <div className="statistics-container">
      <h2>Statistics</h2>

      {/* Overview Cards */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-value">{totalHours}</div>
          <div className="stat-label">Total Hours</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalSessions}</div>
          <div className="stat-label">Sessions</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{avgDuration}</div>
          <div className="stat-label">Avg (min)</div>
        </div>
      </div>

      {/* 7-Day Chart */}
      <div className="stats-chart">
        <h3>📈 Last 7 Days</h3>
        <div className="bar-chart">
          {last7Days.map((day, index) => (
            <div key={index} className="bar-item">
              <div className="bar-wrapper">
                <div
                  className="bar"
                  style={{
                    height: day.minutes > 0 ? `${Math.max(6, (day.minutes / maxMinutes) * 100)}%` : '6px',
                    opacity: day.minutes > 0 ? 1 : 0.2
                  }}
                >
                  {day.minutes > 0 && (
                    <span className="bar-value">{day.minutes}m</span>
                  )}
                </div>
              </div>
              <div className="bar-label">
                <div>{day.weekday}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{day.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Records */}
      <div className="stats-history">
        <h3>📋 Recent Sessions</h3>
        {statistics.length === 0 ? (
          <div className="empty-hint">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎯</div>
            <div>No sessions yet</div>
            <div style={{ fontSize: '13px', marginTop: '8px', color: 'var(--text-muted)' }}>
              Start your first focus session!
            </div>
          </div>
        ) : (
          <div className="history-list">
            {statistics.slice(-10).reverse().map((record, index) => (
              <div key={index} className="history-item">
                <span className="history-date">📅 {record.date}</span>
                <span className="history-time">🕐 {record.time}</span>
                <span className="history-duration">{record.duration} min</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
