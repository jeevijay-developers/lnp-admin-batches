"use client";
import React from "react";
import { ToastContainer } from "react-toast";

const Toastcontainer = ({ children }) => {
  return (
    <div>
      {children}
      <ToastContainer />
    </div>
  );
};

export default Toastcontainer;
