import React from "react";
import { PageLayout } from "../PageLayout/PageLayout";
import './BaseLayout.css';

const BaseLayout = ({ children }) => {
  return (
    <div className="base-layout">
      <PageLayout>
        <div className="content-wrapper">
          {children}
        </div>
      </PageLayout>
    </div>
  );
};

export default BaseLayout;
