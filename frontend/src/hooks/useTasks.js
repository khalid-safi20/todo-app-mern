import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask, 
  reorderTasks,
  clearTaskError 
} from '../redux/slices/taskSlice';
import toast from 'react-hot-toast';

export const useTasks = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    priority: 'all',
    search: '',
  });

  // Fetch tasks on component mount
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearTaskError());
    }
  }, [error, dispatch]);

  // Filter tasks based on current filters
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = 
      filters.status === 'all' ||
      (filters.status === 'completed' && task.completed) ||
      (filters.status === 'active' && !task.completed);
    
    const matchesCategory = 
      filters.category === 'all' || task.category === filters.category;
    
    const matchesPriority = 
      filters.priority === 'all' || task.priority === filters.priority;
    
    const matchesSearch = 
      task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      (task.description && 
        task.description.toLowerCase().includes(filters.search.toLowerCase()));
    
    return matchesStatus && matchesCategory && matchesPriority && matchesSearch;
  });

  // Add a new task
  const addTask = (taskData) => {
    dispatch(createTask(taskData));
  };

  // Update a task
  const editTask = (id, taskData) => {
    dispatch(updateTask({ id, taskData }));
  };

  // Remove a task
  const removeTask = (id) => {
    dispatch(deleteTask(id));
  };

  // Reorder tasks
  const reorderTaskList = (taskId, newIndex) => {
    dispatch(reorderTasks({ taskId, newIndex }));
  };

  // Toggle task completion status
  const toggleTaskCompletion = (id, completed) => {
    dispatch(updateTask({ id, taskData: { completed } }));
  };

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      status: 'all',
      category: 'all',
      priority: 'all',
      search: '',
    });
  };

  // Get task statistics
  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;
    
    const priorityCounts = {
      high: tasks.filter(task => task.priority === 'high').length,
      medium: tasks.filter(task => task.priority === 'medium').length,
      low: tasks.filter(task => task.priority === 'low').length,
    };
    
    const categoryCounts = {
      work: tasks.filter(task => task.category === 'work').length,
      personal: tasks.filter(task => task.category === 'personal').length,
      shopping: tasks.filter(task => task.category === 'shopping').length,
      health: tasks.filter(task => task.category === 'health').length,
      other: tasks.filter(task => task.category === 'other').length,
    };
    
    return {
      total,
      completed,
      active,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      priorityCounts,
      categoryCounts,
    };
  };

  return {
    tasks: filteredTasks,
    allTasks: tasks,
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
  };
};