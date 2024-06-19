import { useState } from "react";
import { loginService, signupService } from "../service/userService";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/auth/authSlice";
import { useSelector } from "react-redux";

const UserHandler = () => {
  const dispatch = useDispatch();

  // signup handlers
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function resetSignUpData() {
    setSignUpData({
      name: "",
      email: "",
      password: "",
      loading: false,
    });
  }

  async function signupHandler(data) {
    try {
      setSignUpData((prev) => ({ ...prev, loading: true }));
      const result = await signupService(data);
      const { message } = result.data;
      if (result.status === 201) {
        toast.success(message);
        resetSignUpData();
      }
      setSignUpData((prev) => ({ ...prev, loading: false }));
    } catch (err) {
      const { message } = err.response.data;
      const { status } = err.response;
      if (status === 400) toast.error(message);
      setSignUpData((prev) => ({ ...prev, loading: false }));
    }
  }

  async function signUpFormSubmitHandler(event) {
    event.preventDefault();
    signupHandler(signUpData);
  }

  const onSignupChange = (event) => {
    const { name, value } = event.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  };

  //   login handler

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    loading: false,
  });

  const resetLoginData = () => {
    setLoginData({ email: "", password: "", loading: false });
  };

  const onLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  function onLogInFormSubmit(event) {
    event.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the fields!");
      return;
    }
    loginHandler();
  }

  async function loginHandler() {
    try {
      setLoginData((prev) => ({ ...prev, loading: true }));
      const result = await loginService(loginData);
      const { message, userData } = result.data;
      if (result.status === 200) {
        localStorage.setItem("user", JSON.stringify(userData));
        dispatch(setUser(userData));
        toast.success(message);
        resetLoginData();
        // navigateToCodes();
      }
      setLoginData((prev) => ({ ...prev, loading: false }));
    } catch (err) {
      const { message } = err.response.data;
      const { status } = err.response;
      if (status === 400) toast.error(message);
      setLoginData((prev) => ({ ...prev, loading: false }));
    }
  }

  //logout handler

  const logoutHandler = () => {
    console.log("logout handler called")
    localStorage.removeItem('user');
    dispatch(setUser(null));
  }

  return {
    //   signIn
    signUpData,
    onSignupChange,
    signUpFormSubmitHandler,
    // login
    onLogInFormSubmit,
    onLoginChange,
    loginData,
    // logout
    logoutHandler,
  };
};

export default UserHandler;
