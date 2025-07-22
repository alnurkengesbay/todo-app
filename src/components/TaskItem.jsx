import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import './TaskItem.css';

const TaskItem = ({ task, onToggleComplete, onDelete, onRightClick }) => {
  return (
    <motion.div
      className={`task-item ${task.completed ? 'completed' : ''}`}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick(e, task.id);
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25 }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggleComplete}
      />

      <div className="content">
        <div className="text">{task.text}</div>
        <div className="meta">
          {task.isImportant && <FaStar className="star" />}
          {task.dueDate && (
            <span className="date">
              {format(new Date(task.dueDate), 'dd.MM.yyyy')}
            </span>
          )}
        </div>
      </div>

      <button className="delete-btn" onClick={onDelete}>
        <FaTrash />
      </button>
    </motion.div>
  );
};

export default TaskItem;
