import React from "react";
import UserHandler from "../handler/UserHandler";
import { useTheme } from "../hooks";

const Login = () => {
  const { onLogInFormSubmit, onLoginChange, loginData } = UserHandler();
  const { darkMode } = useTheme();
  
  return (
    <main className="flex items-center justify-center min-h-[80vh]">
      <div
        className={`max-w-sm w-full p-3 rounded-lg ${
          darkMode ? "bg-opacity-20" : "bg-opacity-100"
        }`}
      >
        <h1 className="text-2xl font-semibold text-center mb-6">
          Log in to your shopping cart
        </h1>
        <form className="space-y-4" onSubmit={onLogInFormSubmit}>
          <div className="flex flex-col">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={loginData.email}
              onChange={onLoginChange}
              className="bg-gray-100 p-3 rounded"
              placeholder="Enter Your Email"
            />
          </div>
          <div className="flex flex-col">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={loginData.password}
              onChange={onLoginChange}
              className="bg-gray-100 p-3 rounded"
              placeholder="Enter Your Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold p-3 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loginData.loading}
          >
            {loginData.loading ? "Signing in..." : "Log In"}
          </button>
        </form>
        <p className="text-center mt-4">
          <a href="/register" className="text-green-700">
            Sign up here
          </a>
          .
        </p>
        <p className="text-center">
          <a href="/forgot-password?email=" className="text-green-700">
            Forgot your password?
          </a>
        </p>
      </div>
    </main>
  );
};

export default Login;
