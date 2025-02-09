"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="p-3">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
