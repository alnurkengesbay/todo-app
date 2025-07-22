import React from 'react';
import { FaSun, FaStar, FaCalendar } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ selected, onSelect, isOpen }) => {
  const items = [
    { id: 'today', label: 'Мой день', icon: <FaSun /> },
    { id: 'important', label: 'Важно', icon: <FaStar /> },
    { id: 'planned', label: 'Запланировано', icon: <FaCalendar /> },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <h2 className="logo">ToDo Pro</h2>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className={selected === item.id ? 'active' : ''}
            onClick={() => onSelect(item.id)}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;

