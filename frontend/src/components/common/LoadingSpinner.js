import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-primary-600"></div>
    </div>
  );
};

export default LoadingSpinner;