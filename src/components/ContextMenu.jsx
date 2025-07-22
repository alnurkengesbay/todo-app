import React from 'react';
import './ContextMenu.css';

const ContextMenu = ({ x, y, onClose, onDelete, onToggleImportant }) => {
  return (
    <div className="context-menu" style={{ top: y, left: x }}>
      <div onClick={onDelete}>Удалить</div>
      <div onClick={onToggleImportant}>Сделать важным</div>
      <div onClick={onClose}>Отмена</div>
    </div>
  );
};

export default ContextMenu;
