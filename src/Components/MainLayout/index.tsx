// components/MainLayout.tsx
"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="">
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
