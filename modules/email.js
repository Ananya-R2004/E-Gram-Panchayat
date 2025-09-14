const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPEmail = (to, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Your OTP for E-Gram Panchayat",
    text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
  };
  return transporter.sendMail(mailOptions);
};

module.exports = { sendOTPEmail };
