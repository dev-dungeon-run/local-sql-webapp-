const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// ---------------- CRUD ROUTES ---------------- //

// CREATE a new post
app.post("/posts", (req, res) => {
  const { title, content } = req.body;
  connection.query(
    "INSERT INTO posts (title, content) VALUES (?, ?)",
    [title, content],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Post created", id: results.insertId });
    }
  );
});

// READ all posts
app.get("/posts", (req, res) => {
  connection.query("SELECT * FROM posts", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// READ single post
app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  connection.query("SELECT * FROM posts WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0] || null);
  });
});

// UPDATE a post
app.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  connection.query(
    "UPDATE posts SET title = ?, content = ? WHERE id = ?",
    [title, content, id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Post updated" });
    }
  );
});

// DELETE a post
app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  connection.query("DELETE FROM posts WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Post deleted" });
  });
});

// Start server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));