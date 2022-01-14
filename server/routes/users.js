const express = require("express");
const userRouter = express.Router();
const { v4: uuid } = require("uuid");
const fs = require("fs");

const readFile = () => {
  const userData = fs.readFileSync("./data/users.json");
  return JSON.parse(userData);
};

userRouter.get("/", (req, res) => {
  let userList = readFile();
  //   userList = userData.map((user) => ({
  //     userID: user.userID,
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     email: user.email,
  //     unitNumber: user.unitNumber,
  //     status: user.status,
  //   }));
  return res.status(200).json(userList);
});

module.exports = userRouter;
