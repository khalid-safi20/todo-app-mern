import React from 'react';
import { motion } from 'framer-motion';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ConfirmationModal = ({ 
  isOpen, 
  title, 
  message, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel', 
  onConfirm, 
  onCancel,
  confirmButtonClass = 'bg-red-600 hover:bg-red-700'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-md bg-white rounded-lg shadow-xl dark:bg-gray-800"
      >
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full dark:bg-red-900/30">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {message}
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-6 space-x-4">
            <button
              type="button"
              className="px-4 py-2 text-gray-800 transition-colors bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={onCancel}
            >
              {cancelText}
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-white rounded-md transition-colors ${confirmButtonClass}`}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationModal;