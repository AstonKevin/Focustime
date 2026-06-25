// 数据存储工具函数
// 实际存储通过 electron API 在主进程处理

export const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

export const formatTime = (date) => {
  return date.toTimeString().split(' ')[0].substring(0, 5);
};

export const calculateStats = (records) => {
  const totalMinutes = records.reduce((sum, r) => sum + r.duration, 0);
  const totalSessions = records.length;
  const avgDuration = totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0;

  return {
    totalMinutes,
    totalHours: (totalMinutes / 60).toFixed(1),
    totalSessions,
    avgDuration
  };
};
