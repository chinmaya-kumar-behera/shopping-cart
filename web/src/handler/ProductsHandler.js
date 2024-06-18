import { getProductsCategoriesService, getProductsService } from "../service/productServices";

const ProductsHandler = () => {
  const getProductsCategoriesHandler = async () => {
    const result = await getProductsCategoriesService();
    if (result) {
      return result;
    }
  };

  const getProductsHandler = async () => {
    const result = await getProductsService();
    if (result) {
      return result;
    }
  };

  return { getProductsCategoriesHandler, getProductsHandler };
};

export default ProductsHandler;
