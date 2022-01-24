const { google } = require("googleapis");
const { gmail } = require("googleapis/build/src/apis/gmail");
const nodemailer = require("nodemailer");
require("dotenv").config();

const REDIRECT_URI = process.env.REDIRECT_URI;
const CLIENT_ID = process.env.OAUTH_CLIENTID;
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const accessToken = oAuth2Client.getAccessToken();

const sendWelcomeMail = (newUser) => {
  console.log("email.js:", newUser);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  let mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: "prkctrl.app@gmail.com",
    subject: "Welcome to PRK CTRL Visitor Parking Management",
    text: `Hi ${newUser.firstName}, greetings from your node express server`,
    html: `<h2>
    Hi ${newUser.firstName}, greetings from your node express server
    </h2>
    <a href="http://prkctrl.com" target="_blank"><span>Login to create your first booking</span></a>
    >`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
};

const sendConfirmMail = (newBooking) => {
  console.log(newBooking);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  let mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: "prkctrl.app@gmail.com",
    subject: "Your Visitor Parking Booking Confirmation",
    text: `Hi ${newBooking.requestDate}, greetings from your node express server`,
    html: `<h2>
    Hi ${newBooking.unitNumber}, greetings from your node express server
    </h2>
    <a href="http://prkctrl.com" target="_blank"><span>Login to create your first booking</span></a>
    >`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
};
module.exports = { sendWelcomeMail, sendConfirmMail };
