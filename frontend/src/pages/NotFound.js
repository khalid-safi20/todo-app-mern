import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md px-4 mx-auto text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-100 rounded-full dark:bg-red-900/30">
            <ExclamationTriangleIcon className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
        </div>
        
        <h1 className="mb-4 text-6xl font-bold text-gray-900 dark:text-white">
          404
        </h1>
        
        <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
          Page Not Found
        </h2>
        
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link to="/">
          <Button variant="primary">
            Go to Homepage
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;