import app from "./app.js";
import "./models/index.js";
import { sequelize } from "./models/index.js";
const PORT = process.env.PORT;
await sequelize.sync({ alter: true }); // WARNING: modifies DB schema automatically

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
