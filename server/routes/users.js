const express = require("express");
const userRouter = express.Router();
const { v4: uuid } = require("uuid");
const fs = require("fs");
const bcrypt = require("bcrypt");
const { createTokens, validateToken } = require("../JWT");
const { sendWelcomeMail } = require("../email");

const readFile = () => {
  const userData = fs.readFileSync("./data/users.json");
  return JSON.parse(userData);
};

const writeFile = (userData) => {
  fs.writeFileSync("./data/users.json", JSON.stringify(userData, null, 2));
};

const userList = readFile();

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

//Sign up new user
userRouter.post("/signup", (req, res) => {
  const { firstName, lastName, email, unitNumber, status, phone, password } =
    req.body;
  const duplicateEmail = userList.find((user) => user.email === email);
  if (duplicateEmail) {
    return res
      .status(400)
      .send("Email is already registered, please login instead.");
  }
  const duplicateUnit = userList.find(
    (user) => user.unitNumber.toString() === unitNumber
  );
  if (duplicateUnit) {
    return res
      .status(400)
      .send(
        "Each unit can only have one account, please contact Building Manager if you're a new resident."
      );
  }

  if (!email || !firstName || !lastName || !unitNumber || !password) {
    return res.status(400).send("Please fill out all the required fields.");
  }
  if (phone.length < 10) {
    return res
      .status(400)
      .send("Please provide a valid North American phone number");
  }
  if (!email.includes("@") || !email.includes(".")) {
    return res.status(400).send("Please provide a valid email");
  } else {
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
      sendWelcomeMail(newUser);
      //Send welcome email after successful registration
      res.status(201).json(userList);
    });
  }
});

//User login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Both email & password are required!");
  }
  const foundUser = await userList.find((user) => user.email === email);
  if (!foundUser) {
    return res.status(404).send("User does not exist, please sign up first.");
  }
  const passwordOnFile = foundUser.password;
  bcrypt.compare(password, passwordOnFile).then((match) => {
    if (!match) {
      res.status(401).send("Incorrect password!");
    } else {
      const accessToken = createTokens(foundUser); //Call the function created on JWT.js
      res.status(200).json({ accessToken });

      sendWelcomeMail(foundUser);
    }
  });
});

//Get user profile
userRouter.get("/profile", validateToken, (req, res) => {
  res.json(req.decoded);
});

//Update single user by id
userRouter.put("profile/:id", (req, res) => {
  // const { id } = req.params;

  const { id, firstName, lastName, email, unitNumber, status, phone } =
    req.body;
  const foundUser = userList.find((user) => user.id === id);

  if (!foundUser) {
    return res.status(404).send("User not found!");
  }

  if (!email || !firstName || !lastName || !unitNumber) {
    return res.status(400).send("Starred fields are required");
  }

  const updatedUser = {
    id,
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

  updatedList = userList.filter((user) => user.id !== userFound.id);
  writeFile(updatedList);
  return res.status(204).send();
});

module.exports = userRouter;
