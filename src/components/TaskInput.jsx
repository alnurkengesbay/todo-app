import React, { useState, useEffect, useRef } from 'react';
import { FaStar, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TaskInput.css';

const TaskInput = ({ addTask }) => {
  const [text, setText] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCustomDate, setShowCustomDate] = useState(false);
  const dropdownRef = useRef(null);

  const handleAddTask = () => {
    if (!text.trim()) return;

    const newTask = {
      id: Date.now(),
      text,
      isImportant,
      dueDate,
      completed: false,
      createdAt: new Date(),
    };

    addTask(newTask);

    setText('');
    setIsImportant(false);
    setDueDate(null);
    setShowDropdown(false);
    setShowCustomDate(false);
  };

  const handleDateSelect = (option) => {
    const now = new Date();
    let date = null;
    if (option === 'today') date = now;
    else if (option === 'tomorrow') date = new Date(now.setDate(now.getDate() + 1));
    else if (option === 'nextweek') date = new Date(now.setDate(now.getDate() + 7));

    setDueDate(date);
    setShowDropdown(false);
    setShowCustomDate(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
        setShowCustomDate(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Что нужно сделать?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="buttons">
        <button
          className={`icon-btn ${isImportant ? 'active' : ''}`}
          onClick={() => setIsImportant(!isImportant)}
        >
          <FaStar />
        </button>

        <div className="dropdown" ref={dropdownRef}>
          <button
            className="icon-btn"
            onClick={() => {
              setShowDropdown(!showDropdown);
              setShowCustomDate(false);
            }}
          >
            <FaCalendarAlt />
          </button>

          {showDropdown && (
            <div className="dropdown-content">
              <div onClick={() => handleDateSelect('today')}>Сегодня</div>
              <div onClick={() => handleDateSelect('tomorrow')}>Завтра</div>
              <div onClick={() => handleDateSelect('nextweek')}>След. неделя</div>
              <div onClick={() => setShowCustomDate(true)}>Выбрать дату</div>

              {showCustomDate && (
                <DatePicker
                  selected={dueDate}
                  onChange={(date) => {
                    setDueDate(date);
                    setShowDropdown(false);
                    setShowCustomDate(false);
                  }}
                  inline
                />
              )}
            </div>
          )}
        </div>

        <button className="add-btn" onClick={handleAddTask}>
          Добавить
        </button>
      </div>
    </div>
  );
};

export default TaskInput;
