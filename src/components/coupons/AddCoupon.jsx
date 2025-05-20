"use client";
import { uploadSingleCoupon } from "@/server/common";
// import { uploadBulkCoupon } from "@/server/common";
import React, { useState } from "react";
import { toast } from "react-toast";
// import * as XLSX from "xlsx";

const AddCoupon = () => {
  const [coupon, setCoupon] = useState("");
  const [useCount, setUseCount] = useState("");
  const [couponValue, setCouponValue] = useState("");
  // const [excelArray, setExcelArray] = useState([]);
  // const [efile, setEFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!coupon || !useCount || !couponValue) {
      toast.error("Please fill out both fields.");
      return;
    }

    const data = { coupon, useCount: parseInt(useCount), value: parseInt(couponValue) };
    console.log("Submitted Coupon:", data);
    uploadSingleCoupon(data)
    toast.success("Coupon added successfully");
    // Reset fields
    setCoupon("");
    setUseCount("");
    setCouponValue("");
  };

  // const handleXMLUpload = async () => {
  //   // const file = e.target.files?.[0];
  //   if (!efile) return;

  //   const data = await efile.arrayBuffer();

  //   const workbook = XLSX.read(data);
  //   const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  //   const jsonData = XLSX.utils.sheet_to_json(worksheet);
  //   // console.log(jsonData);

  //   const formattedData = jsonData.map((item) => ({
  //     coupon: item[`${Object.keys(item)[0]}`],
  //     couponValue: 1000,
  //     useCount: 0,
  //   }));
  //   uploadBulkCoupon(formattedData)
  //     .then((data) => {
  //       toast.success("Coupon uploaded successfully");
  //     })
  //     .catch((err) => {
  //       console.log(err);

  //       toast.error("Failed to upload coupon");
  //     });
  // };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-zinc-900 shadow-lg p-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-600 dark:text-indigo-400">
        Upload Coupon
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter Coupon Code"
          className="capitalize w-full px-4 py-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={coupon}

          onChange={(e) => setCoupon(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter Use Count"
          className="w-full px-4 py-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={useCount}
          onChange={(e) => setUseCount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Coupon Value"
          className="w-full px-4 py-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={couponValue}
          onChange={(e) => setCouponValue(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Add Coupon
        </button>
      </form>

        {/* XML File Upload Section
        <label className="block mt-6 text-gray-700 dark:text-gray-300 font-medium">
          Upload Excel File
          <input
            type="file"
            accept=".xlsx"
            onChange={(e) => {
              setEFile(e.target.files[0]);
            }}
            className="mt-2 block w-full text-sm h-8 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer focus:outline-none dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder-gray-400"
          />
        </label>

        <button
          type="button"
          className="w-full bg-green-600 mt-3 text-white py-2 rounded-lg hover:bg-green-700 transition "
          onClick={handleXMLUpload}
        >
          Add From XML
        </button> */}
    </div>
  );
};

export default AddCoupon;
