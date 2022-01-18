const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: `${NODEMAILER_USER}`,
    pass: `${NODEMAILER_PASS}`,
    },
    message = {
        from: "from-example@email.com",
        to: "to-example@email.com",
        subject: "Subject",
        text: "Hello SMTP Email"
    }
    transporter.sendMail(message, (err, info) {
        if(err) {
            console.log(err)
        } else {
            console.log(info);
        }
});


}
