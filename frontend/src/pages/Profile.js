import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { 
  UserCircleIcon, 
  LockClosedIcon, 
  BellIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/outline';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { updateDetails, updatePassword } from '../redux/slices/authSlice';
import { setTheme, toggleTheme } from '../redux/slices/themeSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);
  const [loading, setLoading] = useState(false);
  
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState({});
  
  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };
  
  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };
  
  const validateProfileForm = () => {
    const newErrors = {};
    
    if (!profileForm.name) newErrors.name = 'Name is required';
    if (!profileForm.email) newErrors.email = 'Email is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordForm.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!passwordForm.newPassword) newErrors.newPassword = 'New password is required';
    if (passwordForm.newPassword.length < 6) newErrors.newPassword = 'Password must be at least 6 characters';
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    if (validateProfileForm()) {
      setLoading(true);
      try {
        await dispatch(updateDetails(profileForm)).unwrap();
      } finally {
        setLoading(false);
      }
    }
  };
  
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (validatePasswordForm()) {
      setLoading(true);
      try {
        await dispatch(updatePassword({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        })).unwrap();
        
        // Reset form
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } finally {
        setLoading(false);
      }
    }
  };
  
  const handleThemeChange = (theme) => {
    dispatch(setTheme(theme));
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        Your Profile
      </h1>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Profile Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="flex flex-col items-center">
              <div className="p-3 mb-4 rounded-full bg-primary-100 dark:bg-primary-900/30">
                <UserCircleIcon className="w-16 h-16 text-primary-600 dark:text-primary-400" />
              </div>
              
              <h2 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">
                {user?.name}
              </h2>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                {user?.email}
              </p>
              
              <div className="w-full space-y-4">
                <div className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <UserCircleIcon className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Member since {new Date(user?.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <BellIcon className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Email notifications enabled
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Theme Settings */}
          <div className="p-6 mt-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Theme Settings
            </h3>
            
            <div className="space-y-4">
              <button
                onClick={() => handleThemeChange('light')}
                className={`w-full flex items-center p-3 rounded-lg ${
                  mode === 'light'
                    ? 'bg-primary-100 dark:bg-primary-900/30 border border-primary-300 dark:border-primary-700'
                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                <SunIcon className="w-5 h-5 mr-3 text-yellow-500" />
                <span className="text-gray-700 dark:text-gray-300">Light Mode</span>
              </button>
              
              <button
                onClick={() => handleThemeChange('dark')}
                className={`w-full flex items-center p-3 rounded-lg ${
                  mode === 'dark'
                    ? 'bg-primary-100 dark:bg-primary-900/30 border border-primary-300 dark:border-primary-700'
                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                <MoonIcon className="w-5 h-5 mr-3 text-indigo-500" />
                <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8 lg:col-span-2"
        >
          {/* Profile Information */}
          <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="flex items-center mb-6">
              <UserCircleIcon className="w-6 h-6 mr-2 text-gray-500 dark:text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Profile Information
              </h2>
            </div>
            
            <form onSubmit={handleProfileSubmit}>
              <Input
                type="text"
                id="name"
                name="name"
                label="Full Name"
                value={profileForm.name}
                onChange={handleProfileChange}
                error={errors.name}
                required
              />
              
              <Input
                type="email"
                id="email"
                name="email"
                label="Email Address"
                value={profileForm.email}
                onChange={handleProfileChange}
                error={errors.email}
                required
              />
              
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>
          
          {/* Change Password */}
          <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="flex items-center mb-6">
              <LockClosedIcon className="w-6 h-6 mr-2 text-gray-500 dark:text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Change Password
              </h2>
            </div>
            
            <form onSubmit={handlePasswordSubmit}>
              <Input
                type="password"
                id="currentPassword"
                name="currentPassword"
                label="Current Password"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                error={errors.currentPassword}
                required
              />
              
              <Input
                type="password"
                id="newPassword"
                name="newPassword"
                label="New Password"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                error={errors.newPassword}
                helperText="Must be at least 6 characters"
                required
              />
              
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm New Password"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                error={errors.confirmPassword}
                required
              />
              
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;