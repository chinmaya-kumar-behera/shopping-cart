import React from "react";

const PageContainer = ({ children, className }) => {
  const style = `px-5 ${className}`;
  return (
      <div className={style}>{children}</div>
  );
};

export default PageContainer;
