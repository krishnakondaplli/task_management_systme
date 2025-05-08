import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Task } from "./Task.js";
import { Notification } from "./Notification.js";

export const User = sequelize.define("User", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Notification, { foreignKey: "userId" }); // User has many notifications
Notification.belongsTo(User, { foreignKey: "userId" }); // Notification belongs to user
