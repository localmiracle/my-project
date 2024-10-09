import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import './PageLayout.css';

export const PageLayout = ({ children }) => {
  return (
    <div className="page-layout">
      <Header />
      <div className="page-content">
        {children}
      </div>
      <Footer />
    </div>
  );
};
