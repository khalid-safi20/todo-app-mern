import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { formatDateForInput } from '../../utils/helpers';

const AddTaskForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    category: 'other',
  });
  
  const [errors, setErrors] = useState({});
  
  const { title, description, dueDate, priority, category } = formData;
  
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!title) newErrors.title = 'Title is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        dueDate: dueDate || null,
      });
    }
  };
  
  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];
  
  const categoryOptions = [
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'health', label: 'Health' },
    { value: 'other', label: 'Other' },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-lg shadow-xl dark:bg-gray-800"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Task</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              id="title"
              name="title"
              label="Task Title"
              placeholder="What needs to be done?"
              value={title}
              onChange={onChange}
              error={errors.title}
              required
            />
            
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                placeholder="Add details about your task..."
                value={description}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
              <Input
                type="date"
                id="dueDate"
                name="dueDate"
                label="Due Date (Optional)"
                value={dueDate}
                onChange={onChange}
              />
              
              <Select
                id="priority"
                name="priority"
                label="Priority"
                value={priority}
                onChange={onChange}
                options={priorityOptions}
              />
            </div>
            
            <Select
              id="category"
              name="category"
              label="Category"
              value={category}
              onChange={onChange}
              options={categoryOptions}
            />
            
            <div className="flex justify-end mt-6 space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
              >
                Add Task
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddTaskForm;