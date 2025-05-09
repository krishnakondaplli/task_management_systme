import app from "./app.js";
import "./models/index.js";
import { sequelize } from "./models/index.js";

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.sync({ alter: true }); // Safe schema update
    console.log("DB synced");

    app.get("/", (req, res) => {
      res.send("API is running");
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to sync DB or start server:", error);
  }
})();
