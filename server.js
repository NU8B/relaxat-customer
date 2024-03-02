const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const cors = require("cors");
const app = express();
const port = 3001; // Choose a port for your backend server
app.use(cors());
// Middleware
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

async function fetchAndDisplayAccounts() {
  try {
    const result = await pool.query("SELECT * FROM accounts");
    console.log(result.rows);
  } catch (err) {
    console.error("Error fetching accounts:", err);
  } finally {
    pool.end(); // Close the pool connection
  }
}

// Route to handle user signup
app.post("/signup", async (req, res) => {
  console.log("Received signup request:", req.body);
  try {
    const { name, email, password } = req.body; // Updated!

    // Perform validation
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isNameValid || !isEmailValid || !isPasswordValid) {
      return res.status(400).json({
        success: false,
        errors: {
          name: isNameValid ? "" : "Please enter your first and last name",
          email: isEmailValid ? "" : "Please enter a valid email address",
          password: isPasswordValid
            ? ""
            : "Password must be at least 8 characters long",
        },
      });
    }

    const bcrypt = require("bcrypt");

    // ... inside your /signup route
    const saltRounds = 10; // Adjust for desired security level
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
      "INSERT INTO accounts (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [firstName, lastName, email, hashedPassword] // Updated
    );

    res.json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Validation Helper Functions (Place these somewhere accessible by server.js)
function validateName(name) {
  return name.trim().split(" ").length >= 2;
}

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
  fetchAndDisplayAccounts(); // Display on startup
});
