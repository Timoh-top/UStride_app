import React from "react";
import Navbar from "./Navbar";

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0b0f17] text-white">
      <Navbar />

      {/* IMPORTANT: prevents content hiding behind fixed navbar */}
      <main className="pt-24 px-4 md:px-10">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;