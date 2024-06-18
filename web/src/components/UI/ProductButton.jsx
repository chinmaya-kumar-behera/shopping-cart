import React from 'react'

const ProductButton = ({ onClick, className }) => {
  return (
    <button
      className={` ${className} px-6 py-2.5 bg-gray-200 rounded-md text-gray-600 text-lg`}
      onClick={onClick}
    >
      Products
    </button>
  );
};

export default ProductButton

