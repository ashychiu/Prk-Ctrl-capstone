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
    to: newUser.email,
    subject: "Welcome to PRK CTRL Visitor Parking Management",
    text: `Hi ${newUser.firstName}, greetings from Prk Ctrl team!`,
    html: `<img src="http://ashychiu.com/prkctrl/logo-white.png" alt="prk ctrl logo"><br><br>
    <h2>
    Hi ${newUser.firstName}, <br>Thank you for signing up!
    </h2>
    <ul style="font-size:14px">
    Here is your login information:<li>
    Email: ${newUser.email}
    </li>
    <li>
    Password: your password
    </li>
    </ul>
    <a style="font-size:14px"href="http://prkctrl.com" target="_blank"><span>Login to make your first booking now.</span></a>
    <h2>
    Prk Ctrl where visitor parking made easy.
    </h2>`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
};

const sendConfirmMail = (newBooking, foundUser) => {
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
    to: foundUser.email,
    subject: "Your Visitor Parking Booking Confirmation",
    text: `Hi ${foundUser.firstName}, Your visitor parking booking is confirmed`,
    html: `<img src="http://ashychiu.com/prkctrl/logo-white.png" alt="prk ctrl logo"><br><br>
    <h2>
    Hi ${foundUser.firstName}, <br>Your visitor parking booking is confirmed:
    </h2>
    <ul style="font-size:18px"><li>
    Date of Visit: ${newBooking.requestDate}
    </li>
    <li>
    Licence Plate: ${newBooking.carPlate}
    </li>
    <li>
    Accessible Parking? ${newBooking.accessibility}
    </li>
    </ul>
    <p style="font-size:14px">Please remind your visitors to follow all Covid-19 measures.</p>
<p style="font-size:14px">Visitors are asked to scan QR code upon arrival and departure.</p>
<p style="font-size:14px">Maximum parking stay: 24 hours.<p>
    <a href="http://prkctrl.com" target="_blank"><span>Login to make changes.</span></a>
    <h2>
    Prk Ctrl where visitor parking made easy.
    </h2>
    `,
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
