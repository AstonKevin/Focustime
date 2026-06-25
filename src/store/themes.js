// 四种内置主题
export const THEMES = {
  dark: {
    id: 'dark',
    name: '暗黑',
    nameEn: 'Dark',
    icon: '🌙',
    colors: {
      '--bg-primary': '#0a0a0f',
      '--bg-secondary': '#12121a',
      '--bg-card': '#1a1a2e',
      '--bg-card-hover': '#1f1f35',
      '--bg-glass': 'rgba(26, 26, 46, 0.8)',
      '--border': 'rgba(255, 255, 255, 0.06)',
      '--border-active': 'rgba(99, 102, 241, 0.5)',
      '--accent': '#6366f1',
      '--accent-light': '#818cf8',
      '--accent-glow': 'rgba(99, 102, 241, 0.3)',
      '--accent-gradient': 'linear-gradient(135deg, #6366f1 0%, #a78bfa 50%, #c084fc 100%)',
      '--text': '#e2e8f0',
      '--text-secondary': '#94a3b8',
      '--text-muted': '#64748b',
      '--shadow': '0 4px 24px rgba(0, 0, 0, 0.4)',
      '--shadow-glow': '0 0 30px rgba(99, 102, 241, 0.15)',
      '--orb1': '#6366f1',
      '--orb2': '#a78bfa',
      '--orb3': '#c084fc',
      '--grid-color': 'rgba(255, 255, 255, 0.02)',
    }
  },
  light: {
    id: 'light',
    name: '亮色',
    nameEn: 'Light',
    icon: '☀️',
    colors: {
      '--bg-primary': '#f8fafc',
      '--bg-secondary': '#ffffff',
      '--bg-card': '#ffffff',
      '--bg-card-hover': '#f1f5f9',
      '--bg-glass': 'rgba(255, 255, 255, 0.8)',
      '--border': 'rgba(0, 0, 0, 0.08)',
      '--border-active': 'rgba(99, 102, 241, 0.5)',
      '--accent': '#6366f1',
      '--accent-light': '#4f46e5',
      '--accent-glow': 'rgba(99, 102, 241, 0.15)',
      '--accent-gradient': 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
      '--text': '#1e293b',
      '--text-secondary': '#475569',
      '--text-muted': '#94a3b8',
      '--shadow': '0 4px 24px rgba(0, 0, 0, 0.08)',
      '--shadow-glow': '0 0 30px rgba(99, 102, 241, 0.1)',
      '--orb1': '#bfdbfe',
      '--orb2': '#c7d2fe',
      '--orb3': '#ddd6fe',
      '--grid-color': 'rgba(0, 0, 0, 0.03)',
    }
  },
  cyber: {
    id: 'cyber',
    name: '赛博朋克',
    nameEn: 'Cyberpunk',
    icon: '🌆',
    colors: {
      '--bg-primary': '#0d0221',
      '--bg-secondary': '#150535',
      '--bg-card': '#1a0a3e',
      '--bg-card-hover': '#220e52',
      '--bg-glass': 'rgba(26, 10, 62, 0.8)',
      '--border': 'rgba(0, 255, 255, 0.1)',
      '--border-active': 'rgba(0, 255, 255, 0.6)',
      '--accent': '#00ffff',
      '--accent-light': '#22d3ee',
      '--accent-glow': 'rgba(0, 255, 255, 0.3)',
      '--accent-gradient': 'linear-gradient(135deg, #00ffff 0%, #ff00ff 50%, #ffff00 100%)',
      '--text': '#e0f7fa',
      '--text-secondary': '#80deea',
      '--text-muted': '#4dd0e1',
      '--shadow': '0 4px 24px rgba(0, 255, 255, 0.15)',
      '--shadow-glow': '0 0 30px rgba(0, 255, 255, 0.2)',
      '--orb1': '#ff00ff',
      '--orb2': '#00ffff',
      '--orb3': '#ffff00',
      '--grid-color': 'rgba(0, 255, 255, 0.03)',
    }
  },
  forest: {
    id: 'forest',
    name: '森林',
    nameEn: 'Forest',
    icon: '🌲',
    colors: {
      '--bg-primary': '#0a1a0f',
      '--bg-secondary': '#0f2415',
      '--bg-card': '#142e1c',
      '--bg-card-hover': '#1a3a24',
      '--bg-glass': 'rgba(20, 46, 28, 0.8)',
      '--border': 'rgba(34, 197, 94, 0.1)',
      '--border-active': 'rgba(34, 197, 94, 0.5)',
      '--accent': '#22c55e',
      '--accent-light': '#4ade80',
      '--accent-glow': 'rgba(34, 197, 94, 0.3)',
      '--accent-gradient': 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)',
      '--text': '#dcfce7',
      '--text-secondary': '#86efac',
      '--text-muted': '#4ade80',
      '--shadow': '0 4px 24px rgba(34, 197, 94, 0.15)',
      '--shadow-glow': '0 0 30px rgba(34, 197, 94, 0.15)',
      '--orb1': '#22c55e',
      '--orb2': '#16a34a',
      '--orb3': '#4ade80',
      '--grid-color': 'rgba(34, 197, 94, 0.03)',
    }
  }
};

// 应用主题到CSS变量
export function applyTheme(themeId) {
  const theme = THEMES[themeId];
  if (!theme) return;
  const root = document.documentElement;
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}
