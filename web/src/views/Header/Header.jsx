import React from 'react';
import { MdOutlineNightlight, MdOutlineWbSunny } from "react-icons/md";
import { useTheme } from '../../hooks';
import { useSelector } from 'react-redux';
import UserHandler from '../../handler/UserHandler';

const Header = () => {
  const { darkMode, toggleTheme } = useTheme();
  const user = useSelector((state) => state.auth.user);
  const { logoutHandler } = UserHandler();

  return (
    <div
      className={`flex justify-between items-center px-5 py-6 ${
        darkMode ? "border-gray-800" : "border-b-2 border-gray-200"
      }`}
    >
      <div className="flex items-center h-full">
        <span className="text-2xl font-bold">Shopping Cart</span>
      </div>

      <div className="flex gap-4 items-center text-lg font-normal">
        <a href="/">
          <button>Home</button>
        </a>
        <a href="/products">
          <button>Products</button>
        </a>
        <a href="/cart">
          <button>Cart</button>
        </a>
        {user?._id ? (
          <button
            onClick={logoutHandler}
            className="bg-red-400 px-4 py-2 rounded-md text-sm text-white"
          >
            Logout
          </button>
        ) : (
          <React.Fragment>
            <a href="/login">
              <button>Login</button>
            </a>
            <a href="/register">
              <button>Register</button>
            </a>
          </React.Fragment>
        )}
      </div>
      <div>
        <button onClick={toggleTheme}>
          {darkMode ? (
            <MdOutlineWbSunny className="text-2xl" />
          ) : (
            <MdOutlineNightlight className="text-2xl" />
          )}
        </button>
      </div>
    </div>
  );
}

export default Header;
