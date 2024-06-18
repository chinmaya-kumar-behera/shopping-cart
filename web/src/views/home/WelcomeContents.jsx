import React from 'react'
import { CartButton, ProductButton } from '../../components';

const WelcomeContents = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-10 max-w-4xl">
        <div className="space-y-5">
          <h2 className="text-4xl font-bold">Welcome To Shopping Cart </h2>
          <p>
            At our online store, we offer a wide range of high-quality products
            to meet your shopping needs. Whether you're looking for fashion,
            electronics, home appliances, or any other item, we have it all
            covered.
          </p>
        </div>
        <div className="">
          <div className="flex gap-3 items-center">
            <a href="/cart">
              <CartButton />
            </a>
            <a href="/products">
              <ProductButton />
            </a>
          </div>
        </div>
      </div>
      <div className="">
        <img
          className="h-[400px] min-w-[400px] object-contain object-center"
          src="https://shopping-cart-ankit.vercel.app/cart.png"
          alt="cart_image"
        />
      </div>
    </div>
  );
}

export default WelcomeContents