import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon, 
  HomeIcon, 
  ChartBarIcon, 
  UserCircleIcon, 
  ArrowLeftOnRectangleIcon 
} from '@heroicons/react/24/outline';
import { logout } from '../../redux/slices/authSlice';
import { toggleTheme } from '../../redux/slices/themeSlice';
import DarkModeToggle from './DarkModeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md dark:bg-gray-800">
      <div className="container px-4 py-3 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold text-primary-600 dark:text-primary-400"
          >
            <span>TaskFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden space-x-6 md:flex">
            <Link 
              to="/" 
              className="text-gray-700 transition-colors dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            >
              Home
            </Link>
            
            {isAuthenticated && (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 transition-colors dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className="text-gray-700 transition-colors dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Profile
                </Link>
              </>
            )}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <DarkModeToggle mode={mode} toggleTheme={handleThemeToggle} />

            {/* Auth buttons */}
            {isAuthenticated ? (
              <div className="items-center hidden space-x-4 md:flex">
                <span className="text-gray-700 dark:text-gray-300">
                  Welcome, {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 transition-colors dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="hidden space-x-4 md:flex">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 transition-colors dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 md:hidden dark:text-gray-300 focus:outline-none"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pb-4 mt-4 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={handleLinkClick}
                className="flex items-center space-x-2 text-gray-700 transition-colors dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <HomeIcon className="w-5 h-5" />
                <span>Home</span>
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={handleLinkClick}
                    className="flex items-center space-x-2 text-gray-700 transition-colors dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <ChartBarIcon className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/profile"
                    onClick={handleLinkClick}
                    className="flex items-center space-x-2 text-gray-700 transition-colors dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <UserCircleIcon className="w-5 h-5" />
                    <span>Profile</span>
                  </Link>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center mb-4 space-x-2 text-gray-700 dark:text-gray-300">
                      <UserCircleIcon className="w-5 h-5" />
                      <span>Welcome, {user?.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-gray-700 transition-colors dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col pt-4 space-y-4 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    to="/login"
                    onClick={handleLinkClick}
                    className="px-4 py-2 text-center text-gray-700 transition-colors dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={handleLinkClick}
                    className="px-4 py-2 text-center text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;