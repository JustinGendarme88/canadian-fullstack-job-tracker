const express = require("express");
const cors = require("cors");

const db = require("./db");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company TEXT NOT NULL,
      position TEXT NOT NULL,
      status TEXT NOT NULL
    )
  `);
});



app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.get("/api/jobs", (req, res) => {
  db.all("SELECT * FROM jobs", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.post("/api/jobs", (req, res) => {
  const { company, position, status } = req.body;

  if (!company || !position || !status) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  const sql = `
    INSERT INTO jobs (company, position, status)
    VALUES (?, ?, ?)
  `;

  db.run(sql, [company, position, status], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({
      id: this.lastID,
      company,
      position,
      status,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.delete("/api/jobs/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM jobs WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({
      message: "Job deleted successfully",
      deletedId: id,
    });
  });
});

app.put("/api/jobs/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  db.run(
    "UPDATE jobs SET status = ? WHERE id = ?",
    [status, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        message: "Job updated successfully",
        updatedId: id,
        status,
      });
    }
  );
});