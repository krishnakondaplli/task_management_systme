import { sequelize } from "../config/db.js";
import { User } from "./User.js";
import { Task } from "./Task.js";
import { Notification } from "./Notification.js";

// Task → User (Creator)
Task.belongsTo(User, { foreignKey: "userId", as: "creator" });
User.hasMany(Task, { foreignKey: "userId", as: "createdTasks" });

// Task → User (Assigned To)
// Task.belongsTo(User, { foreignKey: "assignedTo", as: "assignedUser" });
// User.hasMany(Task, { foreignKey: "assignedTo", as: "assignedTasks" });

// Notification ↔ User
User.hasMany(Notification, { foreignKey: "userId", as: "notifications" });
Notification.belongsTo(User, { foreignKey: "userId", as: "notifiedUser" });

// Notification ↔ Task
Task.hasMany(Notification, { foreignKey: "taskId", as: "notifications" });
Notification.belongsTo(Task, { foreignKey: "taskId", as: "relatedTask" });

// Export models
export { sequelize, User, Task, Notification };
