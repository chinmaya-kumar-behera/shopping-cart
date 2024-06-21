import React, { useEffect, useState } from "react";
import ProductFilters from "./ProductFilters";
import ProductContainer from "./ProductContainer";
import { useSelector } from "react-redux";
import ProductsHandler from "../../handler/ProductsHandler";

const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [filteredProductes, setFilteredProducts] = useState([]);
  const { getProductsHandler } = ProductsHandler();
  const filterValue = useSelector((state) => state.filter.filter);

  useEffect(() => {
    getProductsHandler()
      .then((res) => {
        // console.log(res.data.data); 
        setProducts(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (filterValue && products) {
      if (filterValue === "all") setFilteredProducts(products);
      else {
        const result = products.filter((item) => item.category === filterValue);
        setFilteredProducts(result);
      }
    }
  }, [filterValue, products]);

  return (
    <div className="space-y-10 mb-20">
      <ProductFilters />
      <ProductContainer products={filteredProductes} />
    </div>
  );
};

export default ProductsSection;
