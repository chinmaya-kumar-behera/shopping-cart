import React, { useEffect, useState } from "react";
import ProductsHandler from "../handler/ProductsHandler";
import ProductContainer from "../views/products/ProductContainer";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { getProductsHandler } = ProductsHandler();

  useEffect(() => {
    getProductsHandler()
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <ProductContainer products={products} />
    </div>
  );
};

export default Products;
