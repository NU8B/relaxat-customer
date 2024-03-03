// "use server";
const dotenv = require("dotenv");
dotenv.config({ path: "file.env" });
const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const app = express();
const port = 3001;
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

app.get("/user-details", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const result = await pool.query("SELECT * FROM accounts WHERE id = $1", [
      decoded.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result.rows[0];

    // Exclude sensitive information like password before sending to the client
    const userDetails = {
      firstname: user.first_name,
      lastname: user.last_name,
      email: user.email,
      // Add other user details as needed
    };

    res.json({ success: true, user: userDetails });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO accounts (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [firstname, lastname, email, hashedPassword]
    );

    console.log("Signup successful:", result.rows[0]);
    res.json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.post("/signin", async (req, res) => {
  try {
    console.log("Signin request received:", req.body);
    console.log("JWT_SECRET (from environment):", process.env.JWT_SECRET); // Add this line
    const { email, password } = req.body;

    // 1. Query database to find user by email
    const result = await pool.query("SELECT * FROM accounts WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      console.log("Invalid email or password");
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];

    // 2. Compare provided password with stored hash
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log("Invalid email or password");
      return res.status(401).json({ error: "Invalid email or password" });
    }

    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    // 3. Generate a JWT (or set a session variable)
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Adjust expiration as needed
    });

    // 4. Send a success response (with the token)
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to handle profile update
app.post("/update-profile", async (req, res) => {
  try {
    const { token, field, value } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Update the specified field in the database
    const result = await pool.query(
      `UPDATE accounts SET ${field} = $1 WHERE id = $2 RETURNING *`,
      [value, decoded.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send the updated user details
    const user = result.rows[0];
    const userDetails = {
      firstname: user.first_name,
      lastname: user.last_name,
      email: user.email,
      // Add other user details as needed
    };

    res.json({ success: true, user: userDetails });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
