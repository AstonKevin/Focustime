// 多语言支持
export const LANGUAGES = {
  zh: {
    id: 'zh',
    name: '中文',
    icon: '🇨🇳',
    translations: {
      // 导航
      navFocus: '专注',
      navSettings: '设置',
      navStats: '统计',

      // 计时器
      timerReady: '准备中',
      timerFocusing: '专注中',
      timerPaused: '已暂停',
      timerStart: '开始专注',
      timerPause: '暂停',
      timerResume: '继续',
      timerReset: '重置',

      // 信息卡片
      infoInterval: '提示音区间',
      infoNextSound: '下次提示',
      infoToday: '今日专注',
      infoMin: '分钟',
      infoSessions: '次',

      // 设置页
      settingsTitle: '设置',
      settingsDuration: '专注时长',
      settingsDurationLabel: '时长（分钟）',
      settingsDurationUnit: '分钟',
      settingsInterval: '提示音间隔',
      settingsIntervalUnit: '单位',
      settingsIntervalUnitSec: '秒',
      settingsIntervalUnitMin: '分钟',
      settingsMinInterval: '最短间隔',
      settingsMaxInterval: '最长间隔',
      settingsSound: '提示音',
      settingsSoundHint: '选择提示音，点击播放试听',
      settingsCustomSound: '使用自定义音频',
      settingsChooseFile: '选择本地文件',
      settingsFileHint: '支持 mp3、wav、ogg、m4a 格式',
      settingsSave: '保存设置',
      settingsSaved: '已保存',

      // 主题和语言
      settingsTheme: '主题风格',
      settingsLanguage: '语言设置',

      // 主题名称
      themeDark: '暗黑',
      themeDarkDesc: '经典深色，护眼舒适',
      themeLight: '亮色',
      themeLightDesc: '清爽明亮，活力满满',
      themeCyber: '赛博朋克',
      themeCyberDesc: '霓虹闪烁，未来科技',
      themeForest: '森林',
      themeForestDesc: '自然绿意，放松身心',
      themeCoast: '海岸',
      themeCoastDesc: '蓝白相间，清新海风',
      themePink: '少女',
      themePinkDesc: '粉色浪漫，甜美可爱',
      themeOil: '油画',
      themeOilDesc: '浓郁色彩，艺术质感',

      // 统计页
      statsTitle: '统计',
      statsTotalHours: '总时长（小时）',
      statsSessions: '总次数',
      statsAvg: '平均时长（分钟）',
      statsLast7Days: '最近 7 天',
      statsRecent: '最近记录',
      statsEmpty: '暂无专注记录',
      statsEmptyHint: '开始你的第一次专注吧！',
      statsMin: '分钟',

      // 提示音名称
      soundBell: '清脆钟声',
      soundBellDesc: '清脆悦耳，唤醒注意力',
      soundChime: '温柔风铃',
      soundChimeDesc: '轻柔舒缓，不打断思路',
      soundDrop: '水滴声',
      soundDropDesc: '清灵自然，温和提醒',
      soundWood: '木鱼声',
      soundWoodDesc: '平静专注，禅意十足',
      soundBird: '鸟鸣声',
      soundBirdDesc: '自然清新，放松心情',
      soundBowl: '颂钵声',
      soundBowlDesc: '冥想级音效，深度专注',
    }
  },
  en: {
    id: 'en',
    name: 'English',
    icon: '🇺🇸',
    translations: {
      // Navigation
      navFocus: 'Focus',
      navSettings: 'Settings',
      navStats: 'Stats',

      // Timer
      timerReady: 'Ready',
      timerFocusing: 'Focusing',
      timerPaused: 'Paused',
      timerStart: 'Start Focus',
      timerPause: 'Pause',
      timerResume: 'Resume',
      timerReset: 'Reset',

      // Info cards
      infoInterval: 'Interval',
      infoNextSound: 'Next Sound',
      infoToday: 'Today',
      infoMin: 'min',
      infoSessions: 'sessions',

      // Settings
      settingsTitle: 'Settings',
      settingsDuration: 'Focus Duration',
      settingsDurationLabel: 'Duration (minutes)',
      settingsDurationUnit: 'min',
      settingsInterval: 'Sound Interval',
      settingsIntervalUnit: 'Unit',
      settingsIntervalUnitSec: 'sec',
      settingsIntervalUnitMin: 'min',
      settingsMinInterval: 'Min Interval',
      settingsMaxInterval: 'Max Interval',
      settingsSound: 'Notification Sound',
      settingsSoundHint: 'Choose a notification sound. Click play to preview.',
      settingsCustomSound: 'Or use your own audio file',
      settingsChooseFile: 'Choose Local File',
      settingsFileHint: 'Supports mp3, wav, ogg, m4a formats',
      settingsSave: 'Save Settings',
      settingsSaved: 'Saved',

      // Theme & Language
      settingsTheme: 'Theme',
      settingsLanguage: 'Language',

      // Theme names
      themeDark: 'Dark',
      themeDarkDesc: 'Classic dark, easy on eyes',
      themeLight: 'Light',
      themeLightDesc: 'Fresh and bright',
      themeCyber: 'Cyberpunk',
      themeCyberDesc: 'Neon glow, futuristic',
      themeForest: 'Forest',
      themeForestDesc: 'Natural green, relaxing',
      themeCoast: 'Coast',
      themeCoastDesc: 'Blue & white, sea breeze',
      themePink: 'Pink',
      themePinkDesc: 'Sweet and lovely',
      themeOil: 'Oil Painting',
      themeOilDesc: 'Rich colors, artistic',

      // Stats
      statsTitle: 'Statistics',
      statsTotalHours: 'Total Hours',
      statsSessions: 'Sessions',
      statsAvg: 'Avg (min)',
      statsLast7Days: 'Last 7 Days',
      statsRecent: 'Recent Sessions',
      statsEmpty: 'No sessions yet',
      statsEmptyHint: 'Start your first focus session!',
      statsMin: 'min',

      // Sound names
      soundBell: 'Clear Bell',
      soundBellDesc: 'Crisp and clear, wakes attention',
      soundChime: 'Wind Chime',
      soundChimeDesc: 'Gentle and soothing',
      soundDrop: 'Water Drop',
      soundDropDesc: 'Natural and refreshing',
      soundWood: 'Wooden Fish',
      soundWoodDesc: 'Calm and zen-like',
      soundBird: 'Bird Chirp',
      soundBirdDesc: 'Fresh and natural',
      soundBowl: 'Singing Bowl',
      soundBowlDesc: 'Meditation-grade, deep focus',
    }
  },
  ja: {
    id: 'ja',
    name: '日本語',
    icon: '🇯🇵',
    translations: {
      // Navigation
      navFocus: '集中',
      navSettings: '設定',
      navStats: '統計',

      // Timer
      timerReady: '準備中',
      timerFocusing: '集中中',
      timerPaused: '一時停止',
      timerStart: '開始',
      timerPause: '一時停止',
      timerResume: '再開',
      timerReset: 'リセット',

      // Info cards
      infoInterval: '間隔',
      infoNextSound: '次のお知らせ',
      infoToday: '今日',
      infoMin: '分',
      infoSessions: '回',

      // Settings
      settingsTitle: '設定',
      settingsDuration: '集中時間',
      settingsDurationLabel: '時間（分）',
      settingsDurationUnit: '分',
      settingsInterval: 'サウンド間隔',
      settingsIntervalUnit: '単位',
      settingsIntervalUnitSec: '秒',
      settingsIntervalUnitMin: '分',
      settingsMinInterval: '最小間隔',
      settingsMaxInterval: '最大間隔',
      settingsSound: '通知音',
      settingsSoundHint: '通知音を選んで、再生ボタンで試聴できます。',
      settingsCustomSound: '独自の音声ファイルを使用',
      settingsChooseFile: 'ファイルを選択',
      settingsFileHint: 'mp3、wav、ogg、m4aに対応',
      settingsSave: '保存',
      settingsSaved: '保存済み',

      // Theme & Language
      settingsTheme: 'テーマ',
      settingsLanguage: '言語',

      // Theme names
      themeDark: 'ダーク',
      themeDarkDesc: '定番のダーク、目に優しい',
      themeLight: 'ライト',
      themeLightDesc: '爽やかで明るい',
      themeCyber: 'サイバーパンク',
      themeCyberDesc: 'ネオン輝く、未来的',
      themeForest: 'フォレスト',
      themeForestDesc: '自然の緑、リラックス',
      themeCoast: 'コースト',
      themeCoastDesc: '青と白、海風',
      themePink: 'ピンク',
      themePinkDesc: '甘くて可愛い',
      themeOil: '油絵',
      themeOilDesc: '豊かな色彩、芸術的',

      // Stats
      statsTitle: '統計',
      statsTotalHours: '合計時間',
      statsSessions: '回数',
      statsAvg: '平均（分）',
      statsLast7Days: '過去7日',
      statsRecent: '最近の記録',
      statsEmpty: '記録なし',
      statsEmptyHint: '最初の集中セッションを始めましょう！',
      statsMin: '分',

      // Sound names
      soundBell: 'クリアベル',
      soundBellDesc: '澄んだ音色で注意を喚起',
      soundChime: 'チャイム',
      soundChimeDesc: '優しく穏やかな音',
      soundDrop: '水滴',
      soundDropDesc: '自然でリフレッシュ',
      soundWood: '木魚',
      soundWoodDesc: '静かで禅のような',
      soundBird: '鳥のさえずり',
      soundBirdDesc: '自然で清新',
      soundBowl: 'シンギングボウル',
      soundBowlDesc: '瞑想レベルの深い集中',
    }
  }
};

// 获取翻译文本
export function t(lang, key) {
  const language = LANGUAGES[lang];
  if (!language) return key;
  return language.translations[key] || key;
}
