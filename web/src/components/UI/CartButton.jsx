import React from "react";

const CartButton = ({ onClick, className }) => {
  return (
    <button
      className={` ${className} px-6 py-2.5 bg-[#23c45e] rounded-md text-white text-lg`}
      onClick={onClick}
    >
      Cart
    </button>
  );
};

export default CartButton;
