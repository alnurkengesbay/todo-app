import React, { useState } from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';
import { AnimatePresence } from 'framer-motion';

function TaskList({ tasks, onToggle, selected, setTasks, setContextMenu  }) {
  const [showCompleted, setShowCompleted] = useState(false);

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);


  const handleClearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

    const handleDelete = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleRightClick = (e, taskId) => {
  setContextMenu({
    visible: true,
    x: e.pageX,
    y: e.pageY,
    taskId
  });
 };


  return (
    <div className="task-list">
      <AnimatePresence>
        {activeTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={() => onToggle(task.id)}
            onDelete={() => handleDelete(task.id)}
            onRightClick={handleRightClick}
          />
        ))}
      </AnimatePresence>

      {completedTasks.length > 0 && (
        <div className="completed-section">
          <button className="toggle-completed" onClick={() => setShowCompleted(!showCompleted)}>
            {showCompleted ? '▼' : '▶'} Завершённые ({completedTasks.length})
          </button>

          {showCompleted && (
            <>
              <AnimatePresence>
                {completedTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={() => onToggle(task.id)}
                    onDelete={() => handleDelete(task.id)}
                    onRightClick={handleRightClick}
                  />
                ))}
              </AnimatePresence>
              <button className="clear-btn" onClick={handleClearCompleted}>
                Очистить завершённые
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default TaskList;
