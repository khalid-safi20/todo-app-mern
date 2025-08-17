import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import { useLocalStorage } from '../hooks/useLocalStorage';
import AddTaskForm from '../components/tasks/AddTaskForm';
import EditTaskForm from '../components/tasks/EditTaskForm';
import FilterBar from '../components/tasks/FilterBar';
import TaskList from '../components/tasks/TaskList';
import TaskStats from '../components/tasks/TaskStats';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const { user } = useAuth();
  const {
    tasks,
    allTasks,
    loading,
    filters,
    addTask,
    editTask,
    removeTask,
    reorderTaskList,
    toggleTaskCompletion,
    updateFilters,
    resetFilters,
    getTaskStats,
  } = useTasks();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [offlineTasks, setOfflineTasks] = useLocalStorage('offlineTasks', []);
  
  const stats = getTaskStats();
  
  const handleAddTask = (taskData) => {
    addTask(taskData);
    setShowAddForm(false);
  };
  
  const handleEditTask = (taskData) => {
    editTask(editingTask._id, taskData);
    setEditingTask(null);
  };
  
  const handleDeleteTask = (id) => {
    removeTask(id);
  };
  
  const handleReorder = (taskId, newIndex) => {
    reorderTaskList(taskId, newIndex);
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name}!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Here's what's happening with your tasks today.
          </p>
        </div>
        
        <Button
          onClick={() => setShowAddForm(true)}
          className="flex items-center"
        >
          <PlusIcon className="w-5 h-5 mr-1" />
          Add Task
        </Button>
      </div>
      
      {/* Stats Section */}
      <TaskStats stats={stats} />
      
      {/* Tasks Section */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your Tasks
          </h2>
        </div>
        
        <FilterBar
          filters={filters}
          updateFilters={updateFilters}
          resetFilters={resetFilters}
          taskCount={tasks.length}
        />
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <TaskList
            tasks={tasks}
            loading={loading}
            onEdit={setEditingTask}
            onDelete={handleDeleteTask}
            onToggleComplete={toggleTaskCompletion}
            onReorder={handleReorder}
          />
        )}
      </div>
      
      {/* Add Task Modal */}
      {showAddForm && (
        <AddTaskForm
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddTask}
        />
      )}
      
      {/* Edit Task Modal */}
      {editingTask && (
        <EditTaskForm
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSubmit={handleEditTask}
        />
      )}
    </div>
  );
};

export default Dashboard;