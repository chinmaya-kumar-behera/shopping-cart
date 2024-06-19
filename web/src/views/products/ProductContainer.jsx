import React from "react";
import ProductCard from "./ProductCard";

const ProductContainer = ({ products }) => {
  return (
    <div className="flex justify-center">
      {products.length <= 0 ? (
        <div className="p-10 flex justify-center">Loading....</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((el, ind) => <ProductCard key={ind} data={el} />)}
        </div>
      )}
    </div>
  );
};

export default ProductContainer;
