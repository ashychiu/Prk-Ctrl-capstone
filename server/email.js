const { google } = require("googleapis");
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

// async function sendMail() {
//   try {
//     const accessToken = await oAuth2Client.getAccessToken();
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: process.env.MAIL_USERNAME,
//         // pass: process.env.MAIL_PASSWORD,
//         clientId: CLIENT_ID,
//         clientSecret: CLIENT_SECRET,
//         refreshToken: REFRESH_TOKEN,
//         accessToken: accessToken,
//       },
//     });
//     let mailOptions = {
//       from: "prkctrl.app@gmail.com",
//       to: "prkctrl.app@gmail.com",
//       subject: "Testing on infinity loop (no await)",
//       text: "Hi from your node express server",
//       html: "<h1>Hi from your node express server</h1>",
//     };

//     const result = await transporter.sendMail(mailOptions);
//     return result;
//   } catch (error) {
//     return error;
//   }
// }

// sendMail()
//   .then((result) => console.log("email is sent!", result))
//   .catch((error) => console.log(error.message));

/////////

const accessToken = oAuth2Client.getAccessToken();

const sendMail = () => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  let mailOptions = {
    from: "prkctrl.app@gmail.com",
    to: user.email,
    subject: "Infinity loop? round 2",
    text: "Hi from your node express server",
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
};

module.exports = { sendMail };
