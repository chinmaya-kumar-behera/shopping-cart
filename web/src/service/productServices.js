import axios from 'axios';

export const getProductsCategoriesService = () => {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/categories`);
}

export const getProductsService = () => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`);
};

export const getProductDetailByIdService = (id) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/${id}`);
};

export const addToCartService = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/addtocart`, data);
};

export const getCartByUserIdService = ({ userId }) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/cart/${userId}`,);
};

export const getOrdersByUserIdService = ({ userId }) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/orders/${userId}`);
};

