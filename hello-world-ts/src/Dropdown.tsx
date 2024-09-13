import React, { useState } from 'react';

interface DropdownProps {
  title: string;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown-container">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-button"
      >
        <span>{title}</span>
        <span>{isOpen ? '▼' : '►'}</span>
      </button>
      {isOpen && <div className="dropdown-content">{children}</div>}
    </div>
  );
};

export default Dropdown;