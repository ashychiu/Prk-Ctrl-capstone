const express = require("express");
const bookingRouter = express.Router();
const { v4: uuid } = require("uuid");
const fs = require("fs");

const readFile = () => {
  const bookingData = fs.readFileSync("./data/bookings.json");
  return JSON.parse(bookingData);
};

bookingRouter.get("/", (req, res) => {
  let bookingData = readFile();
  return res.status(200).json(bookingData);
  // bookingList = bookingData.map((booking) =
});

module.exports = bookingRouter;
