import React, { useLayoutEffect, useCallback, useState } from 'react';

const htmlDOMClassList = document.querySelector('html').classList;


const setThemeToLocal = (mode) => localStorage.setItem('themeMode', mode);

function useDarkmode() {
  const toggle = useCallback(() => {
    htmlDOMClassList.toggle('darkmode');
    htmlDOMClassList.value.match('darkmode') ? setThemeToLocal('dark') : setThemeToLocal('light');
  }, []);

  useLayoutEffect(() => {
    const mode = localStorage.getItem('themeMode') || '';

    if (mode === '') {
      const darkModeMediaQuery = matchMedia('(prefers-color-scheme: dark)');
      if (darkModeMediaQuery.matches) {
        htmlDOMClassList.add('darkmode');
        setThemeToLocal('dark');
      }
      else {
        setThemeToLocal('light');
      }
    }
    else {
      mode === 'dark' && htmlDOMClassList.add('darkmode');
    }

    setTimeout(() => {
    // first time immediately, other times transition
      htmlDOMClassList.add('transition');
    });
  }, []);

  return { toggle };
}

export default () => {
  const [ theme, setTheme ] = useState(localStorage.getItem('themeMode') === 'light' ? 'Dark' : 'Light');
  const { toggle } = useDarkmode();
  const text = `Go ${theme}`;

  return (
    <button
      onClick={() => {
        toggle();
        setTheme((pre) => (pre === 'Light' ? 'Dark' : 'Light'));
      }}
      style={{
        'background': 'transparent',
        'cursor': 'pointer',
        'border-width': '1px 0',
        'margin': '5px 0',
      }}
    >
      {text}
    </button>
  );
};
