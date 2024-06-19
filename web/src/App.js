import React, { useEffect, useState } from 'react';
import './App.css';
import { Header } from './views';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/auth/authSlice';
import { Navigate } from "react-router-dom";
import Cart from './pages/Cart';

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const [component, setComponent] = useState(children);

  useEffect(() => {
    if (user?._id) setComponent(children);
    else setComponent(<Navigate to="/login" />);
    
  }, [user?._id]);

  return component;

};

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("user"));
    dispatch(setUser(storageData));
  }, [user?._id]);

  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* private Routes */}
        <Route
          path="/login"
          element={user?._id ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={user?._id ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
      </Routes>
    </React.Fragment>
  );
}

export default App;
