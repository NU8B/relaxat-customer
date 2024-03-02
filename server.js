const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const app = express();
const port = 3001; // Choose a port for your backend server
const cors = require("cors");

// Middleware
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PostgreSQL configuration
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "password",
  port: 5432,
});

app.get("/", (req, res) => {
  res.send("Welcome to the Relaxat server!");
});

// Route to handle user signup
app.post("/signup", async (req, res) => {
  try {
    console.log("Received signup request:", req.body);

    const { firstname, lastname, email, password } = req.body;

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return res.status(400).json({
        success: false,
        errors: {
          email: isEmailValid ? "" : "Please enter a valid email address",
          password: isPasswordValid
            ? ""
            : "Password must be at least 8 characters long",
        },
      });
    }

    const result = await pool.query(
      "INSERT INTO accounts (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [firstname, lastname, email, password]
    );

    console.log("Signup successful:", result.rows[0]);
    res.json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 8;
}

// Start server and display accounts
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
