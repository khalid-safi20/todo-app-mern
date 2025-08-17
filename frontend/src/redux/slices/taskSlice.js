import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = process.env.REACT_APP_API_URL || '/api';

// Get all tasks
export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      return response.data.data;
    } catch (error) {
      const message =
        error.response && error.response.data.error
          ? error.response.data.error
          : 'Failed to fetch tasks';
      return rejectWithValue(message);
    }
  }
);

// Create a new task
export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, taskData);
      toast.success('Task created successfully!');
      return response.data.data;
    } catch (error) {
      const message =
        error.response && error.response.data.error
          ? error.response.data.error
          : 'Failed to create task';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Update a task
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, taskData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, taskData);
      toast.success('Task updated successfully!');
      return response.data.data;
    } catch (error) {
      const message =
        error.response && error.response.data.error
          ? error.response.data.error
          : 'Failed to update task';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Delete a task
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      toast.success('Task deleted successfully!');
      return id;
    } catch (error) {
      const message =
        error.response && error.response.data.error
          ? error.response.data.error
          : 'Failed to delete task';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Reorder tasks
export const reorderTasks = createAsyncThunk(
  'tasks/reorderTasks',
  async ({ taskId, newIndex }, { rejectWithValue }) => {
    try {
      await axios.put(`${API_URL}/tasks/reorder`, { taskId, newIndex });
      return { taskId, newIndex };
    } catch (error) {
      const message =
        error.response && error.response.data.error
          ? error.response.data.error
          : 'Failed to reorder tasks';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearTaskError: (state) => {
      state.error = null;
    },
    // For offline/localStorage fallback
    addTaskOffline: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTaskOffline: (state, action) => {
      const { id, ...taskData } = action.payload;
      const index = state.tasks.findIndex((task) => task._id === id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...taskData };
      }
    },
    deleteTaskOffline: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
    reorderTasksOffline: (state, action) => {
      const { taskId, newIndex } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task._id === taskId);
      
      if (taskIndex !== -1) {
        const [movedTask] = state.tasks.splice(taskIndex, 1);
        state.tasks.splice(newIndex, 0, movedTask);
        
        // Update order property for each task
        state.tasks.forEach((task, index) => {
          task.order = index;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Get tasks
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reorder tasks
      .addCase(reorderTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(reorderTasks.fulfilled, (state, action) => {
        state.loading = false;
        // After reordering, we need to refresh the task list to get updated order values
        // This will be handled by a separate getTasks call in the component
      })
      .addCase(reorderTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearTaskError,
  addTaskOffline,
  updateTaskOffline,
  deleteTaskOffline,
  reorderTasksOffline,
} = taskSlice.actions;

export default taskSlice.reducer;