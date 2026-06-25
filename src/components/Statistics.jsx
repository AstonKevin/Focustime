import React from 'react';
import { useSettings } from '../store/SettingsContext';

export default function Statistics({ statistics }) {
  const { t, lang } = useSettings();
  const totalMinutes = statistics.reduce((sum, s) => sum + s.duration, 0);
  const totalSessions = statistics.length;
  const totalHours = (totalMinutes / 60).toFixed(1);
  const avgDuration = totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0;

  const getLast7Days = () => {
    const days = [];
    const dayNames = {
      zh: ['日', '一', '二', '三', '四', '五', '六'],
      en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      ja: ['日', '月', '火', '水', '木', '金', '土']
    };
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayData = statistics.filter(s => s.date === dateStr);
      const dayMinutes = dayData.reduce((sum, s) => sum + s.duration, 0);
      days.push({
        date: dateStr,
        label: `${date.getMonth() + 1}/${date.getDate()}`,
        weekday: (dayNames[lang] || dayNames.en)[date.getDay()],
        minutes: dayMinutes
      });
    }
    return days;
  };

  const last7Days = getLast7Days();
  const maxMinutes = Math.max(...last7Days.map(d => d.minutes), 1);

  return (
    <div className="statistics-container">
      <h2>{t('statsTitle')}</h2>

      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-value">{totalHours}</div>
          <div className="stat-label">{t('statsTotalHours')}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalSessions}</div>
          <div className="stat-label">{t('statsSessions')}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{avgDuration}</div>
          <div className="stat-label">{t('statsAvg')}</div>
        </div>
      </div>

      <div className="stats-chart">
        <h3>📈 {t('statsLast7Days')}</h3>
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
                  {day.minutes > 0 && <span className="bar-value">{day.minutes}m</span>}
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

      <div className="stats-history">
        <h3>📋 {t('statsRecent')}</h3>
        {statistics.length === 0 ? (
          <div className="empty-hint">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎯</div>
            <div>{t('statsEmpty')}</div>
            <div style={{ fontSize: '13px', marginTop: '8px', color: 'var(--text-muted)' }}>
              {t('statsEmptyHint')}
            </div>
          </div>
        ) : (
          <div className="history-list">
            {statistics.slice(-10).reverse().map((record, index) => (
              <div key={index} className="history-item">
                <span className="history-date">📅 {record.date}</span>
                <span className="history-time">🕐 {record.time}</span>
                <span className="history-duration">{record.duration} {t('statsMin')}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
