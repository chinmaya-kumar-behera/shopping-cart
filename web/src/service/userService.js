import axios from "axios";

export const signupService = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/register`,data);
};

export const loginService = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`,data);
};