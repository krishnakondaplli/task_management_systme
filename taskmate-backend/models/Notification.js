import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Task } from "./Task.js";
import { User } from "./User.js";

// Notification model definition
export const Notification = sequelize.define(
  "Notification",
  {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      // The user who will receive the notification
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    taskId: {
      // Optional: if the notification relates to a specific task
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);
