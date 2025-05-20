"use client";
import React from "react";

const CouponNavbar = ({ setPage }) => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md rounded-b-xl">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center h-16 items-center">
          {/* Desktop & Mobile Menu */}
          <div className="flex justify-center items-center space-x-6 w-full">
            <button
              onClick={() => {
                setPage("VIEW_COUPON");
              }}
              className="rounded-md font-semibold hover:cursor-pointer hover:text-blue-800 text-blue-500 transition"
            >
              View Coupons
            </button>
            <button
              onClick={() => {
                setPage("ADD_COUPON");
              }}
              className="rounded-md font-semibold hover:cursor-pointer hover:text-blue-800 text-blue-500 transition"
            >
              Add Coupon
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CouponNavbar;
