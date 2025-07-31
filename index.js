// index.js
const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

// DUMMY DATA
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

// CREATE
app.post("/users", (req, res) => {
  const { name, age } = req.body;

  if (!name || !age)
    return res.status(400).json({
      message: "All fields are required",
    });

  const newId =
    data.users.length > 0
      ? Math.max(...data.users.map((p) => parseInt(p.id))) + 1
      : "1";

  const newUser = { id: newId, name, age };

  data.users.push(newUser);

  res.status(201).json({
    message: "User created sucessfully",
    newUser,
  });
});

// READ
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

// UPDATE
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  const checkUser = data.users.find((profile) => profile.id === parseInt(id));

  if (!checkUser) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!name || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  checkUser.name = name;
  checkUser.age = age;

  res.status(200).json({
    message: "User updated sucessfully",
    checkUser,
  });
});

// DELETE
app.delete("/users/:id", function (req, res) {
  const { id } = req.params;
  const index = data.users.findIndex((profile) => profile.id === parseInt(id));

  if (index === -1)
    return res.status(400).json({
      message: "No user found",
    });

  const deleteUser = data.users.splice(index, 1)[0];

  res.status(201).json({
    message: "User deleted successfully",
    deleteUser,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
