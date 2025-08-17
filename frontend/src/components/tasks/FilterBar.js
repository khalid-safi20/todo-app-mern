import React from 'react';
import { motion } from 'framer-motion';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

const FilterBar = ({ filters, updateFilters, resetFilters, taskCount }) => {
  const { status, category, priority, search } = filters;
  
  const hasActiveFilters = status !== 'all' || category !== 'all' || priority !== 'all' || search;
  
  const statusOptions = [
    { value: 'all', label: 'All Tasks' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];
  
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'health', label: 'Health' },
    { value: 'other', label: 'Other' },
  ];
  
  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 mb-6 bg-white rounded-lg shadow dark:bg-gray-800"
    >
      <div className="flex flex-col mb-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <FunnelIcon className="w-5 h-5 mr-2 text-gray-500" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Filter Tasks
          </h3>
          {hasActiveFilters && (
            <span className="px-2 py-1 ml-2 text-xs font-medium rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
              Active
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {taskCount} {taskCount === 1 ? 'task' : 'tasks'} found
          </span>
          
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="flex items-center ml-4"
            >
              <XMarkIcon className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Input
          type="text"
          id="search"
          name="search"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => updateFilters({ search: e.target.value })}
        />
        
        <Select
          id="status"
          name="status"
          value={status}
          onChange={(e) => updateFilters({ status: e.target.value })}
          options={statusOptions}
        />
        
        <Select
          id="category"
          name="category"
          value={category}
          onChange={(e) => updateFilters({ category: e.target.value })}
          options={categoryOptions}
        />
        
        <Select
          id="priority"
          name="priority"
          value={priority}
          onChange={(e) => updateFilters({ priority: e.target.value })}
          options={priorityOptions}
        />
      </div>
    </motion.div>
  );
};

export default FilterBar;