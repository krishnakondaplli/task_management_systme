"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        TaskMate
      </Link>
      <div className="space-x-4">
        {user ? (
          <>
            <span className="text-gray-700">Hi, {user.name}</span>
            <button
              onClick={logout}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              Login
            </Link>
            <Link
              href="/register"
              className="px-3 py-1 bg-blue-400 text-white rounded hover:bg-blue-500 transition">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
