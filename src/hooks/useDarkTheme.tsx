import { useEffect, useState } from 'react';

interface useDarkThemeProps {
  // eslint-disable-next-line no-unused-vars
  setDarkTheme: (arg0: boolean) => void;
  darkTheme: boolean;
}

const useDarkTheme = (): useDarkThemeProps => {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const localStorageValue = localStorage.getItem('@iamtheluiz-gantt-organon/theme') || null;
    const storedTheme: boolean | null = localStorageValue ? JSON.parse(localStorageValue) : null;

    if (storedTheme) {
      setDarkTheme(storedTheme);
    } else {
      localStorage.setItem('@iamtheluiz-gantt-organon/theme', JSON.stringify(darkTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('@iamtheluiz-gantt-organon/theme', JSON.stringify(darkTheme));
    document.body.setAttribute('class', darkTheme ? 'dark' : '');
  }, [darkTheme]);

  return {
    darkTheme,
    setDarkTheme,
  };
};

export default useDarkTheme;
