import { getProductsCategoriesService } from "../service/productServices";

const ProductsHandler = () => {
  const getProductsCategoriesHandler = async () => {
    const result = await getProductsCategoriesService();
    if (result) {
      return result;
    }
  };

  return { getProductsCategoriesHandler };
};

export default ProductsHandler;
