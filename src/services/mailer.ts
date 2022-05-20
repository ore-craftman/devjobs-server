const nodemailer = require("nodemailer");

interface PropSchema {
  reciever: string;
  title: string;
  template: string;
}

const mailer = (mailInfo: PropSchema) => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.HOTMAIL_USER,
      pass: process.env.HOTMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "ore.dev@hotmail.com",
    to: mailInfo.reciever,
    subject: mailInfo.title,
    html: mailInfo.template,
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log("Nodemailer err: ", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = mailer;
