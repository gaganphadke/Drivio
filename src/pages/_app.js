import '../styles/globals.css';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // On initial load, check localStorage for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.classList.add(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <>
      <Component {...pageProps} toggleTheme={toggleTheme} />
    </>
  );
}

export default MyApp;
