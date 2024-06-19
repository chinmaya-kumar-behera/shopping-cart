import React from "react";
import UserHandler from "../handler/UserHandler";
import Loader from "../components/UI/Loader";

const SignUp = () => {
  const { signUpFormSubmitHandler, onSignupChange, signUpData } = UserHandler();

  return (
    <React.Fragment>
      <div className="container">
        <h1 className="is-title">Sign up to save code</h1>
        <div className="login-form-container">
          <form className="full-width" onSubmit={signUpFormSubmitHandler}>
            <div className="form-field">
              <label>Your full name</label>
              <input
                type="text"
                name="name"
                id="name"
                label="Your full name"
                autoFocus=""
                autoComplete="name"
                required=""
                value={signUpData.name}
                onChange={onSignupChange}
              />
            </div>
            <div className="form-field">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                label="Email address"
                autoComplete="email"
                required=""
                value={signUpData.email}
                onChange={onSignupChange}
              />
            </div>
            <div className="form-field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                id="password"
                label="Password"
                autoComplete="new-password"
                required=""
                value={signUpData.password}
                onChange={onSignupChange}
              />
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={signUpData.loading}
            >
              {signUpData.loading ? <Loader size="lg" /> : "Sign Up"}
            </button>
          </form>
          <p className="aligncenter">
            Already signed up? <a href="/login">Log in here</a>.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
