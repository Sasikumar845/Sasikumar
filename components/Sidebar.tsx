
import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from './icons/HomeIcon';
import InfoIcon from './icons/InfoIcon';

const Sidebar: React.FC = () => {
  const commonClasses = "flex items-center px-4 py-3 text-gray-300 rounded-lg transition-colors duration-200";
  const activeClass = "bg-gray-700 text-white";
  const inactiveClass = "hover:bg-gray-800 hover:text-white";

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 border-r border-gray-700 p-4 flex flex-col">
      <div className="flex items-center mb-8">
        <span className="text-2xl font-bold text-white tracking-wider">EmotionAI</span>
      </div>
      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) => `${commonClasses} ${isActive ? activeClass : inactiveClass}`}
        >
          <HomeIcon className="w-5 h-5 mr-3" />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => `${commonClasses} ${isActive ? activeClass : inactiveClass}`}
        >
          <InfoIcon className="w-5 h-5 mr-3" />
          <span>About</span>
        </NavLink>
      </nav>
      <div className="mt-auto text-center text-xs text-gray-500">
        <p>Powered by Gemini</p>
        <p>&copy; 2024</p>
      </div>
    </aside>
  );
};

export default Sidebar;
