"use client";
import React, { useState } from "react";
import CouponNavbar from "./CouponNavbar";
import AddCoupon from "./AddCoupon";
import ViewCoupon from "./ViewCoupon";

const CouponWrapper = () => {
  const [page, setPage] = useState("ADD_COUPON");
  return (
    <div>
      <CouponNavbar setPage={setPage} />
      {page === "ADD_COUPON" ? <AddCoupon /> : <ViewCoupon />}
    </div>
  );
};

export default CouponWrapper;
