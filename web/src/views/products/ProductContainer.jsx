import React from "react";
import ProductCard from "./ProductCard";
import { Loader } from "../../components";

const ProductContainer = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      {products.length === 0 ? (
        <div className="p-10 flex justify-center">
          <Loader />
        </div>
      ) : (
        products.map((el, ind) => <ProductCard key={ind} data={el} />)
      )}
    </div>
  );
};

export default ProductContainer;
