import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from './TaskCard';
import LoadingSpinner from '../common/LoadingSpinner';

const TaskList = ({ 
  tasks, 
  loading, 
  onEdit, 
  onDelete, 
  onToggleComplete, 
  onReorder 
}) => {
  const [, setDraggingId] = useState(null);
  
  const handleDragStart = (start) => {
    setDraggingId(start.draggableId);
  };
  
  const handleDragEnd = (result) => {
    setDraggingId(null);
    
    // Dropped outside the list
    if (!result.destination) return;
    
    // No position change
    if (result.destination.index === result.source.index) return;
    
    // Reorder tasks
    onReorder(result.draggableId, result.destination.index);
  };
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-12 text-center"
      >
        <div className="mb-4 text-gray-400 dark:text-gray-500">
          <svg
            className="w-12 h-12 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
          No tasks found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Get started by creating a new task.
        </p>
      </motion.div>
    );
  }
  
  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            <AnimatePresence>
              {tasks.map((task, index) => (
                <Draggable
                  key={task._id}
                  draggableId={task._id}
                  index={index}
                  isDragDisabled={task.completed}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskCard
                        task={task}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onToggleComplete={onToggleComplete}
                        isDragging={snapshot.isDragging}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            </AnimatePresence>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;