import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { register } from '../../redux/slices/authSlice';
import Input from '../ui/Input';
import Button from '../ui/Button';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  
  const { name, email, password, confirmPassword } = formData;
  
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (password && password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(register({ name, email, password }))
        .unwrap()
        .then(() => {
          navigate('/dashboard');
        });
    }
  };
  
  return (
    <div className="max-w-md mx-auto mt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Account</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Join us today</p>
        </div>
        
        <form onSubmit={onSubmit}>
          <Input
            type="text"
            id="name"
            name="name"
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChange={onChange}
            error={errors.name}
            required
          />
          
          <Input
            type="email"
            id="email"
            name="email"
            label="Email Address"
            placeholder="you@example.com"
            value={email}
            onChange={onChange}
            error={errors.email}
            required
          />
          
          <Input
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={onChange}
            error={errors.password}
            helperText="Must be at least 6 characters"
            required
          />
          
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={onChange}
            error={errors.confirmPassword}
            required
          />
          
          <div className="flex items-center mb-6">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
              required
            />
            <label htmlFor="terms" className="block ml-2 text-sm text-gray-900 dark:text-gray-300">
              I agree to the{' '}
              <Link to="#" className="text-primary-600 hover:text-primary-500">
                Terms and Conditions
              </Link>
            </label>
          </div>
          
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;