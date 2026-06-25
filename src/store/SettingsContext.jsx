import React, { createContext, useContext, useState, useEffect } from 'react';
import { THEMES, applyTheme } from './themes';
import { LANGUAGES, t } from './languages';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('zh');

  // 加载保存的设置
  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getSettings().then(saved => {
        if (saved) {
          if (saved.theme) setTheme(saved.theme);
          if (saved.lang) setLang(saved.lang);
        }
      });
    }
  }, []);

  // 应用主题
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // 切换主题
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  // 切换语言
  const changeLang = (newLang) => {
    setLang(newLang);
  };

  // 翻译函数
  const translate = (key) => t(lang, key);

  return (
    <SettingsContext.Provider value={{
      theme,
      lang,
      themes: THEMES,
      languages: LANGUAGES,
      changeTheme,
      changeLang,
      t: translate
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
