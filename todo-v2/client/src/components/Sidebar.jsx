import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="flex flex-col border-r border-gray-200 min-h-screen w-48 p-4">
      <NavLink
        end
        to="/layout/dashboard"
        className={({ isActive }) =>
          `py-2 px-3 rounded hover:bg-purple-100 transition ${
            isActive ? 'bg-purple-200 font-semibold text-purple-900' : ''
          }`
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/layout/create"
        className={({ isActive }) =>
          `py-2 px-3 rounded hover:bg-purple-100 transition ${
            isActive ? 'bg-purple-200 font-semibold text-purple-900' : ''
          }`
        }
      >
        Create Todo
      </NavLink>
    </div>
  );
};

export default Sidebar;
