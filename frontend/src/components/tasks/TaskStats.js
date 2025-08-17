import React from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
  FireIcon,
} from '@heroicons/react/24/outline';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const TaskStats = ({ stats }) => {
  const { total, completed, active, completionRate, priorityCounts, categoryCounts } = stats;
  
  // Priority bar chart data
  const priorityChartData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        label: 'Tasks by Priority',
        data: [priorityCounts.high, priorityCounts.medium, priorityCounts.low],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
        borderColor: [
          'rgb(239, 68, 68)',
          'rgb(245, 158, 11)',
          'rgb(16, 185, 129)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const priorityChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Tasks by Priority',
        color: '#1f2937',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          color: '#6b7280',
        },
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
        },
      },
      x: {
        ticks: {
          color: '#6b7280',
        },
        grid: {
          display: false,
        },
      },
    },
  };
  
  // Category pie chart data
  const categoryChartData = {
    labels: ['Work', 'Personal', 'Shopping', 'Health', 'Other'],
    datasets: [
      {
        data: [
          categoryCounts.work,
          categoryCounts.personal,
          categoryCounts.shopping,
          categoryCounts.health,
          categoryCounts.other,
        ],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(14, 165, 233, 0.8)',
          'rgba(107, 114, 128, 0.8)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(139, 92, 246)',
          'rgb(236, 72, 153)',
          'rgb(14, 165, 233)',
          'rgb(107, 114, 128)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const categoryChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#1f2937',
        },
      },
      title: {
        display: true,
        text: 'Tasks by Category',
        color: '#1f2937',
        font: {
          size: 16,
        },
      },
    },
  };
  
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="p-6 bg-white rounded-lg shadow dark:bg-gray-800"
        >
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900/30">
              <ChartBarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Tasks
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {total}
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="p-6 bg-white rounded-lg shadow dark:bg-gray-800"
        >
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full dark:bg-green-900/30">
              <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Completed
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {completed}
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="p-6 bg-white rounded-lg shadow dark:bg-gray-800"
        >
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full dark:bg-yellow-900/30">
              <ClockIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Active
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {active}
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="p-6 bg-white rounded-lg shadow dark:bg-gray-800"
        >
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full dark:bg-purple-900/30">
              <FireIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Completion Rate
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {completionRate}%
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="p-6 bg-white rounded-lg shadow dark:bg-gray-800"
        >
          <Bar data={priorityChartData} options={priorityChartOptions} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="p-6 bg-white rounded-lg shadow dark:bg-gray-800"
        >
          <Pie data={categoryChartData} options={categoryChartOptions} />
        </motion.div>
      </div>
    </div>
  );
};

export default TaskStats;