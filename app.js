const express = require("express");
const users = require("./users.json");
const { validateUser, partialValidateUser } = require("./schema/userSchema");

const PORT = 4321;

const app = express();
app.use(express.json());
app.disable("x-powered-by");

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((user) => user.id === parseInt(id));
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json(user);
});

app.post("/users", (req, res) => {
  const result = validateUser(req.body);

  if (!result.success) {
    return res.status(400).json({ message: JSON.parse(result.error.message) });
  }

  users.push(result.data);

  res.status(201).json(result.data);
});

app.patch("/users/:id", (req, res) => {
  const result = partialValidateUser(req.body);

  if (!result.success)
    return res.status(400).json({ message: JSON.parse(result.error.message) });

  const { id } = req.params;
  const userIndex = users.findIndex((user) => user.id === parseInt(id));

  if (userIndex === -1)
    return res.status(404).json({ message: "user not found" });

  const updateUser = {
    ...users[userIndex],
    ...result.data,
  };

  users[userIndex] = updateUser;

  res.status(200).json(updateUser);
});

app.listen(PORT, () => {
  console.log(`Server in port: http://localhots:${PORT}`);
});
