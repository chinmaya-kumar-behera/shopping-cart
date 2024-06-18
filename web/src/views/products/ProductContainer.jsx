import React from 'react'
import ProductCard from './ProductCard';

const ProductContainer = ({ products }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {products.map((el,ind) => (
          <ProductCard key={ind} data={el} />
        ))}
      </div>
    );
};

export default ProductContainer