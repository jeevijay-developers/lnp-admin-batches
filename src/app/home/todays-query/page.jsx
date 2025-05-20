"use client";
import React, { useEffect, useState } from "react";
import { getTodaysQuery } from "../../../server/common";

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

const TodaysQueryPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getTodaysQuery()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-700 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-8">
          Today's Queries
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
              {data.length === 0 ? (
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
      </div>
    </div>
  );
};

export default TodaysQueryPage;
