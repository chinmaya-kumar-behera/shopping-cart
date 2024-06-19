import React from 'react';
import { MdOutlineNightlight, MdOutlineWbSunny } from "react-icons/md";
import { useTheme } from '../../hooks';
import { useSelector } from 'react-redux';

const Header = () => {
  const { darkMode, toggleTheme } = useTheme();
  const user = useSelector((state) => state.auth.user);
  
  return (
    <div
      className={`flex justify-between items-center px-5 py-6 ${
        darkMode ? "border-gray-800" : "border-2 border-gray-200"
      }`}
    >
      <div>
        <h2 className="text-xl font-bold">Shopping Cart</h2>
      </div>
      <div className="flex gap-3 items-center text-lg">
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
          <button>Logout</button>
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
