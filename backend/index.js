const express = require("express");

const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is healthy",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});