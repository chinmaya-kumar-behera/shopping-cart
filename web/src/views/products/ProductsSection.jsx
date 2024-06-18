import React, { useState } from 'react'
import ProductFilters from './ProductFilters';

const ProductsSection = () => {
  const [filter, setFilter] = useState('all');
  return (
    <div>
      <ProductFilters setFilter={setFilter} filter={filter} />
    </div>
  );
}

export default ProductsSection