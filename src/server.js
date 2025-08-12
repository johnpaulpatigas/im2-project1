// src/server.js
require("dotenv").config();
const express = require("express");
const { createTableUsers } = require("./src/models/auth-model");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/auth", require("./src/routes/auth-route"));

app.get("/", (req, res) => {
  res.send("Welcome to the Auth API!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const startServer = async () => {
  try {
    await createTableUsers();
    console.log("Table 'users' is ready.");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(
      "Failed to initialize the database or start the server:",
      error,
    );
    process.exit(1);
  }
};

startServer();
