import React, { useEffect } from 'react'
import ProductsHandler from '../handler/ProductsHandler';
import { useSelector } from 'react-redux';

const Order = () => {
    const user = useSelector(state => state.auth.user);

    const { getOrdersByUserIdHandler } = ProductsHandler();

    useEffect(() => {
        getOrdersByUserIdHandler({ userId: user._id })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
    })
  return (
    <div>Order</div>
  )
}

export default Order