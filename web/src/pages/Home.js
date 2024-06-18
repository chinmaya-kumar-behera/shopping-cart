import React from "react";
import { PageContainer } from "../components";
import WelcomeContents from "../views/home/WelcomeContents";
import ProductsSection from "../views/products/ProductsSection";

const Home = () => {
  return (
    <PageContainer>
          <WelcomeContents />
          <ProductsSection/>
    </PageContainer>
  );
};

export default Home;
