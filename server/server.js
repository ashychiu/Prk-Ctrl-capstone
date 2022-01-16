const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
require("dotenv").config();
const PORT = process.env.PORT || process.argv[2] || 8080;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

const userRouter = require("./routes/users");
const bookingRouter = require("./routes/bookings");

// const writeFile = (userData) => {
//   fs.writeFileSync("./data/register.json", JSON.stringify(userData, null, 2));
// };

// app.post("register", (req, res) => {
//   const { email, password } = req.body;
//   bcrypt.hash(password, 10).then((hash) => {
//     User.create({
//       email: email,
//       password: hash,
//     })
//       .then(() => {
//         writeFile(User);
//         return res.status(201).json(userList);
//         // res.json("User registration completed.");
//       })
//       .catch((err) => {
//         if (err) {
//           res.status(400).send("error:", err);
//         }
//       });
//   });
// });

//middleware for incoming request
app.use(express.json());

//for serving static files
// app.use(express.static("public"));

//express router
app.use("/users", userRouter);
app.use("/bookings", bookingRouter);

//server port
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
