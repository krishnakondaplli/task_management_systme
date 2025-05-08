"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Taskmate</h1>
      <p className="text-gray-600 text-lg mb-6 max-w-xl">
        A simple and powerful task management system for individuals and teams.
        Create, filter, and organize tasks with ease.
      </p>

      <div className="flex gap-4">
        {user ? (
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Go to Dashboard
          </button>
        ) : (
          <>
            <button
              onClick={() => router.push("/login")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Login
            </button>
            <button
              onClick={() => router.push("/register")}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
}
