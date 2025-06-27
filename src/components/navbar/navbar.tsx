"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Kiri: Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold tracking-wide text-white"
            >
              TaskManager
            </Link>
          </div>

          {/* Tengah: Menu Desktop */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-400 transition">
              Home
            </Link>
            <Link href="/portfolio" className="hover:text-blue-400 transition">
              Portfolio
            </Link>
            <Link href="/about" className="hover:text-blue-400 transition">
              About
            </Link>
          </div>

          {/* Kanan: Icons & Hamburger */}
          <div className="flex items-center space-x-3">
            {/* Search - selalu tampil */}
            <button className="btn btn-ghost btn-circle inline-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Notification - selalu tampil */}
            <button className="btn btn-ghost btn-circle inline-flex">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 
                    0118 14.158V11a6.002 6.002 0 
                    00-4-5.659V5a2 2 0 10-4 
                    0v.341C7.67 6.165 6 8.388 6 
                    11v3.159c0 .538-.214 1.055-.595 
                    1.436L4 17h5m6 0v1a3 3 0 
                    11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>

            {/* Hamburger (mobile only) */}
            <button
              className="md:hidden btn btn-ghost btn-circle"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Dropdown menu (mobile only) */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link href="/" className="hover:text-blue-400 transition">
                Home
              </Link>
              <Link
                href="/portfolio"
                className="hover:text-blue-400 transition"
              >
                Portfolio
              </Link>
              <Link href="/about" className="hover:text-blue-400 transition">
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
