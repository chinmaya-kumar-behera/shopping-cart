import React from "react";
import { useSelector } from "react-redux";

const CategoryButton = ({ children, onClick, className, text }) => {
      const filterButtonValue = useSelector((state) => state.filter.filter);
  return (
    <button
      onClick={onClick}
      className={` ${className} px-5 py-2 ${filterButtonValue === text  ? "bg-[#23c45e]" : "bg-transparent text-black" } rounded-lg text-white text-md border border-gray-300`}
    >
      {children}
    </button>
  );
};

export default CategoryButton;
