"use client";
import { getUserLoggedIn } from "@/server/common";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toast";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  useEffect(() => {
    if (localStorage.getItem("lnp-landing-admin-page")) {
      router.push("/home/todays-query");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Please enter both username and password.");
      return;
    }
    // TODO: Add authentication logic here
    getUserLoggedIn({ email: form.username, password: form.password })
      .then((res) => {
        if (res.user.role === "admin") {
          toast.success("Login successful!");
          router.push("/home/todays-query");
          localStorage.setItem(
            "lnp-landing-admin-page",
            JSON.stringify(res.user)
          );
        } else {
          toast.error("Login failed!");
        }
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      });
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg min-w-[320px] w-full max-w-sm transition-colors"
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          Login
        </h2>
        {error && (
          <div className="text-red-600 dark:text-red-400 mb-4 text-center">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block mb-2 text-gray-700 dark:text-gray-200"
          >
            Email
          </label>
          <input
            type="mail"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            autoComplete="username"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-gray-700 dark:text-gray-200"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition-colors"
        >
          Login
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Login;
