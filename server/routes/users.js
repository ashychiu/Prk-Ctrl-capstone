const express = require("express");
const userRouter = express.Router();
const { v4: uuid } = require("uuid");
const fs = require("fs");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");
const { createTokens, validateToken } = require("../JWT");

userRouter.use(cookieParser());

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
userRouter.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  const foundUser = getUser(id);
  if (!foundUser) {
    return res.status(404).send("User not found!");
  }
  return res.status(200).json(foundUser);
});

//Add new user
userRouter.post("/signup", (req, res) => {
  const { firstName, lastName, email, unitNumber, status, phone, password } =
    req.body;

  if (!email || !firstName || !lastName || !unitNumber || !password) {
    return res.status(400).send("Starred fields are required");
  }
  if (phone.length < 10) {
    return res
      .status(400)
      .send("Please input a valid North American phone number");
  }
  if (!email.includes("@") || !email.includes(".")) {
    return res.status(400).send("Please input a valid email");
  }
  bcrypt.hash(password, 10).then((hash) => {
    const newUser = {
      id: uuid(),
      firstName,
      lastName,
      unitNumber,
      phone,
      email,
      status,
      password: hash,
    };
    userList.push(newUser);
    writeFile(userList);
    return res.status(201).json(userList);
  });
});

//User login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await userList.find((user) => user.email === email);
  if (!foundUser) {
    return res.status(404).send("User does not exist, please sign up first.");
  }
  const passwordOnFile = foundUser.password;
  bcrypt.compare(password, passwordOnFile).then((match) => {
    if (!match) {
      res.status(400).send("Incorrect password!");
    } else {
      const accessToken = createTokens(foundUser); //Call the function created on JWT.js
      res.cookie("accessToken", accessToken, {
        maxAge: 2629800000, //one month in milliseconds
        httpOnly: true,
      });
      res.send("Login successfully!");
    }
  });
});

//Get user profile
userRouter.get("/profile", validateToken, (req, res) => {
  res.json("profile");
});

//Update single user by id
userRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, unitNumber, status, phone } = req.body;
  const foundUser = userList.find((user) => user.id === id);

  if (!foundUser) {
    return res.status(404).send("User not found!");
  }

  if (!email || !firstName || !lastName || !unitNumber) {
    return res.status(400).send("Starred fields are required");
  }

  const updatedUser = {
    id: foundUser.id,
    firstName,
    lastName,
    unitNumber,
    phone,
    email,
    status,
  };

  userList = userList.map((user) => {
    if (user.id === foundUser.id) {
      return updatedUser;
    } else {
      return user;
    }
  });

  writeFile(userList);

  return res.status(200).send(updatedUser);
});

//Delete single user by id
userRouter.delete("/:userId", (req, res) => {
  let { id } = req.params;
  const userFound = getUser(id);

  if (!userFound) {
    return res.status(404).send("User not found!");
  }

  // userIndex = userList.indexOf(userFound);
  // console.log(userIndex);
  // console.log(userList);
  // updatedList = userList.splice(userIndex, 1);
  // console.log(updatedList);
  // writeFile(updatedList);
  // res.status(204).send("User deleted succesfully!");

  updatedList = userList.filter((user) => user.id !== userFound.id);
  writeFile(updatedList);
  return res.status(204).send();
});

module.exports = userRouter;
