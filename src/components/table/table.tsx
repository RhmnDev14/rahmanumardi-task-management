"use client";

import React, { useState } from "react";

const users = [
  {
    id: 1,
    name: "Hart Hagerty",
    country: "United States",
    company: "Zemlak, Daniel and Leannon",
    role: "Desktop Support Technician",
    favoriteColor: "Purple",
    avatar: "https://img.daisyui.com/images/profile/demo/2@94.webp",
  },
  {
    id: 2,
    name: "Brice Swyre",
    country: "China",
    company: "Carroll Group",
    role: "Tax Accountant",
    favoriteColor: "Red",
    avatar: "https://img.daisyui.com/images/profile/demo/3@94.webp",
  },
  {
    id: 3,
    name: "Marjy Ferencz",
    country: "Russia",
    company: "Rowe-Schoen",
    role: "Office Assistant I",
    favoriteColor: "Crimson",
    avatar: "https://img.daisyui.com/images/profile/demo/4@94.webp",
  },
  {
    id: 4,
    name: "Yancy Tear",
    country: "Brazil",
    company: "Wyman-Ledner",
    role: "Community Outreach Specialist",
    favoriteColor: "Indigo",
    avatar: "https://img.daisyui.com/images/profile/demo/5@94.webp",
  },
  {
    id: 5,
    name: "Clementina DuBuque",
    country: "France",
    company: "Hoeger LLC",
    role: "Software Engineer",
    favoriteColor: "Teal",
    avatar: "https://img.daisyui.com/images/profile/demo/6@94.webp",
  },
  {
    id: 6,
    name: "Brielle Williamson",
    country: "Japan",
    company: "Miller Group",
    role: "Frontend Developer",
    favoriteColor: "Blue",
    avatar: "https://img.daisyui.com/images/profile/demo/7@94.webp",
  },
];

const ITEMS_PER_PAGE = 4;

export default function UserTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = users.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="w-full overflow-x-auto backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-lg p-4">
      <table className="table table-zebra text-white w-full table-fixed">
        <thead>
          <tr>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={user.avatar} alt={user.name} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user.name}</div>
                    <div className="text-sm opacity-50">{user.country}</div>
                  </div>
                </div>
              </td>
              <td>
                {user.company}
                <br />
                <span className="badge badge-ghost badge-sm">{user.role}</span>
              </td>
              <td>{user.favoriteColor}</td>
              <td>
                <button className="btn btn-ghost btn-xs">details</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </tfoot>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          className="btn btn-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span className="text-white text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
