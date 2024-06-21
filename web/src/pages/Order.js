import React, { useEffect, useState } from 'react'
import ProductsHandler from '../handler/ProductsHandler';
import { useSelector } from 'react-redux';

const Order = () => {
    const user = useSelector(state => state.auth.user);
    const { getOrdersByUserIdHandler } = ProductsHandler();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrdersByUserIdHandler({ userId: user._id })
          .then((res) => {
              console.log(res.data.data);
              setOrders(res.data.data);
          })
          .catch((err) => console.log(err));
    })
  return (
    <div>Order</div>
  )
}

export default Order