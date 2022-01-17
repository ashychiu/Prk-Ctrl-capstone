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

//for serving static files
// app.use(express.static("public"));

//express router
app.use("/users", userRouter);
app.use("/bookings", bookingRouter);
app.use("/admin", adminRouter);

//server port
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
