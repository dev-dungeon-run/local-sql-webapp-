const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Saraysolar@1",
  database: "mywebsite"
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// GET route to fetch posts
app.get("/posts", (req, res) => {
  connection.query("SELECT * FROM posts", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results); // send JSON array of posts
  });
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));