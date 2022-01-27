const express = require("express");
const adminRouter = express.Router();
const { v4: uuid } = require("uuid");
const fs = require("fs");
const bcrypt = require("bcrypt");
const { createTokens, validateToken } = require("../JWT");

const readFile = () => {
  const adminData = fs.readFileSync("./data/admin.json");
  return JSON.parse(adminData);
};

const writeFile = (adminData) => {
  fs.writeFileSync("./data/admin.json", JSON.stringify(adminData, null, 2));
};

let adminList = readFile();

//Admin login
adminRouter.post("/", async (req, res) => {
  const adminList = readFile();
  const { username, password } = req.body;
  const foundUser = await adminList.find(
    (admin) => admin.username === username
  );
  if (!foundUser) {
    return res.status(404).send("Admin user does not exist");
  }
  const passwordOnFile = foundUser.password;
  bcrypt.compare(password, passwordOnFile).then((match) => {
    if (!match) {
      res.status(400).send("Incorrect password!");
    } else {
      const accessToken = createTokens(foundUser); //Call the function created on JWT.js
      res.status(200).json({ accessToken });
    }
  });
});

//Get admin profile
adminRouter.get("/profile", validateToken, (req, res) => {
  res.json(req.decoded);
});

module.exports = adminRouter;
