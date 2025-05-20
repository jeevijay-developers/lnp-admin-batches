"use client";
import React, { useEffect, useState } from "react";
import { getAllTimeQuery } from "../../../server/common";

const columns = [
  { key: "name", label: "Name" },
  { key: "mobile", label: "Mobile" },
  { key: "course", label: "Course" },
  { key: "query", label: "Query" },
  { key: "coupon", label: "Coupon" },
  { key: "totalAmount", label: "Total Amount" },
  { key: "createdAt", label: "Created At" },
];

const formatDate = (dateStr) => new Date(dateStr).toLocaleString();

const AllTimeQueryPage = () => {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 10;

  useEffect(() => {
    setLoading(true);
    getAllTimeQuery(pageNo, limit)
      .then((res) => {
        setData(res.data || []);
        setTotalPages(res.total ? Math.ceil(res.total / limit) : 1);
      })
      .catch((err) => {
        setData([]);
        setTotalPages(1);
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [pageNo]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-700 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-8">
          All Time's Queries
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
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-4 text-center text-gray-400"
                  >
                    Loading...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-4 text-center text-gray-400"
                  >
                    No data found.
                  </td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr
                    key={row._id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                      >
                        {col.key === "createdAt"
                          ? formatDate(row[col.key])
                          : row[col.key]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            className="px-3 py-1 rounded bg-blue-600 text-white font-semibold disabled:opacity-50"
            onClick={() => setPageNo((p) => Math.max(1, p - 1))}
            disabled={pageNo === 1}
          >
            Previous
          </button>
          <span className="text-gray-700 dark:text-gray-200 font-semibold">
            Page {pageNo} of {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded bg-blue-600 text-white font-semibold disabled:opacity-50"
            onClick={() => setPageNo((p) => Math.min(totalPages, p + 1))}
            disabled={pageNo === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllTimeQueryPage;
