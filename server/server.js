const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || process.argv[2] || 8080;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

const userRouter = require("./routes/users");
const bookingRouter = require("./routes/bookings");
const adminRouter = require("./routes/admin");

app.use(express.json());

//express router
app.use("/users", userRouter);
app.use("/bookings", bookingRouter);
app.use("/admin", adminRouter);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

//deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
}

//server port
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;
