import React, { createContext, useContext, useState, useEffect } from 'react';

const TodoContext = createContext();

export function useTodo() {
  return useContext(TodoContext);
}

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  // 从 electron-store 加载
  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getTodos().then(saved => {
        if (saved && Array.isArray(saved)) {
          setTodos(saved);
        }
      });
    }
  }, []);

  // 保存到 electron-store
  const saveTodos = (newTodos) => {
    setTodos(newTodos);
    if (window.electronAPI) {
      window.electronAPI.saveTodos(newTodos);
    }
  };

  // 添加待办
  const addTodo = (todo) => {
    const newTodo = {
      id: Date.now().toString(),
      text: todo.text,
      priority: todo.priority || 'medium', // low, medium, high
      timeType: todo.timeType || 'specific', // specific, range, relative
      timeValue: todo.timeValue, // 具体时间/时间段/相对天数
      completed: false,
      createdAt: new Date().toISOString()
    };
    saveTodos([...todos, newTodo]);
    return newTodo;
  };

  // 切换完成状态
  const toggleTodo = (id) => {
    saveTodos(todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  // 删除待办
  const deleteTodo = (id) => {
    saveTodos(todos.filter(t => t.id !== id));
  };

  // 编辑待办
  const updateTodo = (id, updates) => {
    saveTodos(todos.map(t =>
      t.id === id ? { ...t, ...updates } : t
    ));
  };

  // 获取格式化的时间显示
  const getTimeDisplay = (todo) => {
    if (!todo.timeValue) return '';

    switch (todo.timeType) {
      case 'specific': {
        // 具体时间: "14:30"
        const [hours, minutes] = todo.timeValue.split(':');
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
      }
      case 'range': {
        // 时间段: { start: "09:00", end: "17:00" }
        const { start, end } = todo.timeValue;
        return `${start} - ${end}`;
      }
      case 'relative': {
        // 相对天数
        const days = parseInt(todo.timeValue);
        if (days === 0) return '今天';
        if (days === 1) return '明天';
        if (days === 7) return '一周后';
        return `${days}天后`;
      }
      default:
        return '';
    }
  };

  // 检查是否过期
  const isOverdue = (todo) => {
    if (todo.completed) return false;
    const now = new Date();

    switch (todo.timeType) {
      case 'specific': {
        const [hours, minutes] = todo.timeValue.split(':');
        const today = new Date();
        today.setHours(parseInt(hours), parseInt(minutes), 0);
        return now > today;
      }
      case 'range': {
        const [endHours, endMinutes] = todo.timeValue.end.split(':');
        const today = new Date();
        today.setHours(parseInt(endHours), parseInt(endMinutes), 0);
        return now > today;
      }
      case 'relative': {
        // 相对时间不过期（基于创建时间）
        return false;
      }
      default:
        return false;
    }
  };

  // 按优先级排序
  const priorityOrder = { high: 0, medium: 1, low: 2 };

  const getSortedTodos = (filter = 'all') => {
    let filtered = [...todos];

    switch (filter) {
      case 'active':
        filtered = filtered.filter(t => !t.completed);
        break;
      case 'completed':
        filtered = filtered.filter(t => t.completed);
        break;
      case 'overdue':
        filtered = filtered.filter(t => isOverdue(t));
        break;
      default:
        break;
    }

    return filtered.sort((a, b) => {
      // 未完成的排在前面
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      // 按优先级排序
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };

  const value = {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    getTimeDisplay,
    isOverdue,
    getSortedTodos
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}
