const express = require("express");
const userRouter = express.Router();
const { v4: uuid } = require("uuid");
const fs = require("fs");

const readFile = () => {
  const userData = fs.readFileSync("./data/users.json");
  return JSON.parse(userData);
};

const writeFile = (userData) => {
  fs.writeFileSync("./data/users.json", JSON.stringify(userData, null, 2));
};

let userList = readFile();

// get all users
userRouter.get("/", (req, res) => {
  return res.status(200).json(userList);
});

// get single user by id
const getUser = (id) => {
  const foundUser = userList.find((user) => {
    return id === user.id;
  });
  return foundUser;
};

//API Get single user
userRouter.get("/:id", (req, res) => {
  let { id } = req.params;
  const userFound = getUser(id);
  if (!userFound) {
    return res.status(404).send("User not found!");
  }
  return res.status(200).json(userFound);
});

//Delete single user by id
userRouter.delete("/:id", (req, res) => {
  let { id } = req.params;
  const userFound = getUser(id);

  if (!userFound) {
    return res.status(404).send("User not found!");
  }
  updatedList = userList.filter((user) => user.id !== userFound.id);
  writeFile(updatedList);
  console.log(updatedList);
  return res.status(204).send();
});

module.exports = userRouter;
