import React, { useEffect, useState } from "react";
import ProductsHandler from "../handler/ProductsHandler";
import ProductContainer from "../views/products/ProductContainer";
import { PageContainer } from "../components";

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
      <PageContainer>
        <div className="mt-10">
          <ProductContainer products={products} />
        </div>
      </PageContainer>
    );
};

export default Products;
