import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const { isLoggedIn } = useAppContext(); 

  return (
    <div className="bg-amber-300 w-full p-10 shadow-xl shadow-gray-600 flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-bold text-gray-600">Todo-APP</h1>
      </div>
      <div>
        {isLoggedIn ? (
          <Link to="/layout" className="text-lg font-semibold text-gray-700 hover:underline hover:text-white">
            Profile
          </Link>
        ) : (
          <Link to="/login" className="text-lg font-semibold text-gray-700 hover:underline hover:text-white">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
