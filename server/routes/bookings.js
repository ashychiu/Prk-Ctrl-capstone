const express = require("express");
const bookingRouter = express.Router();
const { v4: uuid } = require("uuid");
const fs = require("fs");
const { sendConfirmMail } = require("../email");

const readFile = () => {
  const bookingData = fs.readFileSync("./data/bookings.json");
  return JSON.parse(bookingData);
};

const writeFile = (bookingData) => {
  fs.writeFileSync(
    "./data/bookings.json",
    JSON.stringify(bookingData, null, 2)
  );
};

let bookingList = readFile();

const readUserFile = () => {
  const userData = fs.readFileSync("./data/users.json");
  return JSON.parse(userData);
};

let userList = readUserFile();

const getUser = (unitNumber) => {
  const foundUser = userList.find((user) => {
    return unitNumber === user.unitNumber.toString();
  });

  return foundUser;
};

// get all bookings
bookingRouter.get("/", (req, res) => {
  return res.status(200).json(bookingList);
});

// Find single booking by id
const getBooking = (id) => {
  const foundBooking = bookingList.find((booking) => {
    return id === booking.id;
  });
  return foundBooking;
};

//API Get single booking
bookingRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const foundBooking = getBooking(id);
  if (!foundBooking) {
    return res.status(404).send("Booking details not found!");
  }
  return res.status(200).json(foundBooking);
});

//Add new booking
bookingRouter.post("/add", (req, res) => {
  const { requestDate, unitNumber, carPlate, accessibility, remarks } =
    req.body;
  const foundUser = getUser(unitNumber);
  if (!carPlate || !requestDate) {
    return res.status(400).send("Please fill out the required fields");
  }
  if (carPlate.length < 2 || carPlate.length > 8) {
    return res
      .status(400)
      .send("Please provide a valid North American license plate");
  }

  const newBooking = {
    id: uuid(),
    userID: foundUser.id,
    requestDate,
    carPlate,
    unitNumber,
    accessibility,
    remarks,
    sumbitDate: new Date(),
    checkin: "",
    checkout: "",
  };

  bookingList.push(newBooking);
  writeFile(bookingList);
  //Send welcome email after successful registration

  return sendConfirmMail(newBooking);
  res.status(201).json(newBooking);
});

//Update single Booking by id
bookingRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const { requestDate, sumbitDate, userID, carPlate, remarks } = req.body;
  const foundBooking = bookingList.find((booking) => booking.id === id);

  if (!foundBooking) {
    return res.status(404).send("Booking not found!");
  }

  if (!carPlate || !requestDate) {
    return res.status(400).send("All fields are required");
  }

  const updatedBooking = {
    id: foundBooking.id,
    carPlate,
    requestDate,
    userID,
    sumbitDate: new Date(),
    remarks,
  };

  bookingList = bookingList.map((Booking) => {
    if (Booking.id === foundBooking.id) {
      return updatedBooking;
    } else {
      return Booking;
    }
  });

  writeFile(bookingList);

  return res.status(200).json(updatedBooking);
});

//Checkin a vehicle by patching single Booking by id
bookingRouter.patch("/checkin", (req, res) => {
  const { carPlate } = req.body;
  if (!carPlate) {
    return res.status(400).send("Please provide a valid license plate");
  }

  const foundBooking = bookingList.find(
    (booking) =>
      Date.now() - new Date(booking.requestDate).getTime() <= 86400000 &&
      booking.carPlate === carPlate
  );
  if (!foundBooking) {
    return res
      .status(404)
      .send("This license plate does not have a booking today!");
  }

  let { id, checkin, ...rest } = foundBooking;
  const updatedBooking = {
    id: id,
    checkin: new Date(),
    ...rest,
  };

  bookingList = bookingList.map((Booking) => {
    if (Booking.id === foundBooking.id) {
      return updatedBooking;
    } else {
      return Booking;
    }
  });

  writeFile(bookingList);
  return res.status(200).send(updatedBooking.id);
});

//Checkout a vehicle by patching single Booking by id
bookingRouter.patch("/checkout", (req, res) => {
  const { id, carPlate } = req.body;
  const foundBooking = bookingList.find((booking) => id === booking.id);

  if (!carPlate) {
    return res.status(400).send("Please provide a valid license plate");
  }
  if (!foundBooking) {
    return res
      .status(404)
      .send("This license plate does not have a booking today!");
  }

  const { checkout, ...rest } = foundBooking;
  const updatedBooking = {
    id: id,
    ...rest,
    checkout: new Date(),
  };

  bookingList = bookingList.map((Booking) => {
    if (Booking.id === foundBooking.id) {
      return updatedBooking;
    } else {
      return Booking;
    }
  });

  writeFile(bookingList);

  return res.status(200).json(updatedBooking);
});

//Delete single Booking by id
bookingRouter.delete("/:id", (req, res) => {
  let { id } = req.params;
  const foundBooking = getBooking(id);

  if (!foundBooking) {
    return res.status(404).send("Booking not found!");
  }

  updatedList = bookingList.filter((booking) => booking.id !== foundBooking.id);
  writeFile(updatedList);
  return res.status(200).send("Booking deleted successfully");
});

module.exports = bookingRouter;
