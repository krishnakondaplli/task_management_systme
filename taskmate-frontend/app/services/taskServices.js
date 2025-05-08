const API_URL = process.env.NEXT_PUBLIC_API_TASK_URL;

export const fetchTask = async (filter = {}) => {
  const token = localStorage.getItem("token");
  const cleanFilter = {};
  if (filter.status) cleanFilter.status = filter.status;
  if (filter.priority) cleanFilter.priority = filter.priority;
  if (filter.dueDate) cleanFilter.dueDate = filter.dueDate;
  if (filter.search) cleanFilter.search = filter.search;

  const params = new URLSearchParams(cleanFilter).toString();

  const res = await fetch(`${API_URL}/tasks?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // console.log(`${API_URL}/tasks?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
};

export const createTask = async (task) => {
  const token = localStorage.getItem("token");

  // console.log("Token extracted:", token);

  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const updateTask = async (id, updates) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  return res.json();
};

export const deleteTask = async (id) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
