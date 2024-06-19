import React from "react";
import UserHandler from "../handler/UserHandler";
import { useTheme } from "../hooks";

const SignUp = () => {
  const { signUpFormSubmitHandler, onSignupChange, signUpData } = UserHandler();
  const { darkMode } = useTheme();

  return (
    <main className="flex items-center justify-center min-h-[80vh]">
      <div
        className={`max-w-sm w-full p-3 rounded-lg ${
          darkMode ? "bg-opacity-20" : "bg-opacity-100"
        }`}
      >
        <h1 className="text-2xl font-semibold text-center mb-6">
          Sign up to save code
        </h1>
        <form className="space-y-4" onSubmit={signUpFormSubmitHandler}>
          <div className="flex flex-col">
            <input
              type="text"
              name="name"
              id="name"
              required
              value={signUpData.name}
              onChange={onSignupChange}
              className="bg-gray-100 p-3 rounded"
              placeholder="Enter Your Full Name"
            />
          </div>
          <div className="flex flex-col">
            <input
              type="email"
              name="email"
              id="email"
              required
              value={signUpData.email}
              onChange={onSignupChange}
              className="bg-gray-100 p-3 rounded"
              placeholder="Enter Your Email"
            />
          </div>
          <div className="flex flex-col">
            <input
              type="password"
              name="password"
              id="password"
              required
              value={signUpData.password}
              onChange={onSignupChange}
              className="bg-gray-100 p-3 rounded"
              placeholder="Enter Your Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold p-3 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={signUpData.loading}
          >
            {signUpData.loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center mt-4">
          Already signed up?{" "}
          <a href="/login" className="text-green-700">
            Log in here
          </a>
          .
        </p>
      </div>
    </main>
  );
};

export default SignUp;
