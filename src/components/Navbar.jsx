'use client'
import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('lnp-landing-admin-page');
    setShowLogoutConfirm(false);
    router.push('/');
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <nav className="bg-blue-200 dark:bg-gray-900 shadow-md rounded-b-xl">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo Section */}
            <div className="w-[200px] flex items-center">
              <img className='w-full' src="/logo.png" alt="LnP-logo" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden justify-end md:flex md:items-center md:space-x-6">
              <button onClick={() => { window.location.href = '/home/todays-query' }} className="rounded-md font-semibold hover:cursor-pointer hover:text-blue-800 text-blue-500 transition">
                Today's Query
              </button>
              <button onClick={() => { window.location.href = '/home/all-time-query' }} className="rounded-md font-semibold hover:cursor-pointer hover:text-blue-800 text-blue-500 transition">
                All Time Queries
              </button>
              <button onClick={() => { window.location.href = '/coupons' }} className="rounded-md font-semibold hover:cursor-pointer hover:text-blue-800 text-blue-500 transition">
                Coupons
              </button>
              <button onClick={handleLogout} className="px-4 py-2 rounded-md font-semibold text-white bg-red-500 hover:bg-red-600 transition">
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-white hover:bg-gray-800 focus:outline-none"
                aria-label="Main menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <XMarkIcon className="block h-7 w-7" />
                ) : (
                  <Bars3Icon className="block h-7 w-7" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800">
            <div className="mx-autopx-2 pt-2 pb-3 space-y-2 flex flex-col justify-center items-center">
              <button onClick={() => { window.location.href = '/home/todays-query' }} className="w-1/2 px-4 py-2 rounded-md font-semibold text-white bg-blue-500 hover:bg-blue-600 transition text-center">
                Today's Query
              </button>
              <button onClick={() => { window.location.href = '/home/all-time-query' }} className="w-1/2 px-4 py-2 rounded-md font-semibold text-white bg-blue-500 hover:bg-blue-600 transition text-center">
                All Time Query
              </button>
              <button
                onClick={handleLogout}
                className="w-1/2 px-4 py-2 rounded-md font-semibold text-white bg-red-500 hover:bg-red-600 transition text-center"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Logout Confirm Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-xs">
            <div className="mb-4 text-center text-gray-900 dark:text-gray-100 font-semibold">
              Are you sure you want to logout?
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmLogout}
                className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition"
              >
                Yes
              </button>
              <button
                onClick={cancelLogout}
                className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 font-semibold hover:bg-gray-400 dark:hover:bg-gray-700 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;