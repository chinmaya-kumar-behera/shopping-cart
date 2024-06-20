import axios from "axios";

export const initiateTransactionService = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/initiateTransaction`,data);
};

export const confirmTransactionService = (data) => {
  return axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/confirmTransaction`,
    data
  );
};