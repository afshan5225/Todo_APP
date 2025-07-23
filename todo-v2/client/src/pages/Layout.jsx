import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Layout = () => {
  const { logout } = useAppContext();
  const navigate = useNavigate();

  return (
    <div>
      <div className="bg-amber-300 w-full p-10 shadow-xl shadow-gray-600 flex justify-between items-center">
        <div>
          <button type='button' onClick={()=>navigate("/")} className="text-4xl font-bold text-gray-600 cursor-pointer">Profile</button>
        </div>
        <div>
          <button
            onClick={logout}
            className="text-lg font-semibold text-gray-700 hover:underline hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex flex-row">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
