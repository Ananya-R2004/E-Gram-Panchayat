// utils/sendEmail.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // app password from Google (see below)
  },
});

async function sendOtpEmail(to, otp) {
  const mailOptions = {
    from: `"E-Gram Panchayat" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your e-Gram OTP",
    text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
  };
  return transporter.sendMail(mailOptions);
}

module.exports = { sendOtpEmail, transporter };
