import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import toast from 'react-hot-toast';

const API_URL = process.env.REACT_APP_API_URL || '/api';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  error: null,
};

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setAuthToken(response.data.token);
        toast.success('Registration successful!');
      }
      
      return response.data;
    } catch (error) {
      const message =
        error.response && error.response.data.error
          ? error.response.data.error
          : 'An error occurred during registration';
      
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, userData);
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setAuthToken(response.data.token);
        toast.success('Login successful!');
      }
      
      return response.data;
    } catch (error) {
      const message =
        error.response && error.response.data.error
          ? error.response.data.error
          : 'An error occurred during login';
      
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Logout user
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setAuthToken();
      toast.success('You have been logged out');
      return true;
    } catch (error) {
      return rejectWithValue('Logout failed');
    }
  }
);

// Load user
export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const response = await axios.get(`${API_URL}/auth/me`);
      return response.data.data;
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setAuthToken();
      return rejectWithValue('Authentication failed');
    }
  }
);

// Update user details
export const updateDetails = createAsyncThunk(
  'auth/updateDetails',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/auth/updatedetails`, userData);
      
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
        toast.success('Profile updated successfully!');
      }
      
      return response.data.data;
    } catch (error) {
      const message =
        error.response && error.response.data.error
          ? error.response.data.error
          : 'Failed to update profile';
      
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Update password
export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/auth/updatepassword`, passwordData);
      
      if (response.data.success) {
        toast.success('Password updated successfully!');
      }
      
      return response.data;
    } catch (error) {
      const message =
        error.response && error.response.data.error
          ? error.response.data.error
          : 'Failed to update password';
      
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      // Load user
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      // Update details
      .addCase(updateDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update password
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;