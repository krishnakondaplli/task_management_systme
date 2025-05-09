import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import { Notification } from "./Notification.js";

export const Task = sequelize.define("Task", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  dueDate: { type: DataTypes.DATE },
  priority: {
    type: DataTypes.ENUM("low", "medium", "high"),
    defaultValue: "medium",
  },
  status: {
    type: DataTypes.ENUM("pending", "in progress", "completed"),
    defaultValue: "pending",
  },
  userId: { type: DataTypes.INTEGER, allowNull: false }, // foreign key
  // assignedTo: { type: DataTypes.INTEGER, allowNull: true }, // receiver
  createdBy: DataTypes.INTEGER, // user who created the task
});
