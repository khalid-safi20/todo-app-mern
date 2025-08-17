// Theme utility functions
export const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    return savedTheme || (systemPrefersDark ? 'dark' : 'light');
  }
  
  return 'light';
};

export const applyTheme = (theme) => {
  if (typeof window !== 'undefined') {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('theme', theme);
  }
};