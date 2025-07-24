// index.js
const express = require("express");
const app = express();
const PORT = 5000;

const data = {
  users: [
    { id: 1, name: "Carl", age: 22 },
    { id: 2, name: "Cony", age: 20 },
    { id: 3, name: "Paul", age: 20 },
  ],

  getUserById(id) {
    return this.users.find((user) => user.id === id);
  },
};

app.get("/users", (req, res) => {
  console.log(req);
  res.json(data.users);
});

app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = data.getUserById(userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
