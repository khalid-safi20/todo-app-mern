const Task = require('../models/Task');

// @desc    Get all tasks for a user
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res, next) => {
  try {
    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Add user filter
    reqQuery.user = req.user.id;

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    let query = Task.find(JSON.parse(queryStr));

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('order');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Task.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const tasks = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: tasks.length,
      pagination,
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task not found with id of ${req.params.id}`,
      });
    }

    // Make sure user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: `Not authorized to access this task`,
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    // Get the count of tasks for this user to set the order
    const taskCount = await Task.countDocuments({ user: req.user.id });
    req.body.order = taskCount;

    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task not found with id of ${req.params.id}`,
      });
    }

    // Make sure user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: `Not authorized to update this task`,
      });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task not found with id of ${req.params.id}`,
      });
    }

    // Make sure user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: `Not authorized to delete this task`,
      });
    }

    await task.remove();

    // Update order for remaining tasks
    await Task.updateMany(
      { user: req.user.id, order: { $gt: task.order } },
      { $inc: { order: -1 } }
    );

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update task order
// @route   PUT /api/tasks/reorder
// @access  Private
exports.reorderTasks = async (req, res, next) => {
  try {
    const { taskId, newIndex } = req.body;

    // Find the task being moved
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task not found with id of ${taskId}`,
      });
    }

    // Make sure user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: `Not authorized to update this task`,
      });
    }

    const oldIndex = task.order;
    const userId = req.user.id;

    // If the task is being moved to a new position
    if (oldIndex !== newIndex) {
      // Get all tasks for this user
      const tasks = await Task.find({ user: userId }).sort('order');

      // Remove the task from its old position
      tasks.splice(oldIndex, 1);

      // Insert the task at the new position
      tasks.splice(newIndex, 0, task);

      // Update the order for all tasks
      const updatePromises = tasks.map((t, index) => {
        return Task.findByIdAndUpdate(t._id, { order: index });
      });

      await Promise.all(updatePromises);
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};