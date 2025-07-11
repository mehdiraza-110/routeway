// components/Wrapper.tsx
"use client";
import React from "react";
import MainLayout from "../MainLayout";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default Wrapper;
