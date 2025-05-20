"use client";
import React, { useEffect, useState } from "react";
import apiClient from "@/server/axios";
import { toast } from "react-toast";
import { getAllCoupons } from "@/server/common";

const columns = [
  { key: "coupon", label: "Coupon Name" },
  { key: "useCount", label: "Count" },
  { key: "value", label: "Value" },
];

const ViewCoupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/api/coupon/delete/${id}`);
      toast.success("Coupon deleted");
      setCoupons((prev) => prev.filter((c) => c._id !== id));
      setConfirmId(null);
    } catch (err) {
      toast.error("Failed to delete coupon");
      setConfirmId(null);
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllCoupons()
      .then((res) => {
        setCoupons(res);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch coupons");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-8 text-center">
          Coupons List
        </h1>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-blue-200 dark:bg-gray-900 text-left text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-blue-200 dark:bg-gray-900"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-4 text-center text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : coupons.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-4 text-center text-gray-400">
                    No coupons found.
                  </td>
                </tr>
              ) : (
                coupons.map((coupon) => (
                  <tr key={coupon._id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                      >
                        {coupon[col.key]}
                      </td>
                    ))}
                    <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                      {confirmId === coupon._id ? (
                        <div className="flex flex-col items-center space-y-2">
                          <span className="text-sm text-gray-700 dark:text-gray-200 mb-1">Are you sure?</span>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleDelete(coupon._id)}
                              className="px-3 py-1 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setConfirmId(null)}
                              className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 font-semibold hover:bg-gray-400 dark:hover:bg-gray-700 transition"
                            >
                              No
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmId(coupon._id)}
                          className="px-3 py-1 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewCoupon;
