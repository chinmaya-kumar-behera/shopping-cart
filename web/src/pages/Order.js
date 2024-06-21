import React, { useEffect, useState } from "react";
import ProductsHandler from "../handler/ProductsHandler";
import { useSelector } from "react-redux";
import moment from "moment";



const Order = () => {
  const user = useSelector((state) => state.auth.user);
  const { getOrdersByUserIdHandler } = ProductsHandler();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setLoading(true);
    if (user?._id) {
      getOrdersByUserIdHandler({ userId: user?._id })
        .then((res) => {
          setOrders(res.data.data);
          console.log(res.data)
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user?._id]);

  console.log(orders)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
      {loading ? (
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      ) : (
        <>
          {orders.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-600">You don't have any orders yet.</p>
              <p className="text-gray-600">
                Please go to the{" "}
                <a href="/products" className="text-blue-600">
                  order section
                </a>{" "}
                and shop something.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
                  {orders.map((item) => {
                    const { products } = item;
                    return products.map(({ productId }) => (
                      <div
                        key={productId._id}
                        className="flex gap-5 items-center bg-white rounded-lg shadow-md overflow-hidden p-2"
                      >
                        <div className="w-16">
                          <img
                            src={productId.image}
                            alt={productId.title}
                            className="w-full object-contain"
                          />
                        </div>
                        <div className="">
                          <h3 className="text-sm font-semibold">
                            {productId.title}
                          </h3>
                          <p className="text-gray-600 mb-2 text-xs">
                            {productId.description}
                          </p>
                          <p className="text-gray-800 font-bold">
                            ${productId.price}
                          </p>
                          <div className="flex items-center justify-end mt-4">
                            <span className="text-gray-600 text-xs">
                              {moment(productId.createdAt).fromNow()}
                            </span>
                            {/* <span className="ml-auto bg-green-200 text-green-800 px-2 py-1 text-xs font-semibold rounded-full">
                              {productId.status}
                            </span> */}
                          </div>
                        </div>
                      </div>
                    ));
                   }
                
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Order;
