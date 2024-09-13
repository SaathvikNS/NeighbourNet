const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD
    }
  });

  const mailOptions = {
    from: 'your_email@gmail.com',
    to,
    subject,
    text
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
