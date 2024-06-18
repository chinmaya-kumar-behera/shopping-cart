import axios from 'axios';

export const getProductsCategoriesService = () => {
    console.log(process.env.REACT_APP_API_BASE_URL);
    return axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/products/categories`
    );
}

export const getProductsService = (data) => {
  console.log(process.env.REACT_APP_API_BASE_URL);
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`);
};

;