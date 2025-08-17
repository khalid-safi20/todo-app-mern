import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  ChartBarIcon, 
  UserCircleIcon 
} from '@heroicons/react/24/outline';
import Button from '../components/ui/Button';

const Home = () => {
  const features = [
    {
      icon: CheckCircleIcon,
      title: 'Task Management',
      description: 'Create, edit, and organize your tasks with ease.',
    },
    {
      icon: ClockIcon,
      title: 'Due Dates & Reminders',
      description: 'Set due dates and never miss an important task again.',
    },
    {
      icon: ChartBarIcon,
      title: 'Progress Tracking',
      description: 'Visualize your productivity with detailed statistics.',
    },
    {
      icon: UserCircleIcon,
      title: 'User Accounts',
      description: 'Securely store your tasks with user authentication.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex items-center flex-grow">
        <div className="container px-4 py-16 mx-auto md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 text-4xl font-extrabold text-gray-900 md:text-6xl dark:text-white"
            >
              Organize Your Life with
              <span className="text-primary-600 dark:text-primary-400"> TaskFlow</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-10 text-xl text-gray-600 dark:text-gray-300"
            >
              A modern, intuitive task manager that helps you stay productive and organized.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col justify-center gap-4 sm:flex-row"
            >
              <Link to="/signup">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 text-3xl font-bold text-gray-900 dark:text-white"
            >
              Everything You Need to Stay Productive
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-600 dark:text-gray-300"
            >
              TaskFlow provides all the tools you need to manage your tasks efficiently.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="p-6 text-center bg-white rounded-lg shadow-lg dark:bg-gray-900"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30">
                    <feature.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl p-8 mx-auto text-center text-white bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl md:p-12"
          >
            <h2 className="mb-4 text-3xl font-bold">
              Ready to Get Organized?
            </h2>
            <p className="mb-8 text-lg opacity-90">
              Join thousands of users who have improved their productivity with TaskFlow.
            </p>
            <Link to="/signup">
              <Button variant="secondary" size="lg">
                Create Your Account
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;