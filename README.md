# 🧩 Task Management System

A full-stack Task Management System designed for small teams to efficiently create, assign, and manage tasks. Built with **Next.js**, **Express.js**, and **PostgreSQL**, and deployed on **Vercel** and **Render**.

---

## 🚀 Features

### ✅ User Authentication

- Secure user registration and login
- Passwords hashed using bcrypt
- JWT-based authentication with protected routes

### ✅ Task Management (CRUD)

- Create, Read, Update, and Delete tasks
- Task attributes include:
  - Title
  - Description
  - Due Date
  - Priority (Low, Medium, High)
  - Status (Pending, In Progress, Completed)

### ✅ Team Collaboration

- Assign tasks to other registered users
- Each task can have an assignee and a creator
- Notification system alerts users when they are assigned a new task (basic in-app UI indication)

### ✅ Dashboard

- Displays:
  - Tasks assigned **to** the user
  - Tasks **created** by the user
  - **Overdue** tasks

### ✅ Search and Filter

- Search by title or description
- Filter by:
  - Status
  - Priority
  - Due Date

---

## 🧑‍💻 Tech Stack

| Layer           | Tech Stack                            |
| --------------- | ------------------------------------- |
| Frontend        | Next.js (App Router), Tailwind CSS    |
| Backend         | Express.js with Node.js               |
| Database        | PostgreSQL via Sequelize ORM          |
| Auth            | JWT, bcrypt                           |
| Deployment      | Frontend - Vercel<br>Backend - Render |
| Version Control | GitHub (public repository)            |

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```
"# task_management_systme" 
