# Shopping Cart eCommerce Website

Developed a comprehensive shopping cart eCommerce website that showcases products based on various categories. Users can select and add products to the cart, and from the cart section, they can proceed to checkout and place orders. The website integrates Razorpay for secure payment processing. Users can also view their order history.

## Features

### Product Display by Category
- Products are organized and displayed based on various categories for easy browsing.
- Users can filter products by category, price, and other attributes.

### Shopping Cart
- Users can add products to the shopping cart with a single click.
- The cart displays selected products with their quantities and prices.
- Users can update product quantities or remove items from the cart.

### Checkout and Order Placement
- Seamless checkout process allowing users to review their cart items before placing an order.
- Integrated Razorpay for secure and efficient payment processing.
- Users receive order confirmation and details after a successful transaction.

### Order History
- Users can view their past orders and order details.
- Order history includes product details, order status, and payment information.

### Dark and Light Mode
- Implemented dark and light mode for better user experience.
- Users can switch between modes based on their preference.

## Technologies Used

- **Frontend:** React.js, Tailwind CSS, Redux
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Payment Gateway:** Razorpay

## Screenshots

![image](https://github.com/chinmaya-kumar-behera/shopping-cart/assets/101429530/3fa6591d-7de5-47ad-bf43-e4050a563696)
![image](https://github.com/chinmaya-kumar-behera/shopping-cart/assets/101429530/22c54940-2384-4a24-99fe-ec16e0e23f45)
![image](https://github.com/chinmaya-kumar-behera/shopping-cart/assets/101429530/d59ca293-b2bf-4cdd-b643-747ba69aacda)
![image](https://github.com/chinmaya-kumar-behera/shopping-cart/assets/101429530/29c4cd21-6e2d-4eae-a48b-d12d2d97934c)

## Visit the Site

Explore the eCommerce website at [ecommerce-site-url](https://chinmaya-shoppingcart.vercel.app/).

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/ecommerce-website.git
    ```
2. Install dependencies for both frontend and backend:
    ```sh
    cd ecommerce-website
    npm install
    cd client
    npm install
    ```
3. Create a `.env` file in the root directory and add your environment variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongo_db_uri
    BASE_URL="http://localhost:5000"
    NODE_ENV="development"
    RAZOR_PAY_KEY_ID="your_razorpay_key_id"
    RAZOR_PAY_KEY_SECRET="your_razorpay_key_secret"
    ```

4. Create a `.env` file in the `client` directory and add your environment variables:
    ```env
    REACT_APP_API_BASE_URL="http://localhost:5000"
    REACT_APP_API_NODE_ENV="development"
    REACT_APP_PUBLIC_RAZOR_PAY_KEY_ID="your_public_razorpay_key_id"
    ```

    > **Note:** For security reasons, the actual values for the environment variables are not disclosed. Please replace the placeholders with your actual credentials.

5. Start the development server:
    ```sh
    npm run dev
    ```

---

Developed by [Chinmaya Kumar Behera](https://github.com/chinmaya-kumar-behera)
