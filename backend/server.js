const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const checklistRoutes = require("./routes/checklistRoutes");

const app = express();
dotenv.config();
connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(express.json());
app.use("/api/checklist", checklistRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
