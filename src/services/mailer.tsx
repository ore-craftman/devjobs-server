const nodemailer = require("nodemailer");

const mailer = (reciever: string, title: string, message: string) => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.HOTMAIL_USER,
      pass: process.env.HOTMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "ore.dev@hotmail.com",
    to: reciever,
    subject: title,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = mailer;
