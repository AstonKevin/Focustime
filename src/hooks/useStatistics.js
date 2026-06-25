import { useState, useEffect, useCallback } from 'react';

export function useStatistics() {
  const [statistics, setStatistics] = useState([]);

  // 加载统计数据
  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getStatistics().then(data => {
        if (data && Array.isArray(data)) {
          setStatistics(data);
        }
      });
    }
  }, []);

  // 保存统计数据
  const saveStats = useCallback((newStats) => {
    setStatistics(newStats);
    if (window.electronAPI) {
      window.electronAPI.saveStatistics(newStats);
    }
  }, []);

  // 添加一次专注记录
  const addSession = useCallback((duration) => {
    const now = new Date();
    const record = {
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().split(' ')[0].substring(0, 5),
      duration: duration,
      timestamp: now.getTime()
    };
    const newStats = [...statistics, record];
    saveStats(newStats);
  }, [statistics, saveStats]);

  // 今日统计
  const getTodayStats = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayRecords = statistics.filter(s => s.date === today);
    return {
      totalMinutes: todayRecords.reduce((sum, s) => sum + s.duration, 0),
      sessionCount: todayRecords.length
    };
  }, [statistics]);

  return {
    statistics,
    addSession,
    todayStats: getTodayStats()
  };
}
