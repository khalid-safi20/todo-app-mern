import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const DarkModeToggle = ({ mode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-gray-700 transition-colors bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
      aria-label="Toggle dark mode"
    >
      {mode === 'light' ? (
        <MoonIcon className="w-5 h-5" />
      ) : (
        <SunIcon className="w-5 h-5" />
      )}
    </button>
  );
};

export default DarkModeToggle;