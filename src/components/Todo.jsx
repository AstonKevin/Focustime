import React, { useState } from 'react';
import { useTodo } from '../store/TodoContext';
import { useSettings } from '../store/SettingsContext';

const PRIORITY_COLORS = {
  high: '#ff4757',
  medium: '#ffa502',
  low: '#2ed573'
};

const PRIORITY_ICONS = {
  high: '🔴',
  medium: '🟡',
  low: '🟢'
};

export default function Todo() {
  const { t } = useSettings();
  const {
    addTodo,
    toggleTodo,
    deleteTodo,
    getTimeDisplay,
    isOverdue,
    getSortedTodos
  } = useTodo();

  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState({
    text: '',
    priority: 'medium',
    timeType: 'specific',
    timeValue: '',
    rangeStart: '',
    rangeEnd: '',
    relativeDays: '1'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.text.trim()) return;

    let timeValue;
    switch (formData.timeType) {
      case 'specific':
        timeValue = formData.timeValue || '23:59';
        break;
      case 'range':
        timeValue = {
          start: formData.rangeStart || '09:00',
          end: formData.rangeEnd || '17:00'
        };
        break;
      case 'relative':
        timeValue = formData.relativeDays || '1';
        break;
      default:
        timeValue = null;
    }

    addTodo({
      text: formData.text,
      priority: formData.priority,
      timeType: formData.timeType,
      timeValue
    });

    setFormData({
      text: '',
      priority: 'medium',
      timeType: 'specific',
      timeValue: '',
      rangeStart: '',
      rangeEnd: '',
      relativeDays: '1'
    });
    setShowForm(false);
  };

  const todos = getSortedTodos(filter);

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h2>{t('todoTitle')}</h2>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕' : `+ ${t('todoAdd')}`}
        </button>
      </div>

      {/* 添加表单 */}
      {showForm && (
        <form className="todo-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              className="todo-input"
              placeholder={t('todoPlaceholder')}
              value={formData.text}
              onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
              autoFocus
            />
          </div>

          {/* 优先级选择 */}
          <div className="form-row">
            <label>{t('todoPriority')}:</label>
            <div className="priority-selector">
              {['low', 'medium', 'high'].map(p => (
                <button
                  key={p}
                  type="button"
                  className={`priority-btn ${formData.priority === p ? 'active' : ''}`}
                  style={{
                    '--priority-color': PRIORITY_COLORS[p],
                    borderColor: formData.priority === p ? PRIORITY_COLORS[p] : 'transparent'
                  }}
                  onClick={() => setFormData(prev => ({ ...prev, priority: p }))}
                >
                  {PRIORITY_ICONS[p]} {t(`todoPriority${p.charAt(0).toUpperCase() + p.slice(1)}`)}
                </button>
              ))}
            </div>
          </div>

          {/* 时间类型选择 */}
          <div className="form-row">
            <label>{t('todoTime')}:</label>
            <div className="time-type-selector">
              <button
                type="button"
                className={`time-type-btn ${formData.timeType === 'specific' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, timeType: 'specific' }))}
              >
                🕐 {t('todoTimeSpecific')}
              </button>
              <button
                type="button"
                className={`time-type-btn ${formData.timeType === 'range' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, timeType: 'range' }))}
              >
                ⏰ {t('todoTimeRange')}
              </button>
              <button
                type="button"
                className={`time-type-btn ${formData.timeType === 'relative' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, timeType: 'relative' }))}
              >
                📅 {t('todoTimeRelative')}
              </button>
            </div>
          </div>

          {/* 时间输入 */}
          <div className="form-row time-input-row">
            {formData.timeType === 'specific' && (
              <input
                type="time"
                className="time-input"
                value={formData.timeValue}
                onChange={(e) => setFormData(prev => ({ ...prev, timeValue: e.target.value }))}
              />
            )}

            {formData.timeType === 'range' && (
              <div className="time-range-inputs">
                <input
                  type="time"
                  className="time-input"
                  value={formData.rangeStart}
                  onChange={(e) => setFormData(prev => ({ ...prev, rangeStart: e.target.value }))}
                  placeholder={t('todoStart')}
                />
                <span className="time-separator">—</span>
                <input
                  type="time"
                  className="time-input"
                  value={formData.rangeEnd}
                  onChange={(e) => setFormData(prev => ({ ...prev, rangeEnd: e.target.value }))}
                  placeholder={t('todoEnd')}
                />
              </div>
            )}

            {formData.timeType === 'relative' && (
              <div className="relative-days-input">
                <select
                  className="days-select"
                  value={formData.relativeDays}
                  onChange={(e) => setFormData(prev => ({ ...prev, relativeDays: e.target.value }))}
                >
                  <option value="0">{t('todoToday')}</option>
                  <option value="1">{t('todoTomorrow')}</option>
                  <option value="2">2{t('todoDaysLater')}</option>
                  <option value="3">3{t('todoDaysLater')}</option>
                  <option value="5">5{t('todoDaysLater')}</option>
                  <option value="7">7{t('todoDaysLater')}</option>
                  <option value="14">14{t('todoDaysLater')}</option>
                  <option value="30">30{t('todoDaysLater')}</option>
                </select>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {t('todoSubmit')}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowForm(false)}
            >
              {t('todoCancel')}
            </button>
          </div>
        </form>
      )}

      {/* 筛选器 */}
      <div className="todo-filters">
        {['all', 'active', 'completed', 'overdue'].map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {t(`todoFilter${f.charAt(0).toUpperCase() + f.slice(1)}`)}
            {f === 'active' && (
              <span className="filter-count">
                {getSortedTodos('active').length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 待办列表 */}
      <div className="todo-list">
        {todos.length === 0 ? (
          <div className="todo-empty">
            <span className="empty-icon">📝</span>
            <p>{t('todoEmpty')}</p>
          </div>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''} ${isOverdue(todo) ? 'overdue' : ''}`}
            >
              <button
                className="todo-checkbox"
                onClick={() => toggleTodo(todo.id)}
                style={{
                  '--check-color': PRIORITY_COLORS[todo.priority]
                }}
              >
                {todo.completed ? '✓' : ''}
              </button>

              <div className="todo-content">
                <span className="todo-text">{todo.text}</span>
                <div className="todo-meta">
                  <span
                    className="todo-priority"
                    style={{ color: PRIORITY_COLORS[todo.priority] }}
                  >
                    {PRIORITY_ICONS[todo.priority]}
                    {t(`todoPriority${todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}`)}
                  </span>
                  {todo.timeValue && (
                    <span className="todo-time">
                      🕐 {getTimeDisplay(todo)}
                    </span>
                  )}
                  {isOverdue(todo) && (
                    <span className="todo-overdue-badge">
                      {t('todoOverdue')}
                    </span>
                  )}
                </div>
              </div>

              <button
                className="todo-delete"
                onClick={() => deleteTodo(todo.id)}
                title={t('todoDelete')}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
