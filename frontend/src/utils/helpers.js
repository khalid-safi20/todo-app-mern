// Format date for display
export const formatDate = (date) => {
  if (!date) return '';
  
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return new Date(date).toLocaleDateString(undefined, options);
};

// Format date for input (YYYY-MM-DD)
export const formatDateForInput = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

// Check if a date is overdue
export const isOverdue = (date) => {
  if (!date) return false;
  return new Date(date) < new Date();
};

// Get priority color
export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'text-red-500';
    case 'medium':
      return 'text-yellow-500';
    case 'low':
      return 'text-green-500';
    default:
      return 'text-gray-500';
  }
};

// Get category icon
export const getCategoryIcon = (category) => {
  switch (category) {
    case 'work':
      return '💼';
    case 'personal':
      return '👤';
    case 'shopping':
      return '🛒';
    case 'health':
      return '🏥';
    default:
      return '📌';
  }
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Generate a unique ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};