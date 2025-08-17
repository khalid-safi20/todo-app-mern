import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PencilIcon, 
  TrashIcon, 
  CheckCircleIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';
import { 
  CheckCircleIcon as CheckCircleSolid, 
  ClockIcon as ClockSolid 
} from '@heroicons/react/24/solid';
import Button from '../ui/Button';
import ConfirmationModal from '../common/ConfirmationModal';
import { 
  formatDate, 
  isOverdue, 
  getPriorityColor, 
  getCategoryIcon 
} from '../../utils/helpers';

const TaskCard = ({ 
  task, 
  onEdit, 
  onDelete, 
  onToggleComplete, 
  isDragging 
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const handleDelete = () => {
    onDelete(task._id);
    setShowDeleteModal(false);
  };
  
  const priorityColors = {
    high: 'border-red-500',
    medium: 'border-yellow-500',
    low: 'border-green-500',
  };
  
  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border-l-4 ${priorityColors[task.priority]} ${
          isDragging ? 'opacity-50' : ''
        }`}
      >
        <div className="p-4">
          <div className="flex items-start">
            <button
              onClick={() => onToggleComplete(task._id, !task.completed)}
              className="flex-shrink-0 mt-1 mr-3"
              aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {task.completed ? (
                <CheckCircleSolid className="w-6 h-6 text-green-500" />
              ) : (
                <CheckCircleIcon className="w-6 h-6 text-gray-400 hover:text-green-500" />
              )}
            </button>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-medium truncate ${
                  task.completed 
                    ? 'line-through text-gray-500 dark:text-gray-400' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {task.title}
                </h3>
                
                <div className="flex ml-2 space-x-2">
                  <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                  <span className="text-lg">
                    {getCategoryIcon(task.category)}
                  </span>
                </div>
              </div>
              
              {task.description && (
                <p className={`mt-1 text-sm ${
                  task.completed 
                    ? 'text-gray-400 dark:text-gray-500' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {task.description}
                </p>
              )}
              
              {task.dueDate && (
                <div className="flex items-center mt-2 text-sm">
                  {isOverdue(task.dueDate) && !task.completed ? (
                    <ClockSolid className="w-4 h-4 mr-1 text-red-500" />
                  ) : (
                    <ClockIcon className="w-4 h-4 mr-1 text-gray-500" />
                  )}
                  <span className={isOverdue(task.dueDate) && !task.completed ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}>
                    {formatDate(task.dueDate)}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end mt-4 space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
            >
              <PencilIcon className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDeleteModal(true)}
              className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
            >
              <TrashIcon className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </motion.div>
      
      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
};

export default TaskCard;