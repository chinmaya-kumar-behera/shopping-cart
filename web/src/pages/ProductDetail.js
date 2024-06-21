import React, { useEffect, useState } from "react";
import { Loader, PageContainer } from "../components";
import { useParams } from "react-router-dom";
import ProductsHandler from "../handler/ProductsHandler";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const ProductDetail = () => {
  const { id } = useParams();
  const { getProductDetailByIdsHandler, addToCartHandler } = ProductsHandler();

  const user = useSelector((state) => state.auth.user);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductDetailByIdsHandler(id)
      .then((res) => {
        console.log(res);
        setProduct(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const addToCartBtnHandler = () => {
    if (!user?._id) {
      toast.error("You are not logged in !");
      return;
    } else
      addToCartHandler({
        userId: user?._id,
        cart: { productId: product._id, quantity: 1 },
      })
        .then((res) => {
          console.log(res);
          toast.success("added to cart");
        })
        .catch((err) => console.log(err))
        .finally(() => {
          console.log("finally block");
        });
  };

  return (
    <PageContainer className={"mt-5"}>
      <div className="max-w-5xl mx-auto">
        {!product ? (
          <Loader size={10} />
        ) : (
          <div className="flex gap-10 items-center p-10">
            <div className="">
              <img
                className="h-[400px] w-[400px] object-contain"
                src={product.image}
                alt={product.title}
              />
            </div>
            <div className="">
              <h5 className="leading-10 text-lg">{product.category}</h5>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold">{product.title}</h1>
                <p className="text-lg">{product.description}</p>
              </div>
              <div className="flex justify-between mt-4 items-center">
                <h2 className="text-2xl font-semibold">${product.price}</h2>
                <button
                  className="px-10 py-2.5 bg-[#23c45e] rounded-md text-white text-lg"
                  onClick={addToCartBtnHandler}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default ProductDetail;
