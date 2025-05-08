"use client";
import React from "react";

export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>
        <p className="text-xs text-gray-500">
          {task.priority} | {task.status} | Due:{" "}
          {new Date(task.dueDate).toLocaleDateString()}
        </p>
      </div>
      <div className="flex gap-3 mt-1">
        <button
          onClick={() => onEdit(task)}
          className="text-blue-500 hover:text-blue-700 text-sm">
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700 text-sm">
          Delete
        </button>
      </div>
    </div>
  );
}
