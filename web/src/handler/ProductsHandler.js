import {
  addToCartService,
  getCartByUserIdService,
  getOrdersByUserIdService,
  getProductDetailByIdService,
  getProductsCategoriesService,
  getProductsService,
} from "../service/productServices";

const ProductsHandler = () => {
  // const user = useSelector((state) => state.auth.user);
  
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

  const getProductDetailByIdsHandler = async (id) => {
    const result = await getProductDetailByIdService(id);
    if (result) {
      return result;
    }
  };

  const addToCartHandler = async (data) => {
    const result = await addToCartService(data);
    if (result) {
      return result;
    }
  };

    const getCartByUserIdHandler = async (data) => {
      const result = await getCartByUserIdService(data);
      if (result) {
        return result;
      }
  };
  
      const getOrdersByUserIdHandler = async (data) => {
        const result = await getOrdersByUserIdService(data);
        if (result) {
          return result;
        }
      };

  return {
    getProductsCategoriesHandler,
    getProductsHandler,
    getProductDetailByIdsHandler,
    addToCartHandler,
    getCartByUserIdHandler,
    getOrdersByUserIdHandler,
  };
};

export default ProductsHandler;
