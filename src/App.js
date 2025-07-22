import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import ContextMenu from './components/ContextMenu';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('today');
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    taskId: null,
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const addTask = (task) => {
    setTasks((prev) => [task, ...prev]);
  };

  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (selectedCategory === 'planned') return !!task.dueDate;
    if (selectedCategory === 'important') return task.isImportant;
    return true;
  });

  return (
    <div className="app">
      <button
        className="burger"
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        ☰
      </button>

      <Sidebar
        selected={selectedCategory}
        onSelect={(cat) => {
          setSelectedCategory(cat);
          setSidebarOpen(false);
        }}
        isOpen={sidebarOpen}
      />

      <main className="main">
        <TaskInput addTask={addTask} />
        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggleComplete}
          selected={selectedCategory}
          setTasks={setTasks}
          setContextMenu={setContextMenu}
        />
        {contextMenu.visible && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onDelete={() => {
              setTasks((prev) =>
                prev.filter((t) => t.id !== contextMenu.taskId)
              );
              setContextMenu({ ...contextMenu, visible: false });
            }}
            onToggleImportant={() => {
              setTasks((prev) =>
                prev.map((t) =>
                  t.id === contextMenu.taskId
                    ? { ...t, isImportant: !t.isImportant }
                    : t
                )
              );
              setContextMenu({ ...contextMenu, visible: false });
            }}
            onClose={() =>
              setContextMenu({ ...contextMenu, visible: false })
            }
          />
        )}
      </main>
    </div>
  );
}

export default App;
