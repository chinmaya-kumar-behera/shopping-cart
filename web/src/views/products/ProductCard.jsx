import React from 'react'
import { useTheme } from '../../hooks';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ data }) => {
  const { darkMode } = useTheme();
  const navigate = useNavigate()

  const btnHandler = () => {
    navigate(`/product/${data._id}`);
  };
  
  return (
    <div
      className={`w-full ${darkMode ? "bg-gray-800 bg-opacity-30" : "bg-gray-200"}  rounded-lg p-5 text-center`}
      onClick={btnHandler}
    >
      <div className="space-y-2 px-5">
        <div className="flex justify-center">
          <img className="h-[200px]" src={data.image} alt={data.title} />
        </div>
        <div className="space-y-2">
          <h2 className="font-semi text-xl">${data.price}</h2>
          <h3>{data.category}</h3>
        </div>
        <p className="text-xl">{data.title}</p>
      </div>
    </div>
  );
};

export default ProductCard