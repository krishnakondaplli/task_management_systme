"use client";
import React, { useState } from "react";

export default function NotificationDropdown({ notifications = [] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="bg-gray-100 px-3 py-2 rounded hover:bg-gray-200 transition">
        🔔 {notifications.length}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-10">
          {notifications.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">No notifications</p>
          ) : (
            notifications.map((note, idx) => (
              <div
                key={idx}
                className="p-3 text-sm text-gray-700 border-b last:border-none">
                {note.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
