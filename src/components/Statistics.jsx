import React from 'react';

export default function Statistics({ statistics }) {
  // 计算总统计
  const totalMinutes = statistics.reduce((sum, s) => sum + s.duration, 0);
  const totalSessions = statistics.length;
  const totalHours = (totalMinutes / 60).toFixed(1);
  const avgDuration = totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0;

  // 最近7天数据
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayData = statistics.filter(s => s.date === dateStr);
      const dayMinutes = dayData.reduce((sum, s) => sum + s.duration, 0);
      days.push({
        date: dateStr,
        label: `${date.getMonth() + 1}/${date.getDate()}`,
        weekday: ['日', '一', '二', '三', '四', '五', '六'][date.getDay()],
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
      <h2>专注统计</h2>

      {/* 总览卡片 */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-value">{totalHours}</div>
          <div className="stat-label">总时长（小时）</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalSessions}</div>
          <div className="stat-label">总次数</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{avgDuration}</div>
          <div className="stat-label">平均时长（分钟）</div>
        </div>
      </div>

      {/* 最近7天图表 */}
      <div className="stats-chart">
        <h3>📈 最近7天</h3>
        <div className="bar-chart">
          {last7Days.map((day, index) => (
            <div key={index} className="bar-item">
              <div className="bar-wrapper">
                <div
                  className="bar"
                  style={{
                    height: day.minutes > 0 ? `${Math.max(8, (day.minutes / maxMinutes) * 100)}%` : '8px',
                    opacity: day.minutes > 0 ? 1 : 0.3
                  }}
                >
                  {day.minutes > 0 && (
                    <span className="bar-value">{day.minutes}分</span>
                  )}
                </div>
              </div>
              <div className="bar-label">
                <div>{day.weekday}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-lighter)' }}>{day.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 最近记录 */}
      <div className="stats-history">
        <h3>📋 最近记录</h3>
        {statistics.length === 0 ? (
          <div className="empty-hint">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎯</div>
            <div>暂无专注记录</div>
            <div style={{ fontSize: '13px', marginTop: '8px' }}>开始你的第一次专注吧！</div>
          </div>
        ) : (
          <div className="history-list">
            {statistics.slice(-10).reverse().map((record, index) => (
              <div key={index} className="history-item">
                <span className="history-date">📅 {record.date}</span>
                <span className="history-time">🕐 {record.time}</span>
                <span className="history-duration">{record.duration}分钟</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
