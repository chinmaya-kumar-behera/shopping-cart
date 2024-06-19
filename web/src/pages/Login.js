import React from "react";
import Loader from "../components/UI/Loader";
import UserHandler from "../handler/UserHandler";

const Login = () => {
  const { onLogInFormSubmit, onLoginChange, loginData } = UserHandler();

  return (
    <main className="">
      <div className="">
        <div className="container">
          <h1 className="is-title">Log in to access your saved code</h1>
          <div className="login-form-container">
            <form className="full-width" onSubmit={onLogInFormSubmit}>
              <div className="form-field">
                <label>Email address</label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  label="Email address"
                  autoComplete="email"
                  required=""
                  value={loginData.email}
                  onChange={onLoginChange}
                />
              </div>
              <div className="form-field">
                <label>Password</label>
                <input
                  name="password"
                  id="password"
                  type="password"
                  label="Password"
                  autoComplete="current-password"
                  required=""
                  value={loginData.password}
                  onChange={onLoginChange}
                />
              </div>
              {/* <span className="text-success"></span>
                <span id="error">Error: </span> */}
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loginData.loading}
              >
                {loginData.loading ? <Loader size="lg" /> : "LogIn"}
              </button>
            </form>
            <p className="aligncenter">
              New to Codeshare? <a href="/register">Sign up here</a>.
            </p>
            <p className="aligncenter">
              <a href="/forgot-password?email=">Forgot your password?</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
