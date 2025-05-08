"use client";
import React from "react";

export default function FilterBar({ filters, setFilters, search, setSearch }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <input
        type="text"
        placeholder="Search title or description"
        className="border p-2 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        className="border p-2 rounded"
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <select
        className="border p-2 rounded"
        value={filters.priority}
        onChange={(e) => setFilters({ ...filters, priority: e.target.value })}>
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select
        className="border p-2 rounded"
        value={filters.dueDate}
        onChange={(e) => setFilters({ ...filters, dueDate: e.target.value })}>
        <option value="">Any Due Date</option>
        <option value="today">Today</option>
        <option value="upcoming">Upcoming</option>
        <option value="past">Past</option>
      </select>
    </div>
  );
}
