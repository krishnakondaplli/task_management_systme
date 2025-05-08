"use client";
import React from "react";

export default function TaskForm({
  form,
  setForm,
  handleSubmit,
  editingId,
  disabled,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <input
        type="text"
        placeholder="Title"
        className="border p-2 rounded"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        className="border p-2 rounded"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="date"
        className="border p-2 rounded"
        value={form.dueDate}
        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
      />
      <select
        className="border p-2 rounded"
        value={form.priority}
        onChange={(e) => setForm({ ...form, priority: e.target.value })}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select
        className="border p-2 rounded"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}>
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button
        onClick={handleSubmit}
        disabled={disabled}
        className={`col-span-full px-4 py-2 rounded transition ${
          disabled
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}>
        {editingId ? "Update Task" : "Add Task"}
      </button>
    </div>
  );
}
