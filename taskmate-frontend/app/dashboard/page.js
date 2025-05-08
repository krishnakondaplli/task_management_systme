"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  createTask,
  deleteTask,
  fetchTask,
  updateTask,
} from "../services/taskServices";
import TaskForm from "../components/TaskForm";
import FilterBar from "../components/FilterBar";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {
  const { user, logout, loginFromDash, registerFromDash } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    dueDate: "",
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    status: "pending",
  });
  const [editingId, setEditingId] = useState(null);

  const loadTasks = async () => {
    try {
      const data = await fetchTask({ ...filters, search });
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.dueDate) {
      alert("Title and due date are required.");
      return;
    }

    if (editingId) {
      await updateTask(editingId, form);
    } else {
      await createTask(form);
    }

    resetForm();
    loadTasks();
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
      status: "pending",
    });
    setEditingId(null);
  };

  const handleEdit = (task) => {
    setForm({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate?.slice(0, 10),
      priority: task.priority,
      status: task.status,
    });
    setEditingId(task.id);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, [filters, search]);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-700">
          Welcome,{" "}
          {user?.name ? user?.name : "Please Login/Register" || "Guest"}
        </h2>
        {/* <div className="flex gap-2">
          {user?.name ? (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={loginFromDash}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Login
              </button>
              <button
                onClick={registerFromDash}
                className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition">
                Register
              </button>
            </>
          )}
        </div> */}
      </div>

      <h1 className="text-3xl mb-4 font-bold">Your Tasks</h1>

      {/* Task Form */}
      <TaskForm
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        editingId={editingId}
        isDisabled={!user?.name}
      />

      {/* Filter Bar */}
      <FilterBar
        search={search}
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
      />

      {/* Task List */}
      <ul className="space-y-2 mt-6">
        {tasks.length === 0 && (
          <p className="text-center text-gray-500">No tasks found.</p>
        )}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => handleEdit(task)}
            onDelete={() => handleDelete(task.id)}
          />
        ))}
      </ul>
    </div>
  );
}
