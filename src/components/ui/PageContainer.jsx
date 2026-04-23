import React from "react";

const PageContainer = ({ children }) => {
  return (
    <div className="px-4 sm:px-6 md:px-10 py-4 max-w-[1200px] mx-auto">
      {children}
    </div>
  );
};

export default PageContainer;