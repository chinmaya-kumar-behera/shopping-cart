import React from 'react';
import './App.css';
import { Header } from './views';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<Home />} /> */}
      </Routes>
    </React.Fragment>
  );
}

export default App;
